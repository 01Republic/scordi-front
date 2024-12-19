import React, {memo} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import {ScordiPaymentMoreDropdownButton} from './ScordiPaymentMoreDropdownButton';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {scordiPaymentMethodApi} from '^models/_scordi/ScordiPaymentMethod/api';
import {toast} from 'react-hot-toast';
import {confirm2, confirmed} from '^components/util/dialog';
import {useScordiPaymentMethodsInSettingPage} from '^models/_scordi/ScordiPaymentMethod/hook';
import {errorToast} from '^api/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';

interface ScordiPaymentMethodRemoveButtonProps {
    paymentMethod: ScordiPaymentMethodDto;
}

export const ScordiPaymentMethodRemoveButton = memo((props: ScordiPaymentMethodRemoveButtonProps) => {
    const {paymentMethod} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {id} = paymentMethod;
    const {reload} = useScordiPaymentMethodsInSettingPage();

    const onClick = () => {
        const removeConfirm = () => {
            return confirm2(
                '결제카드를 삭제할까요?',
                <span>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </span>,
            );
        };

        confirmed(removeConfirm())
            .then(() => scordiPaymentMethodApi.destroy(orgId, id))
            .then(() => toast.success('삭제 됐어요'))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <ScordiPaymentMoreDropdownButton className="!text-error bg-error/5" onClick={onClick}>
            <FaRegTrashAlt fontSize={10} />
            <span>삭제하기</span>
        </ScordiPaymentMoreDropdownButton>
    );
});
ScordiPaymentMethodRemoveButton.displayName = 'ScordiPaymentMethodRemoveButton';
