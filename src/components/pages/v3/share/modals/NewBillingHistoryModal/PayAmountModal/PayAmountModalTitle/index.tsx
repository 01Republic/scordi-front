import React, {memo} from 'react';
import {ModalTitle} from '^v3/share/modals/ModalTitle';

export const PayAmountModalTitle = memo(() => {
    return <ModalTitle title={'새로운 결제 내역을 \n 등록합니다.'} />;
});
