import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY ?? process.env.EMAIL_SERVER_PASSWORD);

const FROM = process.env.EMAIL_FROM ?? "info@enisalimpieza.es";
const COMPANY = process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Enisa Limpieza";
const PHONE = process.env.NEXT_PUBLIC_COMPANY_PHONE ?? "+34 691 74 67 30";
const ADMIN_TO = process.env.ADMIN_EMAIL ?? "info@enisalimpieza.es";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://enisalimpieza.es";

export interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  serviceName: string;
  areaName: string;
  staffName: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  notes?: string | null;
  bookingId: string;
}

export async function sendBookingConfirmationToCustomer(data: BookingEmailData) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Solicitud recibida</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:#0e1f33;padding:36px 48px;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:300;letter-spacing:0.02em;">${COMPANY}</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.5);font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">Servicios para el Hogar</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px 48px;">
          <h2 style="margin:0 0 8px;color:#0e1f33;font-size:20px;font-weight:600;">Solicitud de servicio recibida</h2>
          <p style="margin:0 0 24px;color:#555;font-size:15px;line-height:1.6;">Hola <strong>${data.customerName}</strong>, hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo en breve para confirmar todos los detalles.</p>
          
          <!-- Details table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;">
            <tr style="background:#f8f9fa;"><td colspan="2" style="padding:12px 20px;font-size:11px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase;">Detalles de la reserva</td></tr>
            <tr><td style="padding:12px 20px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;width:40%;">Servicio</td><td style="padding:12px 20px;color:#1a1a1a;font-size:13px;font-weight:500;border-top:1px solid #f0f0f0;">${data.serviceName}</td></tr>
            <tr><td style="padding:12px 20px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Zona</td><td style="padding:12px 20px;color:#1a1a1a;font-size:13px;font-weight:500;border-top:1px solid #f0f0f0;">${data.areaName}</td></tr>
            <tr><td style="padding:12px 20px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Profesional</td><td style="padding:12px 20px;color:#1a1a1a;font-size:13px;font-weight:500;border-top:1px solid #f0f0f0;">${data.staffName}</td></tr>
            <tr><td style="padding:12px 20px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Fecha</td><td style="padding:12px 20px;color:#1a1a1a;font-size:13px;font-weight:500;border-top:1px solid #f0f0f0;">${data.date}</td></tr>
            <tr><td style="padding:12px 20px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Horario</td><td style="padding:12px 20px;color:#1a1a1a;font-size:13px;font-weight:500;border-top:1px solid #f0f0f0;">${data.startTime} – ${data.endTime}</td></tr>
            <tr><td style="padding:12px 20px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Dirección</td><td style="padding:12px 20px;color:#1a1a1a;font-size:13px;font-weight:500;border-top:1px solid #f0f0f0;">${data.address}</td></tr>
            ${data.notes ? `<tr><td style="padding:12px 20px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Notas</td><td style="padding:12px 20px;color:#1a1a1a;font-size:13px;font-weight:500;border-top:1px solid #f0f0f0;">${data.notes}</td></tr>` : ""}
            <tr><td style="padding:12px 20px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Referencia</td><td style="padding:12px 20px;color:#666;font-size:11px;font-family:monospace;border-top:1px solid #f0f0f0;">${data.bookingId}</td></tr>
          </table>

          <p style="margin:28px 0 0;color:#555;font-size:14px;line-height:1.7;">Si tienes alguna pregunta, llámanos al <strong>${PHONE}</strong> o responde a este correo. Estaremos encantados de ayudarte.</p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f8f9fa;padding:24px 48px;border-top:1px solid #e8e8e8;">
          <p style="margin:0;color:#aaa;font-size:12px;">${COMPANY} · A Coruña, Galicia · ${PHONE}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: `${COMPANY} <${FROM}>`,
    to: data.customerEmail,
    subject: `Solicitud recibida — ${data.serviceName} · ${data.date}`,
    html,
  });
}

export async function sendBookingNotificationToAdmin(data: BookingEmailData) {
  const html = `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr><td style="background:#0e1f33;padding:28px 40px;">
          <h1 style="margin:0;color:#ffffff;font-size:18px;font-weight:500;">🔔 Nueva solicitud de reserva</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;">
            <tr style="background:#f8f9fa;"><td colspan="2" style="padding:10px 18px;font-size:11px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase;">Cliente</td></tr>
            <tr><td style="padding:10px 18px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;width:40%;">Nombre</td><td style="padding:10px 18px;color:#1a1a1a;font-size:13px;font-weight:600;border-top:1px solid #f0f0f0;">${data.customerName}</td></tr>
            <tr><td style="padding:10px 18px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Email</td><td style="padding:10px 18px;color:#1a1a1a;font-size:13px;border-top:1px solid #f0f0f0;">${data.customerEmail}</td></tr>
            <tr style="background:#f8f9fa;"><td colspan="2" style="padding:10px 18px;font-size:11px;font-weight:700;color:#888;letter-spacing:0.1em;text-transform:uppercase;border-top:1px solid #e8e8e8;">Reserva</td></tr>
            <tr><td style="padding:10px 18px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Servicio</td><td style="padding:10px 18px;color:#1a1a1a;font-size:13px;font-weight:600;border-top:1px solid #f0f0f0;">${data.serviceName}</td></tr>
            <tr><td style="padding:10px 18px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Zona</td><td style="padding:10px 18px;color:#1a1a1a;font-size:13px;border-top:1px solid #f0f0f0;">${data.areaName}</td></tr>
            <tr><td style="padding:10px 18px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Profesional</td><td style="padding:10px 18px;color:#1a1a1a;font-size:13px;border-top:1px solid #f0f0f0;">${data.staffName}</td></tr>
            <tr><td style="padding:10px 18px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Fecha</td><td style="padding:10px 18px;color:#1a1a1a;font-size:13px;font-weight:600;border-top:1px solid #f0f0f0;">${data.date} · ${data.startTime}–${data.endTime}</td></tr>
            <tr><td style="padding:10px 18px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Dirección</td><td style="padding:10px 18px;color:#1a1a1a;font-size:13px;border-top:1px solid #f0f0f0;">${data.address}</td></tr>
            ${data.notes ? `<tr><td style="padding:10px 18px;color:#888;font-size:13px;border-top:1px solid #f0f0f0;">Notas</td><td style="padding:10px 18px;color:#1a1a1a;font-size:13px;border-top:1px solid #f0f0f0;">${data.notes}</td></tr>` : ""}
          </table>
          <div style="margin-top:28px;text-align:center;">
            <a href="${SITE_URL}/admin/reservas/${data.bookingId}" style="display:inline-block;background:#0e1f33;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:14px;font-weight:500;">Ver reserva en el panel →</a>
          </div>
        </td></tr>
        <tr><td style="background:#f8f9fa;padding:20px 40px;border-top:1px solid #e8e8e8;">
          <p style="margin:0;color:#aaa;font-size:12px;">Panel de administración · ${COMPANY}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await resend.emails.send({
    from: `${COMPANY} <${FROM}>`,
    to: ADMIN_TO,
    subject: `[Nueva reserva] ${data.customerName} — ${data.serviceName} · ${data.date}`,
    html,
  });
}
