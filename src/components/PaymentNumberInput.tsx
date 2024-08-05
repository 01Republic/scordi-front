import {useState} from 'react';
import {TextField} from './TextField';

export interface PaymentNumberInputProps {
    month: string;
    suffix: string;
    value: number;
}
export default function PaymentNumberInput({month, suffix, value}: PaymentNumberInputProps) {
    const [lock, setLock] = useState<boolean>(true);

    return (
        <div className="flex items-center justify-between rounded-md bg-[#F5F6F7] py-2 px-3">
            <div className="flex items-center space-x-3">
                <p className="w-8 flex-shrink-0 font-semibold">{month}</p>

                <div className="flex-1 flex-col">
                    <TextField
                        className={`{w-full ${lock && 'border-none'} disabled:bg-[#F5F6F7] disabled:text-black`}
                        type="number"
                        disabled={lock}
                        value={value}
                    />
                </div>
                <span className="w-fit">{suffix}</span>
            </div>
            <button
                className={`${lock ? 'outlined-gray-600 bg-white' : 'filled-brand-1'} h-10 flex-shrink-0 px-5`}
                onClick={() => setLock(!lock)}
            >
                {lock ? '수정' : '저장'}
            </button>
        </div>
    );
}
