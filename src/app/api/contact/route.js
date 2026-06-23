import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const body = await request.json();

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",

      to: "Fard.Mohammadmehdi@gmail.com",

      subject: "New Collaboration Request",

      html: `
        <h2>New Request</h2>

        <p><b>Name:</b> ${body.name}</p>

        <p><b>Email:</b> ${body.email}</p>

        <p><b>Phone:</b> ${body.phone}</p>

        <p><b>Company:</b> ${body.company}</p>

        <p><b>Project Type:</b> ${body.projectType}</p>

        <p><b>Budget:</b> ${body.budget}</p>

        <p><b>Message:</b> ${body.message}</p>
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
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
