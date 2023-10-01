import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {DANGER_COLOR, PRIMARY_COLOR} from "@/constants/app_colors"
import React from "react";

// interface PrimaryButtonProps {
//   text: string;
//   onClick: () => void;
//   icon?: IconDefinition;
// }

interface PrimaryButtonProps {
  text: string;
  onClick: () => void;
  icon?: IconDefinition;
  fullWidth?: boolean; // Add fullWidth property
  textCenter?: boolean; // Add textCenter property
}


// export function PrimaryButton({ text, onClick, icon }: PrimaryButtonProps) {
//   return (
//     <button className="py-2 px-4 rounded-md shadow-md" onClick={onClick} style={{backgroundColor: PRIMARY_COLOR}}>
//       <span className="flex items-center text-sm">
//         {text}
//         {icon && <FontAwesomeIcon className="ms-3" icon={icon} />} 
//       </span>
//     </button>
//   );
// }

export function PrimaryButton({ text, onClick, icon, fullWidth, textCenter }: PrimaryButtonProps) {
  const buttonClasses = ["py-2 px-4 rounded-md shadow-md"];
  if (fullWidth) {
    buttonClasses.push("w-full"); // Add w-full class for fullWidth
  }

  return (
    <button
      className={buttonClasses.join(" ")}
      onClick={onClick}
      style={{ backgroundColor: PRIMARY_COLOR }}
    >
      <span className={`flex items-center text-sm ${textCenter ? 'justify-center' : ''}`}>
        {text}
        {icon && <FontAwesomeIcon className="ms-3" icon={icon} />} 
      </span>
    </button>
  );
}

export function DangerButton({ text, onClick, icon, fullWidth, textCenter }: PrimaryButtonProps) {
  const buttonClasses = ["py-2 px-4 rounded-md shadow-md"];
  if (fullWidth) {
    buttonClasses.push("w-full"); // Add w-full class for fullWidth
  }

  return (
    <button
      className={buttonClasses.join(" ")}
      onClick={onClick}
      style={{ backgroundColor: DANGER_COLOR }}
    >
      <span className={`flex items-center text-sm text-white ${textCenter ? 'justify-center' : ''}`}>
        {text}
        {icon && <FontAwesomeIcon className="ms-3" icon={icon} />} 
      </span>
    </button>
  );
}
