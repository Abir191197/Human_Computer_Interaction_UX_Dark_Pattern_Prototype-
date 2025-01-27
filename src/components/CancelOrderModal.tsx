import React, { useState } from "react";

interface CancelOrderModalProps {
  orderId: string;
  onClose: () => void;
}

export const CancelOrderModal = ({
  orderId,
  onClose,
}: CancelOrderModalProps) => {
  const [isCanceling, setIsCanceling] = useState(false);
  const [refundTime, setRefundTime] = useState("1-2 days");
  const [showRefundConfirmation, setShowRefundConfirmation] = useState(false);

  const handleCancel = () => {
    setIsCanceling(true);

    // Simulating the cancel process and showing the confirmation
    setTimeout(() => {
      setRefundTime("within 1 day"); // Simulate expedited refund
      setShowRefundConfirmation(true); // Show the confirmation modal
      setIsCanceling(false); // Allow further actions
    }, 1000); // Simulate delay for cancellation process
  };

  return (
    <>
      {/* Main Cancellation Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
          <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
          <p className="mb-4">
            Are you sure you want to cancel order #{orderId}?
          </p>
          <p className="text-gray-600 text-sm mb-6">
            Refund will be processed{" "}
            {isCanceling ? ` ${refundTime}` : "within 1-2 days."}
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200">
              No, Go Back
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              disabled={isCanceling} // Disable button while canceling
            >
              {isCanceling ? "Processing..." : "Yes, Cancel"}
            </button>
          </div>
        </div>
      </div>

      {/* Refund Confirmation Modal */}
      {showRefundConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-600">
              Cancellation Successful
            </h2>
            <p className="mb-4">
              Your cancellation request for Order #{orderId} has been
              successfully submitted.
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Refund will be processed {refundTime}.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
