import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  message: string;
  type: "info" | "success" | "warning" | "error";
}

const MyToast: React.FC<ToastProps> = ({ message, type }) => {
  const showToast = () => {
    toast(message, { type });
  };

  return (
    <div onClick={showToast}>
      {message}
    </div>
  );
};

export const ToastContainerWrapper: React.FC = () => {
  return <ToastContainer autoClose={3000} />;
};

export default MyToast;
