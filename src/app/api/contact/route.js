import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  const body = await request.json();

  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json(
      {
        success: false,
        error: "Too many requests",
      },
      {
        status: 429,
      },
    );
  }

  if (JSON.stringify(body).length > 10000) {
    return Response.json(
      {
        success: false,
      },
      {
        status: 413,
      },
    );
  }

  const name = escapeHtml(body.name);
  const email = escapeHtml(body.email);
  const phone = escapeHtml(body.phone);
  const company = escapeHtml(body.company);
  const projectType = escapeHtml(body.projectType);
  const budget = escapeHtml(body.budget);
  const message = escapeHtml(body.message);

  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    return Response.json(
      {
        success: false,
        error: "Missing required fields",
      },
      {
        status: 400,
      },
    );
  }

  if (body.message.trim().length < 10) {
    return Response.json(
      {
        success: false,
        error: "Message too short",
      },
      {
        status: 400,
      },
    );
  }

  // Email

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return Response.json(
      {
        success: false,
        error: "Invalid email",
      },
      {
        status: 400,
      },
    );
  }
  // Message
  if (body.message.length > 3000) {
    return Response.json(
      {
        success: false,
        error: "Message too long",
      },
      {
        status: 400,
      },
    );
  }

  if (body.name.length > 100) {
    return Response.json({ success: false }, { status: 400 });
  }

  if (body.email.length > 200) {
    return Response.json({ success: false }, { status: 400 });
  }

  if (body.company?.length > 200) {
    return Response.json({ success: false }, { status: 400 });
  }

  if (body.phone?.length > 50) {
    return Response.json({ success: false }, { status: 400 });
  }

  // Honeypot
  if (body.honeypot) {
    return Response.json(
      {
        success: false,
      },
      {
        status: 400,
      },
    );
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      // from: `Portfolio <contact@yourdomain.com>`

      to: process.env.CONTACT_EMAIL,

      subject: "New Collaboration Request",

      html: `
        <h2>New Request</h2>

        <p><b>Name:</b> ${name}</p>

        <p><b>Email:</b> ${email}</p>

        <p><b>Phone:</b> ${phone}</p>

        <p><b>Company:</b> ${company}</p>

        <p><b>Project Type:</b> ${projectType}</p>

        <p><b>Budget:</b> ${budget}</p>

        <p><b>Message:</b> ${message}</p>
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
