import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Review } from '../types';
import { REVIEWS } from '../data/mockData';

export const reviewsService = {
  async getReviewsForProduct(productId: string): Promise<Review[]> {
    if (!isSupabaseConfigured()) {
      return REVIEWS;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return REVIEWS;
      }

      return data.map((r: any) => ({
        id: r.id,
        author: r.author,
        location: r.location || 'India',
        rating: Number(r.rating) || 5,
        verified: Boolean(r.verified),
        date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        comment: r.content,
        images: r.photos || [],
      }));
    } catch (err) {
      console.warn('Error fetching reviews from Supabase:', err);
      return REVIEWS;
    }
  },

  async addReview(params: {
    productId: string;
    userId?: string | null;
    author: string;
    location: string;
    rating: number;
    content: string;
    photos?: string[];
  }): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('reviews').insert([
        {
          product_id: params.productId,
          user_id: params.userId || null,
          author: params.author,
          location: params.location,
          rating: params.rating,
          content: params.content,
          verified: true,
          photos: params.photos || [],
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
