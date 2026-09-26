import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product } from '../types';
import { PRODUCTS } from '../data/mockData';

export const productsService = {
  async getProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured()) {
      return PRODUCTS;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        console.warn('Supabase products fetch failed or empty, falling back to mock data:', error?.message);
        return PRODUCTS;
      }

      return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        subCategory: item.sub_category,
        price: Number(item.price),
        originalPrice: item.original_price ? Number(item.original_price) : undefined,
        badge: item.badge,
        rating: Number(item.rating) || 5.0,
        reviewCount: Number(item.review_count) || 0,
        images: Array.isArray(item.images) ? item.images : JSON.parse(item.images || '[]'),
        description: item.description,
        provenance: item.provenance,
        fabric: item.fabric,
        colors: Array.isArray(item.colors) ? item.colors : JSON.parse(item.colors || '[]'),
        sizes: Array.isArray(item.sizes) ? item.sizes : JSON.parse(item.sizes || '[]'),
        details: item.details || [],
        careInstructions: item.care_instructions || [],
      }));
    } catch (err) {
      console.error('Unexpected error fetching products from Supabase:', err);
      return PRODUCTS;
    }
  },

  async createProduct(product: Product): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('products').insert([
        {
          id: product.id,
          name: product.name,
          category: product.category,
          sub_category: product.subCategory,
          price: product.price,
          original_price: product.originalPrice,
          badge: product.badge,
          rating: product.rating,
          review_count: product.reviewCount,
          provenance: product.provenance,
          fabric: product.fabric,
          description: product.description,
          images: product.images,
          colors: product.colors,
          sizes: product.sizes,
          details: product.details,
          care_instructions: product.careInstructions,
        },
      ]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to create product' };
    }
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const payload: any = {};
      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.price !== undefined) payload.price = updates.price;
      if (updates.category !== undefined) payload.category = updates.category;
      if (updates.sizes !== undefined) payload.sizes = updates.sizes;
      if (updates.description !== undefined) payload.description = updates.description;

      const { error } = await supabase.from('products').update(payload).eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update product' };
    }
  },
};
