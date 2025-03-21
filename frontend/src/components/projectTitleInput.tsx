import React, { FC, useId } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectTitleInputProps {
  /**
   * Optional id for the input. If not provided, a unique one will be generated.
   */
  id?: string;
  /**
   * Label for the input field. Defaults to "Project Title".
   */
  label?: string;
  /**
   * The current value of the input.
   */
  value: string;
  /**
   * Placeholder text for the input.
   */
  placeholder?: string;
  /**
   * Error message to display if validation fails.
   */
  error?: string;
  /**
   * onChange handler for when the input value changes.
   */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Optional onBlur handler for lost focus events.
   */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * Optional callback triggered when the clear button is clicked.
   */
  onClear?: () => void;
}

const ProjectTitleInput: FC<ProjectTitleInputProps> = ({
  id,
  label = "Project Title",
  value,
  placeholder = "Enter your project title",
  error,
  onChange,
  onBlur,
  onClear,
}) => {
  const generatedId = useId();
  const inputId = id || `project-title-input-${generatedId}`;

  return (
    <div className="w-full mb-4">
      <label
        htmlFor={inputId}
        className="block mb-1 text-sm font-medium text-[#34495e] font-arial-sans-serif"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          name={inputId}
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full rounded border ${
            error ? "border-red-500" : "border-gray-300"
          } h-[40px] px-3 pr-10 text-base text-[#34495e] transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3498db] ${
            error ? "focus:border-red-500" : "focus:border-[#3498db]"
          } font-helvetica-sans-serif`}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            aria-label="Clear project title"
          >
            <X size={16} className="text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${inputId}-error`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-xs text-red-500 font-helvetica-sans-serif"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectTitleInput;