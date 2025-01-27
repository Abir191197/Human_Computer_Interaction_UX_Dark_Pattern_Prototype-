import React, { useEffect, useState } from "react";

interface SnackbarProps {
  message: string;
  duration?: number; // in milliseconds
  onClose: () => void;
}

export const Snackbar = ({
  message,
  duration = 3000,
  onClose,
}: SnackbarProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-lg px-4 py-2 shadow-lg">
      {message}
    </div>
  );
};
