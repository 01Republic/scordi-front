import React, {memo} from 'react';
import {CreditCard} from 'lucide-react';
import {useQuery} from '@tanstack/react-query';
import {SubscriptionDto} from '^models/Subscription/types';
import {creditCardApi} from '^models/CreditCard/api';
import {bankAccountApi} from '^models/BankAccount/api';
import {LoadableBox} from '^components/util/loading';
import {NextImage} from '^components/NextImage';
import {StatusCard} from './StatusCard';
import Tippy from '@tippyjs/react';

interface ConnectedAssetCardProps {
    subscription: SubscriptionDto;
}

export const ConnectedAssetCard = memo((props: ConnectedAssetCardProps) => {
    const {subscription} = props;
    const {id, organizationId: orgId, creditCardId, bankAccountId} = subscription;

    const creditCardQuery = useQuery({
        queryKey: ['subscription.creditCard', id, creditCardId],
        queryFn: async () => {
            return creditCardApi.show(orgId, creditCardId!).then((res) => res.data);
        },
        enabled: !!creditCardId,
    });

    const bankAccountQuery = useQuery({
        queryKey: ['subscription.bankAccount', id, bankAccountId],
        queryFn: async () => {
            return bankAccountApi.show(orgId, bankAccountId!).then((res) => res.data);
        },
        enabled: !!bankAccountId,
    });

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
