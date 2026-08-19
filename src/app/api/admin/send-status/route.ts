export const dynamic = 'force-static';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { requireApprovedStaff, serverSupabase, esc, clean } from '@/lib/api-security';

/**
 * Sends an appointment status update to a patient.
 *
 * Security notes — this endpoint sends mail from the clinic's Gmail account, so:
 *  1. the caller must present a valid Supabase session belonging to APPROVED staff;
 *  2. the recipient address is read from the appointment row in the database and is
 *     never taken from the request body (otherwise this is an open mail relay);
 *  3. every interpolated field is HTML-escaped.
 */
export async function POST(request: Request) {
  try {
    const staff = await requireApprovedStaff(request);
    if (!staff) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const appointmentId = clean(body?.id, 100);
    if (!appointmentId) {
      return NextResponse.json(
        { success: false, message: 'Missing appointment id.' },
        { status: 400 }
      );
    }

    // Recipient and appointment details come from the database, not the caller.
    const supabase = serverSupabase();
    const { data: appointment, error: lookupError } = await supabase
      .from('appointments')
      .select('id, patient_name, email_address, appointment_date, time_slot, consultation_mode, specialty')
      .eq('id', appointmentId)
      .single();

    if (lookupError || !appointment) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found.' },
        { status: 404 }
      );
    }

    const recipient = appointment.email_address;
    if (!recipient) {
      return NextResponse.json(
        { success: false, message: 'That appointment has no email address on file.' },
        { status: 422 }
      );
    }

    // Status is constrained to a known set — it drives both the colour and the subject line.
    const STATUSES: Record<string, { bg: string; title: string }> = {
      Confirmed: { bg: '#10b981', title: 'Appointment Confirmed' },
      Rescheduled: { bg: '#3b82f6', title: 'Appointment Rescheduled' },
      Rejected: { bg: '#ef4444', title: 'Appointment Declined' },
      Completed: { bg: '#6b7280', title: 'Appointment Completed' },
    };
    const status = STATUSES[clean(body?.status, 20)] ?? STATUSES.Confirmed;
    const note = clean(body?.note, 1000) || 'There is an update regarding your appointment.';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const htmlBody = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <div style="background:${status.bg};padding:28px 32px;">
          <h2 style="margin:0;color:#fff;font-size:22px;">🩺 ${esc(status.title)}</h2>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">Dr. Vaibhavi Clinic</p>
        </div>
        <div style="padding:28px 32px;">
          <p style="font-size:15px;color:#1f2937;margin-top:0;">Dear <strong>${esc(appointment.patient_name)}</strong>,</p>
          <p style="font-size:15px;color:#4b5563;line-height:1.6;">${esc(note)}</p>

          <div style="background:#f9fafb;border-radius:12px;padding:20px;margin:24px 0;border:1px solid #f3f4f6;">
            <h3 style="margin-top:0;font-size:14px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Appointment Details</h3>
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:6px 0;color:#6b7280;width:45%;">Reference ID</td><td style="padding:6px 0;font-weight:700;color:#1f2937;">${esc(appointment.id)}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Date</td><td style="padding:6px 0;font-weight:700;color:#1f2937;">${esc(appointment.appointment_date)}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Time Slot</td><td style="padding:6px 0;font-weight:700;color:#1f2937;">${esc(appointment.time_slot)}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Consultation Mode</td><td style="padding:6px 0;font-weight:700;color:#1f2937;">${esc(appointment.consultation_mode)}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280;">Specialty</td><td style="padding:6px 0;font-weight:700;color:#1f2937;">${esc(appointment.specialty)}</td></tr>
            </table>
          </div>

          <p style="font-size:13px;color:#6b7280;margin-bottom:0;">If you have any questions, please contact the clinic at +91 93218 80359.</p>
        </div>
        <div style="background:#f9fafb;padding:16px 32px;font-size:11px;color:#aaa;text-align:center;">This is an automated notification from the Dr. Vaibhavi Clinic booking system.</div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Dr. Vaibhavi Clinic" <${process.env.GMAIL_USER}>`,
      to: recipient,
      replyTo: process.env.GMAIL_USER,
      subject: `Appointment Update: ${status.title}`,
      html: htmlBody,
    });

    console.log(`Status update sent by staff ${staff.id} for appointment ${appointmentId}:`, info.messageId);

    return NextResponse.json({ success: true, message: 'Status update sent successfully.' });
  } catch (error) {
    console.error('Error sending status update email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send status update.' },
      { status: 500 }
    );
  }
}
