import { supabase, isSupabaseConfigured } from '../lib/supabase';

const WISHLIST_LOCAL_KEY = 'simply_styld_wishlist';

export const wishlistService = {
  getLocalWishlist(): string[] {
    try {
      const stored = localStorage.getItem(WISHLIST_LOCAL_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load local wishlist');
    }
    return ['gulzar-embroidered-chanderi'];
  },

  saveLocalWishlist(ids: string[]) {
    try {
      localStorage.setItem(WISHLIST_LOCAL_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn('Failed to save local wishlist');
    }
  },

  async getUserWishlist(userId?: string | null): Promise<string[]> {
    if (!userId || !isSupabaseConfigured()) {
      return this.getLocalWishlist();
    }

    try {
      const { data, error } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', userId);

      if (error || !data) {
        return this.getLocalWishlist();
      }

      const remoteIds = data.map((d: any) => d.product_id);
      // Merge with local wishlist
      const localIds = this.getLocalWishlist();
      const merged = Array.from(new Set([...remoteIds, ...localIds]));
      this.saveLocalWishlist(merged);
      return merged;
    } catch (err) {
      return this.getLocalWishlist();
    }
  },

  async toggleWishlistItem(productId: string, userId?: string | null): Promise<string[]> {
    const current = this.getLocalWishlist();
    const exists = current.includes(productId);
    const updated = exists ? current.filter((id) => id !== productId) : [...current, productId];
    this.saveLocalWishlist(updated);

    if (userId && isSupabaseConfigured()) {
      try {
        if (exists) {
          await supabase
            .from('wishlists')
            .delete()
            .match({ user_id: userId, product_id: productId });
        } else {
          await supabase
            .from('wishlists')
            .insert([{ user_id: userId, product_id: productId }]);
        }
      } catch (err) {
        console.warn('Failed to sync wishlist with Supabase:', err);
      }
    }

    return updated;
  },
};
