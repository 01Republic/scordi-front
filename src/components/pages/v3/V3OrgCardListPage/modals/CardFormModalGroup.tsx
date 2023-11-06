import {memo} from 'react';
import {CardNumberModal} from './CardNumberModal';
import {CardCompanyModal} from './CardCompanyModal';
import {CardNameModal} from './CardNameModal';
import {CardHoldingMember} from './CardHoldingMemberModal';
import {SelectAppModal} from './SelectAppModal';

export const CardFormModalGroup = memo(function CardFormModalGroup() {
    return (
        <>
            <CardNumberModal />
            <CardCompanyModal />
            <CardNameModal />
            <CardHoldingMember />
            <SelectAppModal />
        </>
    );
});
