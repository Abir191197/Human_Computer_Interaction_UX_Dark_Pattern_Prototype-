import React, { useState } from 'react';
import { CreditCard, Info, X } from 'lucide-react';
import { CartItem } from '../types';

interface PaymentProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  processingFees: number;
  total: number;
  onClose: () => void;
  onComplete: () => void;
}

export function Payment({ 
  items, 
  subtotal, 
  tax, 
  shipping, 
  processingFees, 
  total,
  onClose,
  onComplete
}: PaymentProps) {
  const [saveCard, setSaveCard] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancel = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    onClose();
    // Additional cleanup if needed
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Secure Payment</h2>
          <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div>
            <h3 className="font-semibold mb-4">Payment Details</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="saveCard"
                  checked={saveCard}
                  onChange={(e) => setSaveCard(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="saveCard" className="text-sm text-gray-600">
                  Save card for future purchases (optional)
                </label>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {processingFees > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    Processing Fees
                    <button className="text-gray-400 hover:text-gray-600">
                      <Info size={16} />
                    </button>
                  </span>
                  <span>${processingFees.toFixed(2)}</span>
                </div>
              )}
              {shipping > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>By completing this purchase you agree to our Terms of Service.</p>
              {items.some(item => item.product.isSubscription) && (
                <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Subscription Information</h4>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Cancel anytime with one click</li>
                    <li>• No cancellation fees</li>
                    <li>• Modify delivery schedule easily</li>
                    <li>• Price guaranteed for 6 months</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel Order
          </button>
          <button
            onClick={onComplete}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Complete Purchase
          </button>
        </div>

        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Cancel Order?</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to cancel this order? You can always come back later.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200"
                >
                  Keep Shopping
                </button>
                <button
                  onClick={confirmCancel}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}