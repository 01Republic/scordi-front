export type TextInputProps = {
  label?: string;
  required?: boolean;
  placeholder: string;
  disabled?: boolean;
};

export const TextInput = (props: TextInputProps) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">
          {props.label}
          {props.required && <span className="text-red-500">*</span>}
        </span>
      </label>
      <input
        type="text"
        placeholder={props.placeholder}
        disabled={props.disabled}
        className="input input-bordered w-full"
      />
    </div>
  );
};
