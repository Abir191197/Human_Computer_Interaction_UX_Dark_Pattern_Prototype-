import React, { useState, useMemo, useCallback } from "react";
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
  const [showDetails, setShowDetails] = useState({
    priceDetails: false,
    priceHistory: false,
    reviews: false,
    subscriptionDetails: false,
    returnPolicy: false,
  });

  const toggleDetails = useCallback(
    (detail: keyof typeof showDetails) =>
      setShowDetails((prev) => ({
        ...prev,
        [detail]: !prev[detail],
      })),
    []
  );

  const totalPrice = useMemo(
    () => product.price + product.processingFee + product.shippingFee,
    [product.price, product.processingFee, product.shippingFee]
  );

  const subscriptionPrice = useMemo(
    () => (product.isSubscription ? totalPrice * 0.9 : totalPrice),
    [product.isSubscription, totalPrice]
  );

  const shippingRates = useMemo(() => {
    const rates = {
      local: { light: 5, heavy: 8 },
      outside: { light: 10, heavy: 15 },
    };
    const isHeavy = product.weight > 0.5;
    return {
      local: isHeavy ? rates.local.heavy : rates.local.light,
      outside: isHeavy ? rates.outside.heavy : rates.outside.light,
    };
  }, [product.weight]);

  const averageRating = useMemo(
    () =>
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
          product.reviews.length
        : 0,
    [product.reviews]
  );

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

      {showDetails.priceHistory && (
        <PriceHistory priceHistory={product.priceHistory} />
      )}

      {showDetails.reviews && (
        <ReviewsSection
          reviews={product.reviews}
          averageRating={averageRating}
        />
      )}

      {product.isSubscription && (
        <SubscriptionToggle
          showSubscriptionDetails={showDetails.subscriptionDetails}
          subscriptionDetails={product.subscriptionDetails}
          subscriptionPrice={subscriptionPrice}
          toggleSubscriptionDetails={() => toggleDetails("subscriptionDetails")}
        />
      )}

      <div className="space-y-2">
        <div className="flex gap-2">
          <button
            onClick={() => toggleDetails("priceDetails")}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <Info size={16} />
            Price Details
          </button>
          <button
            onClick={() => toggleDetails("priceHistory")}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <LineChart size={16} />
            Price History
          </button>
          <button
            onClick={() => toggleDetails("reviews")}
            className="text-blue-600 text-sm hover:underline flex items-center gap-1">
            <Eye size={16} />
            Reviews
          </button>
        </div>

        {showDetails.priceDetails && (
          <PriceDetails
            product={product}
            shippingRates={shippingRates}
            totalPrice={totalPrice}
          />
        )}

        <button
          onClick={() => toggleDetails("returnPolicy")}
          className="text-blue-600 text-sm hover:underline flex items-center gap-1">
          <RotateCcw size={16} />
          Return Policy
        </button>

        {showDetails.returnPolicy && (
          <ReturnPolicy policy={product.returnPolicy} />
        )}
      </div>

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
            ? `Subscribe Now $${subscriptionPrice.toFixed(2)}`
            : `Add to Cart $${totalPrice.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}

const PriceHistory = ({ priceHistory }) => (
  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
    <h4 className="font-medium mb-2 flex items-center gap-2">
      <LineChart size={16} />
      Price History
    </h4>
    <div className="space-y-2">
      {priceHistory.map((history, index) => (
        <div key={index} className="flex justify-between text-sm">
          <span>{history.date}</span>
          <span>${history.price.toFixed(2)}</span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewsSection = ({ reviews, averageRating }) => (
  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-medium">Customer Reviews</h4>
      <div className="flex items-center gap-1">
        <Star className="text-yellow-400" size={16} />
        <span>{averageRating.toFixed(1)}/5</span>
      </div>
    </div>
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="border-t pt-2">
          <p className="text-sm mt-1">{review.comment}</p>
        </div>
      ))}
    </div>
  </div>
);

const SubscriptionToggle = ({
  showSubscriptionDetails,
  subscriptionDetails,
  subscriptionPrice,
  toggleSubscriptionDetails,
}) => (
  <div>
    <button
      onClick={toggleSubscriptionDetails}
      className="flex items-center justify-between w-full mb-4 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
      <div className="flex items-center gap-2">
        <Calendar size={20} className="text-blue-600" />
        <span className="font-medium text-blue-800">Subscription Details</span>
      </div>
      <ChevronDown
        size={20}
        className={`text-blue-600 transform transition-transform ${
          showSubscriptionDetails ? "rotate-180" : ""
        }`}
      />
    </button>

    {showSubscriptionDetails && (
      <div className="bg-blue-50 p-4 rounded-lg mb-4 animate-fadeIn">
        <p className="text-blue-700">{subscriptionDetails}</p>
        <div className="flex justify-between items-center pt-2">
          <span>Monthly Cost:</span>
          <span className="font-bold">${subscriptionPrice.toFixed(2)}</span>
        </div>
      </div>
    )}
  </div>
);

const PriceDetails = ({ product, shippingRates, totalPrice }) => (
  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-gray-600">Base Price:</span>
      <span className="font-semibold">${product.price.toFixed(2)}</span>
    </div>
    <div className="border-t pt-2">
      <div className="flex items-center gap-2 mb-2">
        <Truck size={16} className="text-gray-600" />
        <span className="font-medium">Shipping Rates:</span>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex justify-between">
          <span>Inside City:</span>
          <span>${shippingRates.local.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Outside City:</span>
          <span>${shippingRates.outside.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
);

const ReturnPolicy = ({ policy }) => (
  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
    <h5 className="font-medium mb-2">Return Policy</h5>

    {/* Acceptable Conditions */}
    <div>
      <h6 className="font-medium">Acceptable Conditions:</h6>
      <ul className="text-sm text-gray-600 space-y-1">
        {policy.acceptableConditions.map((condition, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            {condition}
          </li>
        ))}
      </ul>
    </div>

    {/* Not Acceptable Conditions */}
    <div>
      <h6 className="font-medium">Not Acceptable:</h6>
      <ul className="text-sm text-gray-600 space-y-1">
        {policy.nonAcceptable.map((condition, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-red-500">×</span>
            {condition}
          </li>
        ))}
      </ul>
    </div>

    {/* Additional Info */}
    <p className="text-sm text-gray-600 pt-2 border-t">
      30-day return window with free return shipping.
    </p>
  </div>
);

