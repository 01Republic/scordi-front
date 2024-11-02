import React, {memo} from 'react';
import {FaBookmark, FaRegBookmark} from 'react-icons/fa6';
import {ScordiPaymentMoreDropdownButton} from './ScordiPaymentMoreDropdownButton';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {scordiPaymentMethodApi} from '^models/_scordi/ScordiPaymentMethod/api';
import {toast} from 'react-hot-toast';
import {confirm2} from '^components/util/dialog';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {errorToast} from '^api/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

interface ChangeIsActiveButtonProps {
    paymentMethod: ScordiPaymentMethodDto;
}

export const ChangeIsActiveButton = memo((props: ChangeIsActiveButtonProps) => {
    const {paymentMethod} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {id} = paymentMethod;
    const {reload} = useScordiPaymentMethodsInSettingPage();

    const onClick = (isActive: boolean) => {
        const dialog = () => {
            return isActive ? confirm2('이 카드를 메인으로 사용할까요?') : confirm2('서브 카드로 변경할까요?');
        };

        dialog().then((res) => {
            if (!res.isConfirmed) return;

            scordiPaymentMethodApi
                .update(orgId, id, {isActive})
                .then((res) => {
                    toast.success('수정이 완료됐어요');
                    reload();
                })
                .catch(errorToast);
        });
    };

    if (paymentMethod.isActive) {
        return (
            <ScordiPaymentMoreDropdownButton className="hover:text-scordi" onClick={() => onClick(false)}>
                <FaBookmark fontSize={10} className="text-scordi" />
                <span>서브 카드로 변경하기</span>
            </ScordiPaymentMoreDropdownButton>
        );
    } else {
        return (
            <ScordiPaymentMoreDropdownButton className="hover:text-scordi" onClick={() => onClick(true)}>
                <FaRegBookmark fontSize={10} />
                <span>메인 카드로 변경하기</span>
            </ScordiPaymentMoreDropdownButton>
        );
    }
});
ChangeIsActiveButton.displayName = 'ChangeIsActiveButton';
