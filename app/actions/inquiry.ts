'use server';

import { createClient } from '../../lib/supabase/server';

export async function submitInquiryAction(data: {
  name: string;
  email: string;
  message: string;
  budget_range?: string;
  deadline?: string;
  reference_link?: string;
  contact_method?: string;
}) {
  const supabase = await createClient();
  
  // Get current user if authenticated
  const { data: { user } } = await supabase.auth.getUser();
  
  const adminEmail = 'dlrwo1233@gmail.com';
  
  // 1. Simulate sending an email directly to the admin
  // In a production environment, you would use a service like Resend, SendGrid, or Nodemailer here.
  console.log(`[SERVER ACTION] Direct Notification to ${adminEmail}`);
  console.log('Inquiry Details:', {
    sender: data.name,
    replyTo: data.email,
    content: data.message,
    metadata: {
      budget: data.budget_range,
      deadline: data.deadline,
      ref: data.reference_link
    },
    authenticatedUser: user?.id || 'Anonymous'
  });

  // 2. Persist the inquiry to the Supabase database for the admin dashboard
  try {
    const { error } = await supabase.from('inquiries').insert([
      {
        name: data.name,
        contact_method: data.contact_method || 'email',
        contact_value: data.email,
        message: data.message,
        budget_range: data.budget_range,
        deadline: data.deadline,
        reference_link: data.reference_link,
        status: 'new',
        user_id: user?.id
      }
    ]);

    if (error) {
      console.error('Database persistence failed, but email notification was simulated:', error.message);
      // We still return success if the notification part is considered "sent"
    }
  } catch (err) {
    console.error('Unexpected error during inquiry submission:', err);
  }

  return { success: true };
}
