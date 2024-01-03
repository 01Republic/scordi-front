import React, {ForwardedRef, forwardRef, InputHTMLAttributes, memo} from 'react';
import {useId} from 'react-id-generator';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '../atom';

export const IsPerUserCheckbox = memo(function IsPerUserCheckbox() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    const onChange = (isPerUser: boolean) => {
        setFormData((f) => ({...f, isPerUser}));
    };

    const toggleValue = () => {
        setFormData((f) => {
            return {...f, isPerUser: !f.isPerUser};
        });
    };

    return (
        <div className={'relative w-full cursor-pointer'} onClick={() => toggleValue()}>
            <Checkbox
                labelText="1인당 과금이에요"
                className="checkbox checkbox-info"
                checked={formData.isPerUser}
                onKeyDown={(e) => {
                    if (e.code == 'Enter' || e.code == 'Space') {
                        e.stopPropagation();
                        e.preventDefault();
                        onChange(!e.target.checked);
                    }
                }}
                onChange={(e) => e.preventDefault()}
            />
            <div className="absolute absolute-cover" />
        </div>
    );
});

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
}

const Checkbox = forwardRef((props: CheckboxProps, ref: ForwardedRef<any>) => {
    const [id] = useId(1, 'CheckboxInput');
    const {labelText, ...inputProps} = props;

    return (
        <div className="form-control">
            <label className="cursor-pointer label justify-start gap-4" htmlFor={id}>
                <input id={id} ref={ref} type="checkbox" className="checkbox checkbox-info" {...inputProps} />
                <span className="label-text font-[500] text-[16px] relative top-[-2px]">{labelText}</span>
            </label>
        </div>
    );
});
