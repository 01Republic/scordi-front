import React, {memo} from 'react';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {FormControl} from '^components/util/form-control';
import {useRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';

export const IsFreeTierRadio = memo(function IsFreeTierRadio() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    const onChange = (isFreeTier: boolean) => {
        setFormData((f) => ({
            ...f,
            isFreeTier,
        }));
    };

    return (
        <FormControl topLeftLabel="유료로 쓰고 있나요?">
            <ButtonGroupRadio
                defaultValue={formData.isFreeTier}
                onChange={(o) => onChange(o.value)}
                options={[
                    {label: '무료', value: true},
                    {label: '유료', value: false},
                ]}
            />
        </FormControl>
    );
});
