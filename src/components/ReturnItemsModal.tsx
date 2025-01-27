import React, { useState } from "react";

interface ReturnItemsModalProps {
  orderId: string;
  items: { id: number; name: string; image: string }[];
  onClose: () => void;
}

export const ReturnItemsModal = ({
  orderId,
  items,
  onClose,
}: ReturnItemsModalProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [returnReason, setReturnReason] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmit = () => {
    if (!returnReason || selectedItems.length === 0) {
      alert("Please select items and provide a return reason.");
      return;
    }

    // Simulate return submission
    console.log("Return Submitted:", { orderId, selectedItems, returnReason });

    // Show success modal
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    onClose(); // Close the original modal as well
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Return Items</h2>

        <div className="space-y-4">
          <h3 className="font-semibold mb-2">Select items to return:</h3>
          {items.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer mb-2">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
                className="form-checkbox text-blue-600"
              />
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 object-cover rounded"
              />
              <span className="text-gray-800">{item.name}</span>
            </label>
          ))}

          <div>
            <label htmlFor="returnReason" className="block font-semibold mb-2">
              Reason for return:
            </label>
            <textarea
              id="returnReason"
              value={returnReason}
              onChange={(e) => setReturnReason(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the reason for your return..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Submit Return
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Return Submitted</h2>
            <p>Your return request has been successfully submitted.</p>
            <p className="mt-4">
              Please allow 2 to 5 days for us to process your return. You will
              receive an update soon.
            </p>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={handleCloseSuccessModal}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
