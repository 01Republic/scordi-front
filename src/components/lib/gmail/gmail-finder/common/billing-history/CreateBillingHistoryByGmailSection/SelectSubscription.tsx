import React, {forwardRef, useEffect, useState} from 'react';
import {Avatar} from '^components/Avatar';
import {AsyncSelect, AsyncSelectOption} from './AsyncSelect';
import {FindAllSubscriptionsQuery, SubscriptionDto} from '^models/Subscription/types';
import {subscriptionApi} from '^models/Subscription/api';

interface SelectProductProps {
    organizationId: number;
    productId?: number;
    onChange: (subscriptionId?: number) => any;
}

export const SelectSubscription = forwardRef((props: SelectProductProps, ref) => {
    const {organizationId, productId, onChange} = props;
    const [defaultItems, setDefaultItems] = useState<SubscriptionDto[]>([]);

    const search = (params: FindAllSubscriptionsQuery) => {
        params.where ||= {};
        params.where.organizationId = organizationId;
        params.where.productId = productId;
        params.itemsPerPage = 0;
        // params.where.connectMethod = {op: 'not', val: ProductConnectMethod.PREPARE};
        return subscriptionApi
            .index({...params})
            .then((res) => res.data)
            .then((result) => result.items);
    };

    const toOption = (subscription: SubscriptionDto): AsyncSelectOption => ({
        label: <SubscriptionOption subscription={subscription} />,
        value: subscription.id,
    });

    useEffect(() => {
        search({}).then(setDefaultItems);
    }, [organizationId, productId]);

    return (
        <div className={defaultItems.length === 0 ? 'pointer-events-none opacity-40' : ''}>
            <AsyncSelect
                ref={ref}
                placeholder={
                    !productId
                        ? '앱을 먼저 선택해주세요'
                        : defaultItems.length > 0
                        ? `구독을 선택해주세요`
                        : '이 앱에 구독 없음'
                }
                defaultOptions={defaultItems.map(toOption)}
                loadOptions={(keyword?: string) => {
                    return search({keyword}).then((items) => items.map(toOption));
                }}
                onChange={onChange}
            />
        </div>
    );
});

const SubscriptionOption = ({subscription}: {subscription: SubscriptionDto}) => {
    return (
        <div className="px-2 flex items-center gap-2 w-full rounded-lg hover:bg-scordi-50 transition-all cursor-pointer">
            <div>
                <Avatar src={subscription.product.image} className="h-[20px] w-[20px]" />
            </div>
            <div className="flex flex-col gap-[1px]">
                <div className="text-10 font-normal text-gray-400 leading-none">#{subscription.id}</div>
                <div className="text-12 font-normal leading-none whitespace-nowrap overflow-auto no-scrollbar">
                    {subscription.product.nameEn}
                </div>
            </div>
        </div>
    );
};
