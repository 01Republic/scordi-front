import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';

export const ModalTitle = memo(function ModalTitle() {
    const formData = useRecoilValue(newSubscriptionManualFormData);

    return (
        <div className={`block overflow-hidden transition-all max-h-[92px] ${formData.productId ? '!max-h-0' : ''}`}>
            <h3 className="font-bold text-2xl pt-5 pb-10">어느 서비스의 구독인가요?</h3>
        </div>
    );
});
