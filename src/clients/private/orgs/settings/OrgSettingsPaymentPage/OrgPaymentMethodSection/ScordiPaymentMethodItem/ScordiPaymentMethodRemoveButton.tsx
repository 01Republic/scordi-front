import React, {memo} from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';
import {ScordiPaymentMoreDropdownButton} from './ScordiPaymentMoreDropdownButton';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {scordiPaymentMethodApi} from '^models/_scordi/ScordiPaymentMethod/api';
import {toast} from 'react-hot-toast';
import {confirm2} from '^components/util/dialog';
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
        confirm2('정말 삭제할까요?').then((res) => {
            if (!res.isConfirmed) return;

            scordiPaymentMethodApi
                .destroy(orgId, id)
                .then((res) => {
                    toast.success('삭제했어요');
                    reload();
                })
                .catch(errorToast);
        });
    };

    return (
        <ScordiPaymentMoreDropdownButton className="!text-error bg-error/5" onClick={onClick}>
            <FaRegTrashAlt fontSize={10} />
            <span>삭제하기</span>
        </ScordiPaymentMoreDropdownButton>
    );
});
ScordiPaymentMethodRemoveButton.displayName = 'ScordiPaymentMethodRemoveButton';
