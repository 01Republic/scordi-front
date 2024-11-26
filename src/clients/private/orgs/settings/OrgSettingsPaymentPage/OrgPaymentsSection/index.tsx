import React, {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useScordiPaymentsInSettingPage} from '^models/_scordi/ScordiPayment/hook';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {SettingsPaymentSection} from '../SettingsPaymentSection';
import {ScordiPaymentHeader} from './ScordiPaymentHeader';
import {ScordiPaymentItem} from './ScordiPaymentItem';
import {LinkTo} from '^components/util/LinkTo';
import {ChannelTalk_Url} from '^config/constants';
import {IoIosHelpCircle} from 'react-icons/io';

interface OrgPaymentsSectionProps {
    orgId: number;
}

export const OrgPaymentsSection = memo((props: OrgPaymentsSectionProps) => {
    const {orgId} = props;
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
            title="결제 내역"
            // right={
            //     <div>
            //         {!isNotLoaded && !isEmptyResult && (
            //             <LinkTo
            //                 className="flex items-center gap-2 cursor-pointer text-14 link link-hover text-gray-400 hover:text-gray-500 transition py-1 group"
            //                 href={ChannelTalk_Url}
            //                 target="_blank"
            //                 displayLoading={false}
            //             >
            //                 <IoIosHelpCircle fontSize={18} className="relative top-[0px]" />
            //                 <span>취소/환불을 원하시나요?</span>
            //             </LinkTo>
            //         )}
            //     </div>
            // }
            isLoading={isLoading}
        >
            {isNotLoaded && (
                <div className="invisible">
                    <EmptyTable message="결제/환불 내역이 없어요." />
                </div>
            )}
            {isEmptyResult ? (
                <EmptyTable message="결제/환불 내역이 없어요." />
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
