import React, { ReactNode } from "react";
import { DangerButton, PrimaryButton } from "./buttons";

interface modalComponentProps {
  onClose: () => void;
  onSubmit: () => void;
  children: ReactNode;
  title: string;
}

export default function ModalComponent({ onClose, onSubmit, children, title }: modalComponentProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal bg-white w-1/2 p-4 rounded-lg shadow-lg shadow-gray-400 border border-yellow-300 ">
        <h2 className="text-xl font-semibold mb-4 border-b pb-4">{title}</h2>
        {children}
        <div className="flex justify-end gap-4 border-t pt-4">
          <DangerButton onClick={onClose} text="Batal" />
          <PrimaryButton onClick={onSubmit} text="Submit" />
        </div>
      </div>
    </div>
  );
}
