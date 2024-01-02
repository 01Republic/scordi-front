import React, {memo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {newSubscriptionManualFormData} from '../atom';
import {SelectMasterProfile} from './SelectMasterProfile';

export const MasterSelectSection = memo(function MasterSelectSection() {
    const [formData, setFormData] = useRecoilState(newSubscriptionManualFormData);

    const onChange = (masterId: number | null) => {
        setFormData((f) => ({
            ...f,
            masterId: masterId ? masterId : undefined,
        }));
    };

    return <SelectMasterProfile onChange={(selectedOption) => onChange(selectedOption?.value || null)} />;
});
