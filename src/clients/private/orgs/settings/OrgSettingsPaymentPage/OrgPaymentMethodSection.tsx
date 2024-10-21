import React, {memo} from 'react';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {SettingsPaymentSection} from './SettingsPaymentSection';
import {useTossPayments} from '^hooks/useTossPayments';

interface OrgPaymentMethodSectionProps {
    orgId: number;
}

export const OrgPaymentMethodSection = memo((props: OrgPaymentMethodSectionProps) => {
    const {orgId} = props;
    const {startBilling} = useTossPayments();

    return (
        <SettingsPaymentSection title="카드 정보" buttonText="카드 변경" buttonOnClick={() => startBilling()}>
            <EmptyTable message="등록된 카드 정보가 없어요." />
        </SettingsPaymentSection>
    );
});
OrgPaymentMethodSection.displayName = 'OrgPaymentMethodSection';
