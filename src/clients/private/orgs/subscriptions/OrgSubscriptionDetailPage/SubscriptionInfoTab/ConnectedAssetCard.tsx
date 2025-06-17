import React, {memo} from 'react';
import {CreditCard} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {SubscriptionDto} from '^models/Subscription/types';
import {LoadableBox} from '^components/util/loading';
import {NextImage} from '^components/NextImage';
import {useCreditCardOfSubscription, useBankAccountOfSubscription} from '../hooks';
import {StatusCard} from './StatusCard';

interface ConnectedAssetCardProps {
    subscription: SubscriptionDto;
}

export const ConnectedAssetCard = memo((props: ConnectedAssetCardProps) => {
    const {subscription} = props;
    const {creditCardId, bankAccountId} = subscription;
    const creditCardQuery = useCreditCardOfSubscription(subscription);
    const bankAccountQuery = useBankAccountOfSubscription(subscription);

    if (creditCardId) {
        const creditCard = creditCardQuery.data;
        const cardName = creditCard?.profileName;
        const endNumber = creditCard?.secretInfo?.number4;
        const company = creditCard?.company;
        return (
            <StatusCard
                label={'결제수단'}
                icon={
                    company ? (
                        <NextImage src={company.logo} alt={company.displayName} fill />
                    ) : (
                        <CreditCard className="size-6 text-white" />
                    )
                }
                iconColor={'bg-blue-400'}
            >
                <LoadableBox isLoading={creditCardQuery.isFetching} loadingType={2} noPadding spinnerPos="center">
                    {creditCard ? (
                        <Tippy content={`${cardName} (${endNumber})`} className="!text-12">
                            <div className="flex items-center leading-none whitespace-nowrap overflow-hidden">
                                <span className="truncate">{cardName}</span>
                                {endNumber && <span className="">({endNumber})</span>}
                            </div>
                        </Tippy>
                    ) : (
                        <div>&nbsp;</div>
                    )}
                </LoadableBox>
            </StatusCard>
        );
    }

    if (bankAccountId) {
        const bankAccount = bankAccountQuery.data;
        const bankAccountName = bankAccount?.alias || bankAccount?.bankName || undefined;
        const endNumber = bankAccount?.endNumber(3);
        const company = bankAccount?.company;
        return (
            <StatusCard
                label={'결제수단'}
                icon={
                    company ? (
                        <NextImage src={company.logo} alt={company.displayName} fill />
                    ) : (
                        <CreditCard className="size-6 text-white" />
                    )
                }
                iconColor={'bg-blue-400'}
            >
                <LoadableBox isLoading={bankAccountQuery.isFetching} loadingType={2} noPadding spinnerPos="center">
                    {bankAccount ? (
                        <Tippy content={`${bankAccountName} (${endNumber})`} className="!text-12">
                            <div className="flex items-center leading-none whitespace-nowrap overflow-hidden">
                                <span className="truncate">{bankAccountName}</span>
                                {endNumber && <span className="">({endNumber})</span>}
                            </div>
                        </Tippy>
                    ) : (
                        <div>&nbsp;</div>
                    )}
                </LoadableBox>
            </StatusCard>
        );
    }

    return (
        <StatusCard label={'결제수단'} icon={<CreditCard className="size-6 text-white" />} iconColor={'bg-blue-400'}>
            <span className="text-gray-300">없음</span>
        </StatusCard>
    );
});
ConnectedAssetCard.displayName = 'ConnectedAssetCard';
