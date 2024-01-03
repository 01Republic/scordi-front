import React, {memo} from 'react';
import {FormForGeneralInfoModal} from './FormForGeneralInfoModal';
import {FormForBillingInfoModal} from './FormForBillingInfoModal';
import {FormForUsingMemberInfoModal} from './FormForUsingMemberInfoModal';
import {FormForFinishModal} from './FormForFinishModal';
import {FormForMemoModal} from './FormForMemoModal';

export const NewSubscriptionModalManually = memo(function NewSubscriptionModalManually() {
    return (
        <>
            <FormForGeneralInfoModal />
            <FormForBillingInfoModal />
            <FormForUsingMemberInfoModal />
            <FormForFinishModal />
            <FormForMemoModal />
        </>
    );
});
