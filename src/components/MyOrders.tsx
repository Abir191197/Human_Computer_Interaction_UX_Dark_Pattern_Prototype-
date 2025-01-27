import React, { useState } from "react";
import { orders } from "../data/orders";
import { ReturnItemsModal } from "./ReturnItemsModal";
import { CancelOrderModal } from "./CancelOrderModal";

export function MyOrders() {
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [modalOrder, setModalOrder] = useState<any | null>(null);

  const handleCancelOrder = (order: any) => {
    setModalOrder(order);
    setShowCancelModal(true);
  };

  const handleReturnItems = (order: any) => {
    setModalOrder(order);
    setShowReturnModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-semibold">Order #{order.id}</h2>
                <p className="text-gray-600">Placed on {order.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 py-4 border-t">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    Total: ${order.total.toFixed(2)}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600">
                      Tracking: {order.trackingNumber}
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  {order.status === "processing" && (
                    <button
                      onClick={() => handleCancelOrder(order)}
                      className="text-red-600 hover:text-red-700 text-sm">
                      Cancel Order
                    </button>
                  )}
                  {order.status === "delivered" && order.returnEligible && (
                    <button
                      onClick={() => handleReturnItems(order)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                      Return Items
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showReturnModal && modalOrder && (
        <ReturnItemsModal
          orderId={modalOrder.id}
          items={modalOrder.items.map((i: any) => ({
            id: i.product.id,
            name: i.product.name,
            image: i.product.image,
          }))}
          onClose={() => setShowReturnModal(false)}
        />
      )}

      {showCancelModal && modalOrder && (
        <CancelOrderModal
          orderId={modalOrder.id}
          onClose={() => setShowCancelModal(false)}
        />
      )}
    </div>
  );
}
