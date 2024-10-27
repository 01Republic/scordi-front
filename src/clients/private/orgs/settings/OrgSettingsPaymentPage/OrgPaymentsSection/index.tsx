import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useScordiPaymentsInSettingPage} from '^models/_scordi/ScordiPayment/hook';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {SettingsPaymentSection} from '../SettingsPaymentSection';
import {ScordiPaymentHeader} from './ScordiPaymentHeader';
import {ScordiPaymentItem, ScordiPaymentItemUIType} from './ScordiPaymentItem';

interface OrgPaymentsSectionProps {
    orgId: number;
}

export const OrgPaymentsSection = memo((props: OrgPaymentsSectionProps) => {
    const {orgId} = props;
    const router = useRouter();
    const {isLoading, result, search, isEmptyResult} = useScordiPaymentsInSettingPage();

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId || isNaN(orgId)) return;

        search({
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    }, [orgId, router.isReady]);

    const uiVersion: ScordiPaymentItemUIType = 'default';

    return (
        <SettingsPaymentSection title="결제 환불 내역" isLoading={isLoading}>
            {isEmptyResult ? (
                <EmptyTable message="아직 결제/환불 내역이 없어요." />
            ) : (
                <div className="grid grid-cols-1">
                    <ScordiPaymentHeader version={uiVersion} />
                    {result.items.map((scordiPayment, i) => (
                        <ScordiPaymentItem
                            key={i}
                            version={uiVersion}
                            scordiPayment={scordiPayment}
                            isLast={result.items.length === i + 1}
                        />
                    ))}
                </div>
            )}
        </SettingsPaymentSection>
    );
});
OrgPaymentsSection.displayName = 'OrgPaymentsSection';
