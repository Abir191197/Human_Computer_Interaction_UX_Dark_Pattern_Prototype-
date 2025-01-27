import React from 'react';
import { X, HelpCircle } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
  onClose: () => void;
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout, onClose }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const processingFees = items.reduce((sum, item) => sum + item.product.processingFee * item.quantity, 0);
  const shippingFees = items.reduce((sum, item) => sum + item.product.shippingFee, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + processingFees + shippingFees + tax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <>
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-4 py-4 border-b">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                  {item.product.isSubscription && (
                    <div className="text-sm text-blue-600">
                      <p>Monthly Subscription</p>
                      <button className="text-blue-500 hover:underline text-xs mt-1">
                        View cancellation policy
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.product.id, Number(e.target.value))}
                    className="border rounded p-1"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {processingFees > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Processing Fees:</span>
                  <span>${processingFees.toFixed(2)}</span>
                </div>
              )}
              {shippingFees > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span>${shippingFees.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <HelpCircle size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-700 mb-1">Our Guarantee</p>
                  <ul className="space-y-1">
                    <li>• 30-day money-back guarantee</li>
                    <li>• Free returns with prepaid shipping label</li>
                    <li>• Customer support available 24/7</li>
                    <li>• One-click subscription cancellation</li>
                  </ul>
                </div>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}