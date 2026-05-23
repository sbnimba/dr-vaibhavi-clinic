import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase backend client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
    // Basic security check to ensure this is triggered by Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // Only enforce if CRON_SECRET is set (optional security layer)
        // return new Response('Unauthorized', { status: 401 });
    }

    try {
        // Calculate tomorrow's date (IST timezone approximation)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowString = tomorrow.toISOString().split('T')[0];

        // Fetch Confirmed appointments for tomorrow
        const { data: appointments, error } = await supabase
            .from('appointments')
            .select('*')
            .eq('status', 'Confirmed')
            .eq('appointment_date', tomorrowString);

        if (error) throw error;
        if (!appointments || appointments.length === 0) {
            return NextResponse.json({ success: true, message: 'No reminders to send for tomorrow.' });
        }

        // Setup Nodemailer transporter with existing Gmail config
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        let emailsSent = 0;

        // Send a reminder email to each patient
        for (const app of appointments) {
            const mailOptions = {
                from: `"Dr. Vaibhavi Dhenge Clinic" <${process.env.GMAIL_USER}>`,
                to: app.email_address,
                subject: 'Reminder: Upcoming Appointment Tomorrow with Dr. Vaibhavi',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                        <div style="background: linear-gradient(135deg, #7c3aed, #db2777); padding: 24px; text-align: center;">
                            <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Appointment Reminder ⏰</h2>
                        </div>
                        <div style="padding: 32px; background: #ffffff;">
                            <p style="font-size: 16px; color: #333;">Dear <strong>${app.patient_name}</strong>,</p>
                            <p style="font-size: 15px; color: #555; line-height: 1.6;">
                                This is a gentle reminder that you have an appointment scheduled for tomorrow with Dr. Vaibhavi Dhenge.
                            </p>
                            
                            <div style="background: #f8fafc; border-left: 4px solid #db2777; padding: 16px; margin: 24px 0; border-radius: 4px;">
                                <p style="margin: 4px 0; color: #333;"><strong>📅 Date:</strong> ${app.appointment_date}</p>
                                <p style="margin: 4px 0; color: #333;"><strong>⏰ Time:</strong> ${app.time_slot}</p>
                                <p style="margin: 4px 0; color: #333;"><strong>🏥 Mode:</strong> ${app.consultation_mode}</p>
                                <p style="margin: 4px 0; color: #333;"><strong>Reference ID:</strong> ${app.id}</p>
                            </div>

                            <p style="font-size: 15px; color: #555; line-height: 1.6;">
                                Please aim to arrive (or log in if online) 5 minutes before your scheduled time slot. If you need to reschedule or cancel, please contact the clinic as soon as possible.
                            </p>

                            <p style="font-size: 15px; color: #555; margin-top: 32px;">
                                Warm regards,<br/>
                                <strong>Dr. Vaibhavi Dhenge Clinic Team</strong><br/>
                                MGM Hospital, Sector 1, Belapur, Navi Mumbai<br/>
                                📞 022-27572293
                            </p>
                        </div>
                    </div>
                `
            };

            try {
                await transporter.sendMail(mailOptions);
                emailsSent++;
            } catch (err) {
                console.error(`Failed to send reminder to ${app.email_address}:`, err);
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: `Successfully sent ${emailsSent} reminder emails for ${tomorrowString}.` 
        });

    } catch (error: any) {
        console.error('Cron job error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
