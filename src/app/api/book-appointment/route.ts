import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { esc, clean, isEmail, isMobile, rateLimit } from '@/lib/api-security';

/** Only allow the Google Calendar link the booking form generates into the email's href. */
function safeGcalUrl(value: unknown): string {
  const raw = clean(value, 2000);
  if (!raw) return '';
  try {
    const url = new URL(raw);
    const ok =
      url.protocol === 'https:' &&
      (url.hostname === 'calendar.google.com' || url.hostname === 'www.google.com');
    return ok ? url.toString() : '';
  } catch {
    return '';
  }
}

export async function POST(request: Request) {
  try {
    // This endpoint is public and sends mail on every call, so throttle it —
    // otherwise a script can exhaust the Gmail daily send quota and real bookings
    // stop arriving silently.
    if (!rateLimit(request, { limit: 5, windowMs: 60_000 })) {
      return NextResponse.json(
        { success: false, message: 'Too many booking attempts. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    const data = {
      id: clean(body?.id, 100),
      patientName: clean(body?.patientName, 120),
      mobileNumber: clean(body?.mobileNumber, 20),
      emailAddress: clean(body?.emailAddress, 254),
      date: clean(body?.date, 40),
      timeSlot: clean(body?.timeSlot, 40),
      consultationMode: clean(body?.consultationMode, 40),
      specialty: clean(body?.specialty, 80),
      healthConcern: clean(body?.healthConcern, 1000),
    };

    if (!data.patientName || !isEmail(data.emailAddress) || !isMobile(data.mobileNumber)) {
      return NextResponse.json(
        { success: false, message: 'Please check the name, email address and mobile number.' },
        { status: 400 }
      );
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const gcalUrl = safeGcalUrl(body?.gcalUrl);

    // Define the beautiful HTML template
    const htmlBody = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:28px 32px;">
          <h2 style="margin:0;color:#fff;font-size:22px;">🩺 New Appointment Booking</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Dr. Vaibhavi Clinic — Automated Alert</p>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;width:45%;">Reference ID</td><td style="padding:8px 0;font-weight:700;color:#1f2937;">${esc(data.id)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Patient Name</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${esc(data.patientName)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Mobile Number</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${esc(data.mobileNumber)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Email Address</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${esc(data.emailAddress)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Appointment Date</td><td style="padding:8px 0;font-weight:700;color:#db2777;border-top:1px solid #f3f4f6;">${esc(data.date)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Appointment Time</td><td style="padding:8px 0;font-weight:700;color:#db2777;border-top:1px solid #f3f4f6;">${esc(data.timeSlot)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Consultation Mode</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${esc(data.consultationMode)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Specialty</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${esc(data.specialty)}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Health Concern</td><td style="padding:8px 0;color:#1f2937;border-top:1px solid #f3f4f6;">${esc(data.healthConcern) || 'None'}</td></tr>
          </table>
          ${gcalUrl ? `<div style="margin-top:24px;text-align:center;">
            <a href="${esc(gcalUrl)}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;text-decoration:none;padding:14px 28px;border-radius:50px;font-size:15px;font-weight:700;font-family:sans-serif;box-shadow:0 6px 20px rgba(124,58,237,0.35);letter-spacing:0.3px;">✅ Confirm Booking &amp; Schedule Meeting</a>
            <p style="margin-top:10px;font-size:11px;color:#888;font-family:sans-serif;">Clicking this will open Google Calendar. Save the event to send a meeting invite to the patient.</p>
          </div>` : ''}
        </div>
        <div style="background:#f9fafb;padding:16px 32px;font-size:11px;color:#aaa;text-align:center;">This is an automated notification from the Dr. Vaibhavi Clinic booking system.</div>
      </div>
    `;

    // Send the email
    const mailOptions = {
      from: `"Dr. Vaibhavi Clinic Booking System" <${process.env.GMAIL_USER}>`,
      to: 'drvaibhavicare@gmail.com', // Sending to the doctor's specific clinic email
      replyTo: data.emailAddress, // So the doctor can hit reply to email the patient directly
      // Subject is plain text, not HTML — escaping here would leak "&amp;" into the inbox.
      subject: `🩺 New Booking: ${data.patientName} — ${data.date} at ${data.timeSlot}`,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    // Automatically add the patient to the MailerLite Newsletter list
    try {
      const mlFormData = new FormData();
      mlFormData.append('fields[email]', data.emailAddress);
      mlFormData.append('ml-submit', '1');
      mlFormData.append('anticsrf', 'true');

      await fetch('https://assets.mailerlite.com/jsonp/2371546/forms/188182160208823762/subscribe', {
        method: 'POST',
        body: mlFormData,
      });
      console.log('Patient automatically added to MailerLite newsletter list.');
    } catch (mlError) {
      console.error('Failed to add patient to MailerLite:', mlError);
      // We don't throw here so the booking still succeeds even if MailerLite is down
    }

    return NextResponse.json({ success: true, message: 'Booking notification sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send booking notification.' },
      { status: 500 }
    );
  }
}
