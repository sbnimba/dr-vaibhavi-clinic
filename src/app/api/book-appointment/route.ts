import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const gcalUrl = data.gcalUrl;

    // Define the beautiful HTML template
    const htmlBody = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#7c3aed,#db2777);padding:28px 32px;">
          <h2 style="margin:0;color:#fff;font-size:22px;">🩺 New Appointment Booking</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Dr. Vaibhavi Dhenge Clinic — Automated Alert</p>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;width:45%;">Reference ID</td><td style="padding:8px 0;font-weight:700;color:#1f2937;">${data.id}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Patient Name</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${data.patientName}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Mobile Number</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${data.mobileNumber}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Email Address</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${data.emailAddress}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Appointment Date</td><td style="padding:8px 0;font-weight:700;color:#db2777;border-top:1px solid #f3f4f6;">${data.date}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Appointment Time</td><td style="padding:8px 0;font-weight:700;color:#db2777;border-top:1px solid #f3f4f6;">${data.timeSlot}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Consultation Mode</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${data.consultationMode}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Specialty</td><td style="padding:8px 0;font-weight:700;color:#1f2937;border-top:1px solid #f3f4f6;">${data.specialty}</td></tr>
            <tr><td style="padding:8px 0;color:#888;border-top:1px solid #f3f4f6;">Health Concern</td><td style="padding:8px 0;color:#1f2937;border-top:1px solid #f3f4f6;">${data.healthConcern || 'None'}</td></tr>
          </table>
          <div style="margin-top:24px;text-align:center;">
            <a href="${gcalUrl}" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#db2777);color:#fff;text-decoration:none;padding:14px 28px;border-radius:50px;font-size:15px;font-weight:700;font-family:sans-serif;box-shadow:0 6px 20px rgba(124,58,237,0.35);letter-spacing:0.3px;">✅ Confirm Booking &amp; Schedule Meeting</a>
            <p style="margin-top:10px;font-size:11px;color:#888;font-family:sans-serif;">Clicking this will open Google Calendar. Save the event to send a meeting invite to the patient.</p>
          </div>
        </div>
        <div style="background:#f9fafb;padding:16px 32px;font-size:11px;color:#aaa;text-align:center;">This is an automated notification from the Dr. Vaibhavi Dhenge Clinic booking system.</div>
      </div>
    `;

    // Send the email
    const mailOptions = {
      from: `"Dr. Vaibhavi Clinic Booking System" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Sending to the doctor's own email
      replyTo: data.emailAddress, // So the doctor can hit reply to email the patient directly
      subject: `🩺 New Booking: ${data.patientName} — ${data.date} at ${data.timeSlot}`,
      html: htmlBody,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return NextResponse.json({ success: true, message: 'Booking notification sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send booking notification.' },
      { status: 500 }
    );
  }
}
