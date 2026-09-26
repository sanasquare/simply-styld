import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { InquiryMessage } from '../types';
import { INITIAL_INQUIRIES } from '../data/mockData';

export const inquiriesService = {
  async getInquiries(): Promise<InquiryMessage[]> {
    if (!isSupabaseConfigured()) {
      return INITIAL_INQUIRIES;
    }

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return INITIAL_INQUIRIES;
      }

      return data.map((i: any) => ({
        id: i.id,
        name: i.name,
        email: i.email,
        phone: i.phone || '',
        subject: i.subject,
        message: i.message,
        timeAgo: 'Recently',
        status: i.status === 'unread' ? 'Unread' : 'Replied',
      }));
    } catch (err) {
      console.warn('Error fetching inquiries from Supabase:', err);
      return INITIAL_INQUIRIES;
    }
  },

  async sendInquiry(inquiry: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('inquiries').insert([
        {
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          subject: inquiry.subject,
          message: inquiry.message,
          status: 'unread',
        },
      ]);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
