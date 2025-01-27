export const products = [
  {
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
    weight: 0.5,
    returnPolicy: {
      eligible: true,
      acceptableConditions: [
        "Unopened in original packaging",
        "Manufacturing defects",
        "Wrong item received",
      ],
      nonAcceptable: ["Used or opened items", "Damaged due to misuse"],
    },
    priceHistory: [
      { date: "2024-01-15", price: 27.99 },
      { date: "2024-02-01", price: 25.99 },
      { date: "2024-02-15", price: 24.99 },
    ],
    reviews: [
      {
        rating: 5,
        verified: true,
        date: "2024-02-10",
        comment: "Great quality, keeps water cold for hours!",
        helpful: 12,
      },
      {
        rating: 4,
        verified: true,
        date: "2024-02-05",
        comment: "Good bottle, but slightly heavy",
        helpful: 8,
      },
    ],
    comparisonPrices: [
      { store: "EcoStore", price: 26.99, url: "#" },
      { store: "GreenLife", price: 25.99, url: "#" },
    ],
  },
  {
  id: 2,
  name: "Premium Coffee Subscription",
  price: 19.99,
  description:
    "Monthly delivery of freshly roasted, ethically sourced coffee beans",
  image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c",
  stock: 100,
  processingFee: 2.99,
  shippingFee: 4.99,
  isSubscription: true,
  subscriptionDetails:
    "Monthly delivery for $19.99/month. Cancel anytime with no fees.",
  lastUpdated: "1 hour ago",
  weight: 0.25,
  returnPolicy: {
    eligible: true,
    acceptableConditions: [
      "Unopened bags only",
      "Wrong coffee type received",
    ],
    nonAcceptable: ["Opened coffee bags", "Expired coffee"],
  },
  priceHistory: [
    { date: "2024-01-15", price: 21.99 },
    { date: "2024-02-01", price: 19.99 },
  ],
  reviews: [
    {
      rating: 5,
      verified: true,
      date: "2024-02-12",
      comment: "Best coffee subscription service!",
      helpful: 15,
    },
  ],
  comparisonPrices: [
    { store: "CoffeeClub", price: 22.99, url: "#" },
    { store: "BeanBox", price: 21.99, url: "#" },
  ],
}
,
  {
    id: 3,
    name: "Bamboo Toothbrush Set",
    price: 12.99,
    description: "Pack of 4 biodegradable bamboo toothbrushes for all",
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
  // {
  //   id: 4,
  //   name: "Organic Tea Collection",
  //   price: 29.99,
  //   description: "Assortment of premium organic teas from sustainable farms",
  //   image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12",
  //   stock: 60,
  //   processingFee: 1.99,
  //   shippingFee: 4.99,
  //   isSubscription: true,
  //   subscriptionDetails:
  //     "Monthly tea selection delivered to your door. Easy cancellation.",
  //   lastUpdated: "1 hour ago",
  //   weight: 0.3,
  //   returnPolicy: {
  //     eligible: true,
  //     acceptableConditions: ["Unopened tea boxes", "Damaged during shipping"],
  //     nonAcceptable: ["Opened tea packages", "Expired products"],
  //   },
  //   priceHistory: [
  //     { date: "2024-01-15", price: 32.99 },
  //     { date: "2024-02-01", price: 29.99 },
  //   ],
  //   reviews: [
  //     {
  //       rating: 5,
  //       verified: true,
  //       date: "2024-02-11",
  //       comment: "Amazing variety of teas!",
  //       helpful: 18,
  //     },
  //   ],
  //   comparisonPrices: [
  //     { store: "TeaHouse", price: 31.99, url: "#" },
  //     { store: "OrganicTea", price: 32.99, url: "#" },
  //   ],
  // },
  // {
  //   id: 5,
  //   name: "Reusable Produce Bags",
  //   price: 15.99,
  //   description: "Set of 6 mesh bags for plastic-free grocery shopping",
  //   image:
  //     "https://plus.unsplash.com/premium_photo-1663089801361-edfc8d75a0cf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   stock: 75,
  //   processingFee: 1.49,
  //   shippingFee: 3.99,
  //   lastUpdated: "45 minutes ago",
  //   weight: 0.2,
  //   returnPolicy: {
  //     eligible: true,
  //     acceptableConditions: [
  //       "Unused with tags attached",
  //       "Manufacturing defects",
  //     ],
  //     nonAcceptable: ["Used or washed items", "Missing pieces from set"],
  //   },
  //   priceHistory: [
  //     { date: "2024-01-15", price: 17.99 },
  //     { date: "2024-02-01", price: 15.99 },
  //   ],
  //   reviews: [
  //     {
  //       rating: 4,
  //       verified: true,
  //       date: "2024-02-09",
  //       comment: "Perfect for grocery shopping!",
  //       helpful: 14,
  //     },
  //   ],
  //   comparisonPrices: [
  //     { store: "EcoStore", price: 16.99, url: "#" },
  //     { store: "GreenLife", price: 17.99, url: "#" },
  //   ],
  // },
  // {
  //   id: 6,
  //   name: "Solar-Powered Charger",
  //   price: 39.99,
  //   description: "Eco-friendly portable charger with dual USB ports",
  //   image: "https://images.unsplash.com/photo-1617788138017-80ad40651399",
  //   stock: 30,
  //   processingFee: 2.49,
  //   shippingFee: 5.99,
  //   lastUpdated: "3 hours ago",
  //   weight: 0.8,
  //   returnPolicy: {
  //     eligible: true,
  //     acceptableConditions: [
  //       "Unopened in original packaging",
  //       "Non-functioning device",
  //       "Missing accessories",
  //     ],
  //     nonAcceptable: ["Physical damage", "Water damage", "Modified devices"],
  //   },
  //   priceHistory: [
  //     { date: "2024-01-15", price: 44.99 },
  //     { date: "2024-02-01", price: 39.99 },
  //   ],
  //   reviews: [
  //     {
  //       rating: 4,
  //       verified: true,
  //       date: "2024-02-07",
  //       comment: "Great for camping trips!",
  //       helpful: 20,
  //     },
  //   ],
  //   comparisonPrices: [
  //     { store: "TechGreen", price: 42.99, url: "#" },
  //     { store: "EcoGadgets", price: 41.99, url: "#" },
  //   ],
  // },
];