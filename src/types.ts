export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  processingFee: number;
  shippingFee: number;
  isSubscription?: boolean;
  subscriptionDetails?: string;
  lastUpdated: string;
  weight: number; // in kg
  returnPolicy: {
    eligible: boolean;
    acceptableConditions: string[];
    nonAcceptable: string[];
  };
  priceHistory: {
    date: string;
    price: number;
  }[];
  reviews: {
    rating: number;
    verified: boolean;
    date: string;
    comment: string;
    helpful: number;
    images?: string[];
  }[];
  nextRestockDate?: string;
  comparisonPrices?: {
    store: string;
    price: number;
    url: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  shipping: number;
  processingFees: number;
  total: number;
  items: CartItem[];
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  items: CartItem[];
  total: number;
  trackingNumber?: string;
  returnEligible: boolean;
  returnDeadline: string;
  nextBillingDate?: string;
  subscriptionStatus?: 'active' | 'paused' | 'cancelled';
}

export interface UserPreferences {
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  cookiePreferences: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  doNotTrack: boolean;
}