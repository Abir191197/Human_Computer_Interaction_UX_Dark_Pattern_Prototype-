import React from 'react';
import { OrderSummary as OrderSummaryType } from '../types';
import { Check, HelpCircle } from 'lucide-react';

interface OrderSummaryProps {
  order: OrderSummaryType;
  onContinueShopping: () => void;
}

export function OrderSummary({ order, onContinueShopping }: OrderSummaryProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Thank You for Your Order!</h2>
        <p className="text-gray-600 mt-2">Your order has been confirmed and will be shipped soon.</p>
      </div>

      <div className="border-t border-b py-4 mb-4">
        {order.items.map((item) => (
          <div key={item.product.id} className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                {item.product.isSubscription && (
                  <div className="text-sm text-blue-600">
                    <p>Monthly Subscription</p>
                    <button className="text-blue-500 hover:underline text-xs mt-1">
                      Manage subscription
                    </button>
                  </div>
                )}
              </div>
            </div>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        {order.processingFees > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Processing Fees:</span>
            <span>${order.processingFees.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>${order.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start gap-2">
          <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-1" />
          <div className="text-sm">
            <h4 className="font-medium text-blue-800 mb-2">Need Help?</h4>
            <div className="space-y-2 text-blue-700">
              <p>• Track your order status in real-time</p>
              <p>• Free returns within 30 days</p>
              <p>• 24/7 customer support</p>
              <p>• Email: support@myshop.com</p>
              <p>• Phone: 1-800-</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onContinueShopping}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}