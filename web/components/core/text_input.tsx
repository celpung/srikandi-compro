import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface textInputInterface {
  type: string;
  id: string;
  placeholder: string;
  icon?: IconDefinition;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface selectInputProps {
  id: string;
  placeholder: string;
  icon?: IconDefinition;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;

}

export function TextInput({ type, id, placeholder, icon, label, onChange }: textInputInterface) {
  const inputPaddingClass = icon ? "pl-10" : "pl-2";

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-gray-600 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          id={id}
          className={`w-full ${inputPaddingClass} pr-2 py-2 rounded border border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none`}
          placeholder={placeholder}
          onChange={onChange}
        />
        {icon && <FontAwesomeIcon icon={icon} className="text-gray-400 absolute left-3 top-3" />}
      </div>
    </div>
  );
}

export function SelectInput({ id, placeholder, icon, label }: selectInputProps) {
  const inputPaddingClass = icon ? "pl-10" : "pl-2";

  return (
    <div className="relative">
      {label && (
        <label htmlFor={id} className="block text-gray-600 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          className={`w-full ${inputPaddingClass} pr-2 py-1.5 rounded border border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none`}
        >
          <option className="text-gray-600" selected>{placeholder}</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>{" "}
        {icon && <FontAwesomeIcon icon={icon} className="text-gray-400 absolute left-3 top-3" />}
      </div>
    </div>
  );
}
