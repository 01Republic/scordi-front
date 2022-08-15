import { Label } from "./Label";
import { TextField } from "./TextField";

export interface NumberInputProps {
  label: string;
  suffix: string;
}
export default function NumberInput({ label, suffix }: NumberInputProps) {
  return (
    <div className="flex flex-col">
      {label && <Label text={label} />}
      <div className="flex items-center rounded-lg border px-3">
        <div className="flex-1 flex-col">
          <TextField className={"border-none focus:ring-0"} type="number" />
        </div>
        <span className="w-fit">{suffix}</span>
      </div>
    </div>
  );
}
