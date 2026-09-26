export type Category = 'All' | 'Kurtis' | 'Co-ords' | 'Dresses' | 'Pakistani Wear' | 'Bottoms' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  provenance: string;
  fabric: string;
  colors: {
    name: string;
    hex: string;
    image?: string;
  }[];
  sizes: {
    size: 'M' | 'L' | 'XL' | 'XXL';
    stock: number;
    status: 'Ready' | 'Few Left' | '3 Left' | 'Sold Out';
  }[];
  details: string[];
  careInstructions: string[];
  pairings?: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  verified: boolean;
  date: string;
  comment: string;
  images?: string[];
  sizePurchased?: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  items: {
    productName: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Pending';
  date: string;
}

export interface InquiryMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  timeAgo: string;
  status: 'Unread' | 'Replied';
}

export interface UserProfile {
  id: string;
  fullName: string;
  phone?: string;
  role: 'customer' | 'admin';
}
