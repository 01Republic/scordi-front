import { forwardRef, InputHTMLAttributes, useId } from "react";
import { Label } from "./Label";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassname?: string;
  helper?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className = "", label, labelClassname = "", helper, ...props }, ref) => {
    return (
      <div className="label-col">
        {label && <Label text={label} className={labelClassname} />}
        <input
          ref={ref}
          className={`textfield ${helper ? "border-error" : ""} ${className}`}
          {...props}
        />
        {helper && <p className="text-error text-sm">{helper}</p>}
      </div>
    );
  }
);
