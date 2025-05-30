import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {orgIdParamState, useOrgIdParam} from '^atoms/common';
import {SubscriptionDto} from '^models/Subscription/types';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {LottieNoSSR} from '^components/LottieNoSSR';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {NextStepButton} from '../common/NextStepButton';
import {StatusHeader} from '../common/StatusHeader';
import {SubscriptionItem} from './SubscriptionItem';
import {EmptyTable} from '^_components/table/EmptyTable';
import {OrgSubscriptionConnectionPageRoute} from '^pages/orgs/[id]/subscriptions/connection';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';
import {useQueries} from '@tanstack/react-query';
import {subscriptionApi} from '^models/Subscription/api';
import {FindOptionsWhere} from '^types/utils/find-options';
import {isDefinedValue} from '^utils/array';

interface AssetConnectSuccessPageTemplateProps {
    assets: (CreditCardDto | BankAccountDto)[];
    onNext: () => any;
}

export const AssetConnectSuccessPageTemplate = memo((props: AssetConnectSuccessPageTemplateProps) => {
    const {assets, onNext} = props;

    const router = useRouter();
    const orgId = useOrgIdParam();
    const {data: subscriptions, pending: isLoading} = useQueries({
        queries: assets.map((asset) => {
            const getSubscriptions = async (where: FindOptionsWhere<SubscriptionDto>) => {
                return subscriptionApi
                    .index({
                        relations: ['master'],
                        where: {organizationId: orgId, ...where},
                        order: {nextComputedBillingDate: 'DESC', id: 'DESC'},
                        itemsPerPage: 0,
                    })
                    .then((res) => res.data.items);
            };

            const about = asset instanceof BankAccountDto ? 'bank' : 'card';

            return {
                queryKey: ['AssetConnectResultPage.SubscriptionList', orgId, about, asset.id],
                queryFn: () => {
                    return asset instanceof BankAccountDto
                        ? getSubscriptions({bankAccountId: asset.id})
                        : getSubscriptions({creditCardId: asset.id});
                },
                enabled: !orgId && !isNaN(orgId),
                retry: 0,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            };
        }),
        combine: (results) => {
            return {
                data: results.flatMap((result) => result.data).filter(isDefinedValue),
                errors: results.flatMap((result) => result.error).filter(isDefinedValue),
                pending: results.some((result) => result.isPending),
            };
        },
    });

    return (
        <PureLayout>
            <div className="w-full flex flex-col gap-20">
                <StatusHeader
                    title={`총 ${subscriptions.length}개의 구독을 불러왔어요`}
                    icon={
                        <LottieNoSSR
                            src="https://lottie.host/9e42fdb6-462d-47b1-8c05-b7c407ea89a6/71V7dYZsgm.lottie"
                            loop
                            autoplay
                            className="w-[82px] h-24"
                            layout={{fit: 'fill'}}
                        />
                    }
                    onBack={() => router.back()}
                    onMove={() => router.push(OrgSubscriptionConnectionPageRoute.path(orgId))}
                />
                {subscriptions.length === 0 ? (
                    <EmptyTable message="불러온 구독이 없어요" />
                ) : (
                    <ul className="grid grid-cols-4 gap-8 w-full">
                        {subscriptions.map((subscription) => {
                            const {product} = subscription;

                            return (
                                <SubscriptionItem key={subscription.id} title={product.name()} logo={product.image} />
                            );
                        })}
                    </ul>
                )}

                <section className="w-full flex items-center justify-center">
                    <NextStepButton text="완료" onClick={onNext} />
                </section>
            </div>
        </PureLayout>
    );
});
