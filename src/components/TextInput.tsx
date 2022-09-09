import {ForwardedRef, forwardRef, InputHTMLAttributes} from "react";
import { TextFieldProps } from "./TextField";

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    required?: boolean;
    disabled?: boolean;
};

export const TextInput = forwardRef((props: TextInputProps, ref: ForwardedRef<any>) => {
    return (
        <div className="form-control w-full">
            {props.label && (
              <label className="label">
                <span className="label-text">
                  {props.label}
                    {props.required && <span className="text-red-500"> *</span>}
                </span>
              </label>
            )}
            <input type="text"
                   ref={ref}
                   disabled={props.disabled}
                   className="input input-bordered w-full"
                   {...props}
            />
        </div>
    );
});

export const TextInputLg = forwardRef((props: TextInputProps, ref: ForwardedRef<any>) => {
  return (
    <div className="form-control w-full">
      {props.label && (
        <label className="label">
                <span className="label-text">
                  {props.label}
                  {props.required && <span className="text-red-500"> *</span>}
                </span>
        </label>
      )}
      <input type="text"
             ref={ref}
             disabled={props.disabled}
             className="input input-lg input-bordered w-full"
             {...props}
      />
    </div>
  );
});
