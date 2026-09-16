import { createHash } from "crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";

export const runtime = "nodejs";

const SUPPORTED_LOCALES = ["fa", "en"];

const PROJECT_TYPES = new Set([
  "freelance",
  "partTime",
  "fullTime",
  "consulting",
]);

const MAX_BODY_SIZE = 12_000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const PHONE_REGEX = /^\+?\d{7,15}$/;

let ratelimitInstance = null;

function getRatelimit() {
  if (ratelimitInstance) {
    return ratelimitInstance;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Missing Upstash Redis environment variables.");
  }

  const redis = new Redis({
    url,
    token,
  });

  ratelimitInstance = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "portfolio-contact",
  });

  return ratelimitInstance;
}

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeDigits(value = "") {
  return String(value)
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function normalizePhone(value = "") {
  return normalizeDigits(value).replace(/[()\s.-]/g, "");
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function hashIdentifier(value) {
  return createHash("sha256").update(value).digest("hex");
}

function getAllowedOrigins(request) {
  const origins = new Set();

  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://mohammadmehdifard.ir";

  try {
    origins.add(new URL(configuredSiteUrl).origin);
  } catch {
    // Ignore invalid configuration here.
  }

  const host = request.headers.get("host");

  if (host) {
    const protocol = request.headers.get("x-forwarded-proto") || "https";

    origins.add(`${protocol}://${host}`);
  }

  origins.add("http://localhost:3000");
  origins.add("http://127.0.0.1:3000");

  return origins;
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("origin");

  // Non-browser clients may omit Origin.
  // Rate limiting + server-side validation still apply.
  if (!origin) {
    return true;
  }

  return getAllowedOrigins(request).has(origin);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function safeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function getProjectTypeLabel(type, locale) {
  const labels = {
    fa: {
      freelance: "فریلنس",
      partTime: "پاره‌وقت",
      fullTime: "تمام‌وقت",
      consulting: "مشاوره",
    },
    en: {
      freelance: "Freelance",
      partTime: "Part-time",
      fullTime: "Full-time",
      consulting: "Consulting",
    },
  };

  return labels[locale]?.[type] || type;
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return json(
        {
          success: false,
          error: "INVALID_INPUT",
        },
        415,
      );
    }

    if (!isAllowedOrigin(request)) {
      return json(
        {
          success: false,
          error: "FORBIDDEN",
        },
        403,
      );
    }

    const rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).length > MAX_BODY_SIZE) {
      return json(
        {
          success: false,
          error: "REQUEST_TOO_LARGE",
        },
        413,
      );
    }

    let body;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return json(
        {
          success: false,
          error: "INVALID_INPUT",
        },
        400,
      );
    }

    if (!isObject(body)) {
      return json(
        {
          success: false,
          error: "INVALID_INPUT",
        },
        400,
      );
    }

    const ip = getClientIp(request);
    const rateLimitIdentifier = hashIdentifier(ip);

    let rateLimit;

    try {
      rateLimit = await getRatelimit().limit(rateLimitIdentifier);
    } catch (error) {
      console.error("Rate limiter error:", error);

      return json(
        {
          success: false,
          error: "SERVICE_UNAVAILABLE",
        },
        503,
      );
    }

    if (!rateLimit.success) {
      return json(
        {
          success: false,
          error: "TOO_MANY_REQUESTS",
        },
        429,
      );
    }

    /*
     * Honeypot:
     * Bots that fill this field are silently rejected as a
     * successful-looking response to avoid teaching the bot
     * how the anti-spam mechanism works.
     */
    if (safeString(body.honeypot)) {
      return json({
        success: true,
      });
    }

    const locale = SUPPORTED_LOCALES.includes(body.locale) ? body.locale : "en";

    const name = safeString(body.name);
    const email = safeString(body.email).toLowerCase();
    const phone = safeString(body.phone);
    const company = safeString(body.company);
    const projectType = safeString(body.projectType);
    const budget = safeString(body.budget);
    const message = safeString(body.message);

    if (!name || !email || !message) {
      return json(
        {
          success: false,
          error: "INVALID_INPUT",
        },
        400,
      );
    }

    if (name.length > 100) {
      return json(
        {
          success: false,
          error: "INVALID_INPUT",
        },
        400,
      );
    }

    if (email.length > 200 || !EMAIL_REGEX.test(email)) {
      return json(
        {
          success: false,
          error: "INVALID_EMAIL",
        },
        400,
      );
    }

    if (phone.length > 50) {
      return json(
        {
          success: false,
          error: "INVALID_PHONE",
        },
        400,
      );
    }

    const normalizedPhone = normalizePhone(phone);

    if (normalizedPhone && !PHONE_REGEX.test(normalizedPhone)) {
      return json(
        {
          success: false,
          error: "INVALID_PHONE",
        },
        400,
      );
    }

    if (company.length > 200) {
      return json(
        {
          success: false,
          error: "INVALID_INPUT",
        },
        400,
      );
    }

    if (budget.length > 100) {
      return json(
        {
          success: false,
          error: "INVALID_INPUT",
        },
        400,
      );
    }

    if (projectType && !PROJECT_TYPES.has(projectType)) {
      return json(
        {
          success: false,
          error: "INVALID_INPUT",
        },
        400,
      );
    }

    if (message.length < 10) {
      return json(
        {
          success: false,
          error: "MESSAGE_TOO_SHORT",
        },
        400,
      );
    }

    if (message.length > 3000) {
      return json(
        {
          success: false,
          error: "MESSAGE_TOO_LONG",
        },
        400,
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

    if (!resendApiKey || !contactEmail) {
      console.error("Missing RESEND_API_KEY or CONTACT_EMAIL.");

      return json(
        {
          success: false,
          error: "SERVICE_UNAVAILABLE",
        },
        503,
      );
    }

    const resend = new Resend(resendApiKey);

    const projectTypeLabel = getProjectTypeLabel(projectType, locale);

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(normalizedPhone || phone);
    const safeCompany = escapeHtml(company || "-");
    const safeProjectType = escapeHtml(projectTypeLabel || "-");
    const safeBudget = escapeHtml(budget || "-");
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");

    /*
     * Same submission within the same minute gets the same
     * idempotency key. This protects against double-clicks,
     * retries and network re-submissions.
     */
    const idempotencySource = [
      email,
      name,
      message,
      projectType,
      Math.floor(Date.now() / 60_000),
    ].join("|");

    const idempotencyKey = `contact-${hashIdentifier(idempotencySource)}`;

    const { data, error } = await resend.emails.send(
      {
        from: fromEmail,
        to: [contactEmail],
        replyTo: email,
        subject: `New collaboration request — ${projectTypeLabel || "General"}`,
        html: `
          <!doctype html>
          <html>
            <body style="margin:0;padding:24px;background:#f5f5f5;font-family:Arial,sans-serif;color:#171717;">
              <div style="max-width:680px;margin:0 auto;background:#ffffff;border-radius:16px;padding:28px;">
                <h2 style="margin:0 0 24px;">
                  New Collaboration Request
                </h2>

                <p>
                  <strong>Name:</strong>
                  ${safeName}
                </p>

                <p>
                  <strong>Email:</strong>
                  ${safeEmail}
                </p>

                <p>
                  <strong>Phone:</strong>
                  ${safePhone}
                </p>

                <p>
                  <strong>Company:</strong>
                  ${safeCompany}
                </p>

                <p>
                  <strong>Project Type:</strong>
                  ${safeProjectType}
                </p>

                <p>
                  <strong>Budget:</strong>
                  ${safeBudget}
                </p>

                <hr style="border:0;border-top:1px solid #e5e5e5;margin:24px 0;" />

                <p>
                  <strong>Message:</strong>
                </p>

                <p style="line-height:1.7;">
                  ${safeMessage}
                </p>
              </div>
            </body>
          </html>
        `,
      },
      {
        idempotencyKey,
      },
    );

    if (error) {
      console.error("Resend error:", error);

      return json(
        {
          success: false,
          error: "SERVICE_UNAVAILABLE",
        },
        502,
      );
    }

    return json({
      success: true,
      id: data?.id || null,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return json(
      {
        success: false,
        error: "SERVICE_UNAVAILABLE",
      },
      500,
    );
  }
}
