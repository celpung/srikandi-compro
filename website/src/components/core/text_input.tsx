import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface textInputInterface {
  type: string;
  id: string;
  placeholder: string;
  icon?: IconDefinition;
  label?: string;
  val?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput({ type, id, placeholder, icon, label, onChange, val }: textInputInterface) {
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
          defaultValue={val}
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

interface selectInputProps {
  id: string;
  placeholder: string;
  icon?: IconDefinition;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { id: number; name: string }[];
  val?: string;
}

export function SelectInput({ id, placeholder, icon, label, options, onChange, val }: selectInputProps) {
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
          onChange={onChange}
          id={id}
          className={`w-full ${inputPaddingClass} pr-2 py-1.5 rounded border border-gray-300 focus:ring focus:ring-blue-400 focus:outline-none`}
        >
          <option value="" className="text-gray-600">
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.id} value={option.id} selected={option.name === val}>
              {option.name}
            </option>
          ))}
        </select>{" "}
        {icon && <FontAwesomeIcon icon={icon} className="text-gray-400 absolute left-3 top-3" />}
      </div>
    </div>
  );
}
