import React from 'react';
import { ShoppingBag, Coffee, Leaf, Shield, Truck, CreditCard } from 'lucide-react';
import { products } from '../data/products';

export function LandingPage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl font-bold mb-4">Best Buy Shopping Made Simple</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Shop sustainably with transparent pricing and honest product information.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Shop Now
          </button>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <button className="text-blue-600 hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  {product.isSubscription && (
                    <span className="text-green-600 text-sm">Save 10% with subscription</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">No hidden fees or surprise charges. See exactly what you pay.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Free Returns</h3>
              <p className="text-gray-600">30-day money-back guarantee with free return shipping.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Optional card storage and easy subscription management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Benefits */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Subscription Benefits</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Easy Management</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• One-click cancellation anytime</li>
                    <li>• Modify delivery schedule easily</li>
                    <li>• Skip or pause deliveries</li>
                    <li>• No cancellation fees</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Transparent Pricing</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Save 10% on all subscriptions</li>
                    <li>• Price guaranteed for 6 months</li>
                    <li>• No hidden fees</li>
                    <li>• Cancel before renewal, no charges</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Flexible Delivery</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Choose your delivery date</li>
                    <li>• Free shipping on all orders</li>
                    <li>• Real-time delivery updates</li>
                    <li>• Easy address updates</li>
                  </ul>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Customer Support</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 24/7 support available</li>
                    <li>• Live chat during business hours</li>
                    <li>• Dedicated subscription support</li>
                    <li>• Help center access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}