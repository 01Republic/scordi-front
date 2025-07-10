import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {useScordiPaymentsInSettingPage} from '^models/_scordi/ScordiPayment/hook';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, useEffect} from 'react';
import {SettingsPaymentSection} from '../SettingsPaymentSection';
import {ScordiPaymentHeader} from './ScordiPaymentHeader';
import {ScordiPaymentItem} from './ScordiPaymentItem';

interface OrgPaymentsSectionProps {
    orgId: number;
}

export const OrgPaymentsSection = memo((props: OrgPaymentsSectionProps) => {
    const {orgId} = props;
    const {t} = useTranslation('workspaceSettings');
    const router = useRouter();
    const {isLoading, result, search, isNotLoaded, isEmptyResult} = useScordiPaymentsInSettingPage();
    const uiVersion = 'notion';

    useEffect(() => {
        if (!router.isReady) return;
        if (!orgId || isNaN(orgId)) return;

        search({
            where: {organizationId: orgId},
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    }, [orgId, router.isReady]);

    return (
        <SettingsPaymentSection
            title={t('payment.paymentHistory')}
            // right={
            //     <div>
            //         {!isNotLoaded && !isEmptyResult && (
            //             <LinkTo
            //                 className="flex items-center gap-2 cursor-pointer text-14 link link-hover text-gray-400 hover:text-gray-500 transition py-1 group"
            //                 href={ChannelTalk_Url}
            //                 target="_blank"
            //                 displayLoading={false}
            //             >
            //                 <HelpCircle fontSize={18} className="relative top-[0px]" />
            //                 <span>{t('payment.cancelRefundInquiry')}</span>
            //             </LinkTo>
            //         )}
            //     </div>
            // }
            isLoading={isLoading}
        >
            {isNotLoaded && (
                <div className="invisible">
                    <EmptyTable message={t('payment.noPaymentHistory')} />
                </div>
            )}
            {isEmptyResult ? (
                <EmptyTable message={t('payment.noPaymentHistory')} />
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
