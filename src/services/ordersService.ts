import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Order, CartItem } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';

const LOCAL_STORAGE_ORDERS_KEY = 'simply_styld_orders';

export const ordersService = {
  getLocalOrders(): Order[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to read orders from localStorage');
    }
    return INITIAL_ORDERS;
  },

  saveLocalOrders(orders: Order[]) {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage');
    }
  },

  async getAllOrders(): Promise<Order[]> {
    if (!isSupabaseConfigured()) {
      return this.getLocalOrders();
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_ref,
          customer_name,
          customer_email,
          customer_phone,
          shipping_address,
          subtotal,
          discount,
          total,
          payment_method,
          status,
          created_at,
          order_items (
            product_name,
            size,
            color,
            unit_price,
            quantity
          )
        `)
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Supabase orders fetch error, falling back to local:', error?.message);
        return this.getLocalOrders();
      }

      return data.map((o: any) => ({
        id: o.order_ref || o.id,
        customerName: o.customer_name,
        city: o.shipping_address?.city || 'Mumbai',
        address: `${o.shipping_address?.street || ''}, ${o.shipping_address?.city || ''}`,
        phone: o.customer_phone,
        email: o.customer_email,
        subtotal: Number(o.subtotal),
        discount: Number(o.discount),
        total: Number(o.total),
        paymentMethod: o.payment_method,
        status: o.status as Order['status'],
        date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: (o.order_items || []).map((item: any) => ({
          productName: item.product_name,
          size: item.size,
          color: item.color,
          price: Number(item.unit_price),
          quantity: Number(item.quantity),
        })),
      }));
    } catch (err) {
      console.error('Error in getAllOrders:', err);
      return this.getLocalOrders();
    }
  },

  async createOrder(params: {
    orderRef: string;
    userId?: string | null;
    customerName: string;
    email: string;
    phone: string;
    address: { street: string; city: string; state: string; pincode: string };
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
    paymentMethod: string;
  }): Promise<{ success: boolean; error?: string }> {
    // Always keep a local copy
    const newLocalOrder: Order = {
      id: params.orderRef,
      customerName: params.customerName,
      city: params.address.city,
      address: `${params.address.street}, ${params.address.city}, ${params.address.state} - ${params.address.pincode}`,
      phone: params.phone,
      email: params.email,
      items: params.items.map((i) => ({
        productName: i.product.name,
        size: i.selectedSize,
        color: i.selectedColor,
        price: i.product.price,
        quantity: i.quantity,
      })),
      subtotal: params.subtotal,
      discount: params.discount,
      total: params.total,
      paymentMethod: params.paymentMethod,
      status: 'Processing',
      date: 'Just now',
    };

    const currentLocal = this.getLocalOrders();
    this.saveLocalOrders([newLocalOrder, ...currentLocal]);

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      // 1. Insert into orders table
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            order_ref: params.orderRef,
            user_id: params.userId || null,
            customer_name: params.customerName,
            customer_email: params.email,
            customer_phone: params.phone,
            shipping_address: params.address,
            subtotal: params.subtotal,
            discount: params.discount,
            total: params.total,
            payment_method: params.paymentMethod,
            payment_status: 'Paid',
            status: 'Processing',
          },
        ])
        .select()
        .single();

      if (orderError) {
        console.error('Supabase order creation error:', orderError);
        return { success: false, error: orderError.message };
      }

      // 2. Insert items into order_items table
      if (orderData && params.items.length > 0) {
        const orderItemsPayload = params.items.map((item) => ({
          order_id: orderData.id,
          product_id: item.product.id,
          product_name: item.product.name,
          product_image: item.product.images[0] || '',
          size: item.selectedSize,
          color: item.selectedColor,
          unit_price: item.product.price,
          quantity: item.quantity,
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItemsPayload);

        if (itemsError) {
          console.error('Error inserting order items:', itemsError);
        }
      }

      return { success: true };
    } catch (err: any) {
      console.error('Unexpected error in createOrder:', err);
      return { success: true }; // Local order already saved
    }
  },

  async updateOrderStatus(orderRefOrId: string, status: Order['status']): Promise<{ success: boolean; error?: string }> {
    // Update local cache
    const current = this.getLocalOrders();
    const updated = current.map((o) => (o.id === orderRefOrId ? { ...o, status } : o));
    this.saveLocalOrders(updated);

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .or(`order_ref.eq.${orderRefOrId},id.eq.${orderRefOrId}`);

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },
};
