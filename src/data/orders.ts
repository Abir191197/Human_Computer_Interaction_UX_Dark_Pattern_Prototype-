export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  processingFee: number;
  shippingFee: number;
  lastUpdated: string;
  isSubscription?: boolean;
  subscriptionDetails?: string;
  weight?: number;
  returnPolicy?: {
    eligible: boolean;
    acceptableConditions: string[];
    nonAcceptable: string[];
  };
  priceHistory?: { date: string; price: number }[];
  reviews?: {
    rating: number;
    verified: boolean;
    date: string;
    comment: string;
    helpful: number;
  }[];
  comparisonPrices?: { store: string; price: number; url: string }[];
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled" | "returned";
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
  returnEligible: boolean;
  returnDeadline?: string;
}

export const orders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-02-15",
    status: "delivered",
    items: [
      {
        product: {
          id: 1,
          name: "Eco-Friendly Water Bottle",
          price: 24.99,
          description:
            "Sustainable, BPA-free water bottle made from recycled materials",
          image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
          stock: 23,
          processingFee: 1.99,
          shippingFee: 4.99,
          lastUpdated: "2 hours ago",
        },
        quantity: 2,
      },
    ],
    total: 63.94,
    trackingNumber: "1Z999AA1234567890",
    returnEligible: true,
    returnDeadline: "2024-03-16",
  },
  {
    id: "ORD-2024-002",
    date: "2024-02-10",
    status: "shipped",
    items: [
      {
        product: {
          id: 2,
          name: "Premium Coffee Subscription",
          price: 19.99,
          description:
            "Monthly delivery of freshly roasted, ethically sourced coffee beans",
          image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c",
          stock: 100,
          processingFee: 0,
          shippingFee: 0,
          isSubscription: true,
          subscriptionDetails:
            "Monthly delivery for $19.99/month. Cancel anytime with no fees.",
          lastUpdated: "1 hour ago",
        },
        quantity: 1,
      },
    ],
    total: 19.99,
    trackingNumber: "1Z999AA1234567891",
    returnEligible: true,
    returnDeadline: "2024-03-11",
  },
  {
    id: "ORD-2024-003",
    date: "2024-02-25",
    status: "processing",
    items: [
      {
        product: {
          id: 3,
          name: "Bamboo Toothbrush Set",
          price: 12.99,
          description: "Pack of 4 biodegradable bamboo toothbrushes",
          image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04",
          stock: 45,
          processingFee: 1.49,
          shippingFee: 3.99,
          lastUpdated: "30 minutes ago",
          weight: 0.1,
          returnPolicy: {
            eligible: true,
            acceptableConditions: ["Unopened package", "Manufacturing defects"],
            nonAcceptable: ["Used products", "Opened packaging"],
          },
          priceHistory: [
            { date: "2024-01-15", price: 14.99 },
            { date: "2024-02-01", price: 12.99 },
          ],
          reviews: [
            {
              rating: 4,
              verified: true,
              date: "2024-02-08",
              comment: "Great eco-friendly alternative!",
              helpful: 10,
            },
          ],
          comparisonPrices: [
            { store: "EcoStore", price: 13.99, url: "#" },
            { store: "GreenLife", price: 14.99, url: "#" },
          ],
        },
        quantity: 1,
      },
    ],
    total: 18.47,
    returnEligible: true,
    returnDeadline: "2024-03-30",
  },
];
