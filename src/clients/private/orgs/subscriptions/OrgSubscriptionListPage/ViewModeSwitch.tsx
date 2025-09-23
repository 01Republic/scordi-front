import {memo} from 'react';

interface ViewModeSwitchProps {
    value: boolean;
    onChange?: (value: boolean) => void;
}

export const ViewModeSwitch = memo((props: ViewModeSwitchProps) => {
    const {value = false, onChange} = props;

    return (
        <div className="flex justify-center">
            <div className="form-control">
                <label className="cursor-pointer label gap-3 font-medium ">
                    <div className="flex flex-row">
                        <span className="label-text">그룹</span>
                        <span className="hidden md:flex">으로 보기</span>
                    </div>
                    <input
                        type="checkbox"
                        className={`toggle toggle-sm ${value ? 'bg-scordi' : 'bg-gray-200'}`}
                        checked={value}
                        onChange={(e) => onChange?.(e.target.checked)}
                    />
                </label>
            </div>
        </div>
    );
});
