// Supabase Edge Function: send-demo-email
// Deploy: supabase functions deploy send-demo-email
// Secrets: RESEND_API_KEY (optional but recommended)

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "Knight ERP <onboarding@resend.dev>";
const DEMO_URL = Deno.env.get("DEMO_URL") || "https://www.unity-software.online";
const SITE_URL = Deno.env.get("SITE_URL") || "https://www.unity-software.online";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: cors });
  }

  try {
    const body = await req.json();
    const { name, email, phone, industry, company_size, primary_need } = body;

    if (!email || !String(email).includes("@")) {
      return new Response(JSON.stringify({ error: "Valid email required" }), {
        status: 400,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    const safeName = name || "there";
    const subject = "Your Knight ERP demo access";
    const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #0f172a; max-width: 560px; margin: 0 auto; padding: 24px;">
  <div style="text-align: center; margin-bottom: 24px;">
    <strong style="font-size: 20px;">Knight ERP</strong>
  </div>
  <h1 style="font-size: 22px;">Hi ${safeName},</h1>
  <p>Thanks for requesting a demo. Here is your access link:</p>
  <p style="margin: 28px 0;">
    <a href="${DEMO_URL}" style="background: #0f172a; color: #fff; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: 600;">
      Open Knight ERP Demo
    </a>
  </p>
  <p style="color: #64748b; font-size: 14px;">
    Industry: ${industry || "—"}<br/>
    Company size: ${company_size || "—"}<br/>
    Focus: ${primary_need || "—"}<br/>
    Phone: ${phone || "—"}
  </p>
  <p>If the button does not work, copy this link:<br/>
    <a href="${DEMO_URL}">${DEMO_URL}</a>
  </p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;" />
  <p style="font-size: 12px; color: #94a3b8;">
    Knight ERP · <a href="${SITE_URL}">${SITE_URL}</a><br/>
    Questions? Reply to this email or write to us from the website.
  </p>
</body>
</html>`;

    if (!RESEND_API_KEY) {
      console.log("No RESEND_API_KEY — email not sent. Lead data:", {
        email,
        name,
        phone,
      });
      return new Response(
        JSON.stringify({
          ok: true,
          emailed: false,
          message: "Lead saved. Configure RESEND_API_KEY to send email.",
        }),
        { headers: { ...cors, "Content-Type": "application/json" } }
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error", data);
      return new Response(JSON.stringify({ error: data }), {
        status: 500,
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, emailed: true, id: data.id }), {
      headers: { ...cors, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...cors, "Content-Type": "application/json" },
    });
  }
});
