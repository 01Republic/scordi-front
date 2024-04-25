import {WithChildren} from '^types/global.type';
import {plainToast as toast} from '^hooks/useToast';

interface RadioCardProps<T> {
    value: T;
    defaultChecked: boolean;
    onChange: (value: T) => any;
    disabled?: boolean;
}

export const GroupingMethodRadioCard = <T,>(props: RadioCardProps<T> & WithChildren) => {
    const {value, defaultChecked, onChange, disabled = false, children} = props;

    return (
        <div className="form-control">
            <label className="card px-4 py-4 card-bordered cursor-pointer flex items-start flex-row gap-4">
                <div>
                    <input
                        type="radio"
                        name="radio-10"
                        className="radio radio-sm checked:bg-red-500"
                        onChange={(e) => onChange(e.target.value as T)}
                        defaultChecked={defaultChecked}
                        value={String(value)}
                        disabled={disabled}
                    />
                </div>
                <div className={disabled ? 'opacity-30' : ''} onClick={() => disabled && toast.error('준비중입니다')}>
                    {children}
                </div>
            </label>
        </div>
    );
};

export const RadioCardTitle = ({text}: {text: string}) => (
    <p className="leading-none text-14 font-semibold mb-2">{text}</p>
);
export const RadioCardContent = ({text}: {text: string}) => <p className="text-12 text-gray-500">{text}</p>;
