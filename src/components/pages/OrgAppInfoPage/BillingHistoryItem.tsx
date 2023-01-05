import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {safeImageSrc} from '^types/applicationPrototype.type';
import {MobileEntityListItem} from '^components/v2/MobileEntityListSection/MobileEntityListItem';
import {ApplicationDto} from '^types/application.type';
import {BillingHistoryDto} from '^types/billing.type';

type BillingHistoryItemProps = {
    application: ApplicationDto;
    billingHistory: BillingHistoryDto;
};

export const BillingHistoryItem = memo((props: BillingHistoryItemProps) => {
    const {application, billingHistory} = props;
    if (!application) return <></>;
    const {prototype} = application;

    const {isSuccess} = billingHistory;

    return (
        <MobileEntityListItem id={`billingHistory-${billingHistory.id}`} size="big">
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
                        -${billingHistory.paidAmount}
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
