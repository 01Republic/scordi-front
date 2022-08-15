import { FC, InputHTMLAttributes } from "react";
import { Label } from "./Label";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio: FC<RadioProps> = ({ className = "", label, ...props }) => {
  return (
    <div className="label-row">
      <input type="radio" className={`radio ${className}`} {...props} />
      {label && <Label text={label} />}
    </div>
  );
};
