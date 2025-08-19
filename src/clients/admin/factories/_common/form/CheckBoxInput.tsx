import React, {memo} from 'react';
import {useId} from 'react-id-generator';

interface CheckBoxInputProps {
    label: string;
    onChange: (value: boolean) => any;
    defaultValue?: boolean;
    disabled?: boolean;
}

/**
 * 파서 공장 전용이니까 여기저시거 임포트 하지 마세요
 */
export const CheckBoxInput = memo((props: CheckBoxInputProps) => {
    const {label, onChange, defaultValue, disabled} = props;
    const [id] = useId(0, 'checkbox');

    return (
        <div className="form-control">
            <label htmlFor={id} className="cursor-pointer label px-0">
                <input
                    id={id}
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary mr-2"
                    defaultChecked={defaultValue}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="label-text">{label}</span>
            </label>
        </div>
    );
});
