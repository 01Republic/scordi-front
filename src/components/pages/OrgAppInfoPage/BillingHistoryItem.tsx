import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {safeImageSrc} from '^types/applicationPrototype.type';
import {MobileEntityListItem} from '^components/v2/MobileEntityListSection/MobileEntityListItem';
import {ApplicationDto} from '^types/application.type';
import {BillingHistoryDto} from '^types/billing.type';
import {useRouter} from 'next/router';
import {BillingHistoryShowPageRoute} from '^pages/orgs/[id]/apps/[appId]/billingHistories/[billingHistoryId]';

type BillingHistoryItemProps = {
    application: ApplicationDto;
    billingHistory: BillingHistoryDto;
    onClickMethod?: 'push' | 'replace' | undefined; // default: "push"
};

export const BillingHistoryItem = memo((props: BillingHistoryItemProps) => {
    const router = useRouter();
    const {application, billingHistory, onClickMethod = 'push'} = props;
    if (!application) return <></>;
    const {prototype, organizationId} = application;

    const isSuccess = !!billingHistory.paidAt;

    return (
        <MobileEntityListItem
            id={`billingHistory-${billingHistory.id}`}
            size="big"
            onClick={() => {
                const path = BillingHistoryShowPageRoute.path(organizationId, application.id, billingHistory.id);
                onClickMethod === 'replace' ? router.replace(path) : router.push(path);
            }}
        >
            <div className="flex items-center px-1">
                <img
                    width={32}
                    height={32}
                    className="mask mask-squircle"
                    src={safeImageSrc(prototype, 32, 32)}
                    alt={`${prototype.name} logo image`}
                />
            </div>
            <div className="flex flex-1 items-center px-3">
                <p className={`text-left`}>
                    <span
                        className={`block leading-none font-semibold mb-1 ${
                            isSuccess ? 'text-base' : 'text-gray-400 line-through'
                        }`}
                    >
                        -${billingHistory.payAmount?.amount || 0}
                    </span>
                    <span
                        className={`block leading-none text-xs ${isSuccess ? 'text-gray-500' : 'text-gray-400'}`}
                        style={{textTransform: 'none'}}
                    >
                        {prototype.name} {isSuccess}
                    </span>
                </p>
            </div>
            <div className="flex items-center px-1">
                <div className="text-right">
                    {/*<BasicButton2 text="Add" size="sm" color="secondary" className="no-animation" />*/}
                </div>
            </div>
        </MobileEntityListItem>
    );
});
