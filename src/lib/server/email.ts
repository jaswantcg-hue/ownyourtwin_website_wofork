import nodemailer from 'nodemailer';
import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '$env/static/private';

const transporter = nodemailer.createTransport({
  host: 'smtpout.secureserver.net',
  port: 465,
  secure: true, // SSL — same as Python's SMTP_SSL
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

export async function sendAcknowledgementEmail(to: string, name: string): Promise<void> {
  await transporter.sendMail({
    from: `"OwnYourTwin" <${EMAIL_ADDRESS}>`,
    to,
    subject: 'You\'re on the list! 🎉 — OwnYourTwin Early Access',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f8f8f6; font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f6; padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px; border:1px solid #e0e0e0; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#111111; padding:28px 40px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:1.4rem; font-weight:800; letter-spacing:0.03em;">OwnYourTwin</h1>
              <p style="margin:6px 0 0; color:#888888; font-size:0.82rem;">Digital Twin for Your Life</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h2 style="margin:0 0 12px; color:#111111; font-size:1.25rem; font-weight:800;">Hi ${name},</h2>
              <p style="margin:0 0 20px; color:#555555; font-size:0.95rem; line-height:1.7;">
                Thank you for signing up for early access to <strong>OwnYourTwin</strong>. You're officially on the list!
              </p>
              <p style="margin:0 0 20px; color:#555555; font-size:0.95rem; line-height:1.7;">
                We're building a digital twin that learns from you — your decisions, values, and passions —
                so you can reflect deeper, connect better, and unlock opportunities that truly match who you are.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
                <tr>
                  <td style="background:#111111; border-radius:9px; padding:14px 28px;">
                    <a href="https://ownyourtwin.com" style="color:#ffffff; text-decoration:none; font-weight:700; font-size:0.9rem; letter-spacing:0.03em;">
                      Visit OwnYourTwin →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0; color:#555555; font-size:0.95rem; line-height:1.7;">
                We'll reach out as soon as your spot is ready. In the meantime, feel free to reply to this email
                with questions or thoughts — we read every one.
              </p>

              <p style="margin:24px 0 0; color:#555555; font-size:0.95rem;">
                With excitement,<br/>
                <strong style="color:#111111;">The OwnYourTwin Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f8f6; padding:20px 40px; border-top:1px solid #eeeeee; text-align:center;">
              <p style="margin:0; color:#aaaaaa; font-size:0.75rem; line-height:1.6;">
                You received this email because you signed up at ownyourtwin.com.<br/>
                © 2026 OwnYourTwin. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  });
}
