import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT ?? 465),
  secure: Number(process.env.EMAIL_SERVER_PORT ?? 465) === 465,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

interface BookingEmailData {
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
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; margin: 0; padding: 0; background: #f9f9f7; }
      .container { max-width: 600px; margin: 40px auto; background: #fff; border: 1px solid #e5e5e5; }
      .header { background: #0e1f33; padding: 40px 48px; }
      .header h1 { color: #fff; margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 0.02em; }
      .body { padding: 48px; }
      .body p { line-height: 1.7; color: #333; margin: 0 0 16px; }
      .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
      .detail-label { color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; }
      .detail-value { font-weight: 500; }
      .status-badge { display: inline-block; background: #f0f4f9; color: #0e1f33; padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; }
      .footer { background: #f9f9f7; padding: 32px 48px; border-top: 1px solid #e5e5e5; font-size: 13px; color: #888; }
    </style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Solicitud de servicio recibida</h1>
        </div>
        <div class="body">
          <p>Hola ${data.customerName},</p>
          <p>Hemos recibido tu solicitud de servicio. En breve nos pondremos en contacto contigo para confirmar todos los detalles. <span class="status-badge">PENDIENTE DE CONFIRMACIÓN</span></p>
          
          <div style="margin: 32px 0;">
            <div class="detail-row"><span class="detail-label">Servicio</span><span class="detail-value">${data.serviceName}</span></div>
            <div class="detail-row"><span class="detail-label">Zona</span><span class="detail-value">${data.areaName}</span></div>
            <div class="detail-row"><span class="detail-label">Profesional</span><span class="detail-value">${data.staffName}</span></div>
            <div class="detail-row"><span class="detail-label">Fecha</span><span class="detail-value">${data.date}</span></div>
            <div class="detail-row"><span class="detail-label">Horario</span><span class="detail-value">${data.startTime} – ${data.endTime}</span></div>
            <div class="detail-row"><span class="detail-label">Dirección</span><span class="detail-value">${data.address}</span></div>
            ${data.notes ? `<div class="detail-row"><span class="detail-label">Notas</span><span class="detail-value">${data.notes}</span></div>` : ""}
            <div class="detail-row"><span class="detail-label">Ref. reserva</span><span class="detail-value" style="font-family:monospace;font-size:12px">${data.bookingId}</span></div>
          </div>
          
          <p>Si tienes alguna pregunta, no dudes en contactarnos. Estaremos encantados de ayudarte.</p>
          <p style="margin-top:32px">Un saludo,<br><strong>El equipo de ${process.env.NEXT_PUBLIC_COMPANY_NAME}</strong></p>
        </div>
        <div class="footer">
          <p>${process.env.NEXT_PUBLIC_COMPANY_NAME} · A Coruña, Galicia</p>
          <p>${process.env.NEXT_PUBLIC_COMPANY_PHONE} · ${process.env.NEXT_PUBLIC_COMPANY_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"${process.env.NEXT_PUBLIC_COMPANY_NAME}" <${process.env.EMAIL_FROM}>`,
    to: data.customerEmail,
    subject: `Solicitud recibida — ${data.serviceName} · ${data.date}`,
    html,
  });
}

export async function sendBookingNotificationToAdmin(data: BookingEmailData) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px">
      <h2 style="color:#0e1f33">Nueva solicitud de reserva</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Cliente</td><td style="font-weight:500">${data.customerName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Email</td><td>${data.customerEmail}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Servicio</td><td>${data.serviceName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Zona</td><td>${data.areaName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Personal</td><td>${data.staffName}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Fecha</td><td>${data.date}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Horario</td><td>${data.startTime} – ${data.endTime}</td></tr>
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Dirección</td><td>${data.address}</td></tr>
        ${data.notes ? `<tr><td style="padding:8px 0;color:#666;font-size:13px">Notas</td><td>${data.notes}</td></tr>` : ""}
        <tr><td style="padding:8px 0;color:#666;font-size:13px">Ref.</td><td style="font-family:monospace;font-size:12px">${data.bookingId}</td></tr>
      </table>
      <p style="margin-top:24px"><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/reservas/${data.bookingId}" style="background:#0e1f33;color:#fff;padding:12px 24px;text-decoration:none;display:inline-block">Ver en el panel</a></p>
    </div>
  `;

  await transporter.sendMail({
    from: `"${process.env.NEXT_PUBLIC_COMPANY_NAME}" <${process.env.EMAIL_FROM}>`,
    to: process.env.ADMIN_EMAIL!,
    subject: `[Nueva reserva] ${data.customerName} — ${data.date} ${data.startTime}`,
    html,
  });
}
