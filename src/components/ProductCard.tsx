import React, { useState } from "react";
import {
  ShoppingCart,
  Info,
  Truck,
  RotateCcw,
  Star,
  ChevronDown,
  Eye,
  Calendar,
  LineChart,
} from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showSubscriptionDetails, setShowSubscriptionDetails] = useState(false);



  const calculateShipping = (weight: number) => {
    const rates = {
      local: {
        light: 5,
        heavy: 8,
      },
      outside: {
        light: 10,
        heavy: 15,
      },
    };

    const isHeavy = weight > 0.5;
    return {
      local: isHeavy ? rates.local.heavy : rates.local.light,
      outside: isHeavy ? rates.outside.heavy : rates.outside.light,
    };
  };

  const shipping = calculateShipping(product.weight);
  const averageRating =
    product.reviews.reduce((acc, rev) => acc + rev.rating, 0) /
    product.reviews.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && product.nextRestockDate && (
          <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            Restock: {product.nextRestockDate}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>

      {/* Price History Chart */}
      {showPriceHistory && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <LineChart size={16} />
            Price History
          </h4>
          <div className="space-y-2">
            {product.priceHistory.map((history, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{history.date}</span>
                <span>${history.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      {showReviews && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Customer Reviews</h4>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400" size={16} />
              <span>{averageRating.toFixed(1)}/5</span>
            </div>
          </div>
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="border-t pt-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      {review.verified && (
                        <span className="text-green-600 text-xs">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-1">{review.comment}</p>
                    {review.images && (
                      <div className="flex gap-2 mt-2">
                        {review.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="Review"
                            className="w-16 h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Details */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowPriceDetails(!showPriceDetails)}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <Info size={16} />
            Price Details
          </button>
          <button
            onClick={() => setShowPriceHistory(!showPriceHistory)}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <LineChart size={16} />
            Price History
          </button>
          <button
            onClick={() => setShowReviews(!showReviews)}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <Eye size={16} />
            Reviews
          </button>
          {/* Return Policy */}
          <button
            onClick={() => setShowReturnPolicy(!showReturnPolicy)}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <RotateCcw size={16} />
            Return Policy
          </button>

          {/* Subscription Toggle Button */}
          {product.isSubscription && (
            <button
              onClick={() =>
                setShowSubscriptionDetails(!showSubscriptionDetails)
              }
              className="text-blue-600 text-sm hover:underline flex items-center gap-1">
              <Calendar size={20} className="text-blue-600" />
              <span className="font-medium text-blue-800">
                Subscription Details
              </span>
              <ChevronDown
                size={20}
                className={`text-blue-600 transform transition-transform ${
                  showSubscriptionDetails ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {showPriceDetails && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            </div>
            {product.processingFee > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Processing Fee:</span>
                  <span>${product.processingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Tax (8%):</span>
                  <span>${(product.price * 0.08).toFixed(2)}</span>
                </div>
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex items-center gap-2 mb-2">
                <Truck size={16} className="text-gray-600" />
                <span className="font-medium">Shipping Rates:</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Inside City:</span>
                  <span>${shipping.local.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Outside City:</span>
                  <span>${shipping.outside.toFixed(2)}</span>
                </div>
                {product.weight > 0.5 && (
                  <p className="text-xs text-gray-500 mt-1">
                    *Higher rate applies due to item weight ({product.weight}kg)
                  </p>
                )}
              </div>
            </div>

            {product.comparisonPrices && (
              <div className="border-t pt-2">
                <h5 className="font-medium mb-2">Compare Prices</h5>
                <div className="space-y-1">
                  {product.comparisonPrices.map((comp, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <a
                        href={comp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline">
                        {comp.store}
                      </a>
                      <span>${comp.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        {showReturnPolicy && (
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div>
              <h5 className="font-medium mb-2">Acceptable for Return:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.returnPolicy.acceptableConditions.map(
                  (condition, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      {condition}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h5 className="font-medium mb-2">Not Acceptable:</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {product.returnPolicy.nonAcceptable.map((condition, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500">×</span>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-600 pt-2 border-t">
              30-day return window with free return shipping
            </p>
          </div>
        )}
      </div>

      {/* Subscription Details Panel */}
      {product.isSubscription && showSubscriptionDetails && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4 animate-fadeIn">
          <p className="text-blue-700 text-sm">{product.subscriptionDetails}</p>
          <div className="bg-white p-4 rounded-lg border border-blue-200 mt-3">
            <h5 className="font-medium text-blue-800 mb-2">
              Subscription Benefits
            </h5>
            <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
              <li>Save 10% on every delivery</li>
              <li>Skip or pause service anytime</li>
              <li>Cancel with one click, no questions asked</li>
              <li>Same price guaranteed for 6 months</li>
            </ul>
          </div>
        </div>
      )}

      {/* Stock and Add to Cart */}
      <div className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {product.stock > 0
              ? `In Stock: ${product.stock} units`
              : "Out of Stock"}
          </span>
          <span className="text-xs text-gray-500">
            Updated: {product.lastUpdated}
          </span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400">
          <ShoppingCart size={20} />
          {product.isSubscription
            ? `Subscribe Now $${(
                product.price +
                product.processingFee +
                product.price * 0.08 +
                product.shippingFee
              ).toFixed(2)}`
            : `Add to Cart $${(
                product.price +
                product.processingFee +
                product.price * 0.08 +
                product.shippingFee
              ).toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}
