import React, {memo, ReactNode} from 'react';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';
import {SubscriptionDto} from '^models/Subscription/types';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
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
import {queriesCombine} from '^utils/useQueries';
import {LoadableBox} from '^components/util/loading';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';
import {unitFormat} from '^utils/number';
import {WithLoopText} from '^utils/TypeWritter';

interface AssetConnectSuccessPageTemplateProps {
    assets: (CreditCardDto | BankAccountDto)[];
    onNext: () => any;
    nextBtnText?: ReactNode;
    moveFirst?: () => any;
    moveFirstBtnText?: ReactNode;
}

export const AssetConnectSuccessPageTemplate = memo((props: AssetConnectSuccessPageTemplateProps) => {
    const {assets, onNext, moveFirst, nextBtnText, moveFirstBtnText} = props;

    const router = useRouter();
    const orgId = useOrgIdParam();
    const results = useQueries({
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
                enabled: !!orgId && !isNaN(orgId),
                retry: 0,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
            };
        }),
    });
    const {data: subscriptions, pending: isLoading, refetch} = queriesCombine(results);

    return (
        <PureLayout>
            <PureLayoutContainer className="flex flex-col gap-20">
                <StatusHeader
                    title={(() => {
                        if (isLoading) return <WithLoopText text="로딩중" />;

                        return (
                            <span onClick={() => refetch()}>
                                {subscriptions.length > 0
                                    ? `총 ${unitFormat(subscriptions.length)}의 구독을 불러왔어요`
                                    : `구독을 찾지 못했어요`}
                            </span>
                        );
                    })()}
                    subTitle={(() => {
                        if (isLoading) return '';

                        return subscriptions.length > 0
                            ? undefined
                            : '결제수단에서 구독서비스 지출 이력이 없거나, 스코디가 처음보는 서비스일 수도 있어요.';
                    })()}
                    icon={(() => {
                        if (isLoading) return undefined;

                        return subscriptions.length > 0 ? (
                            <Lottie
                                src={LOTTIE_SRC.CLAP}
                                loop
                                autoplay
                                className="w-[82px] h-24"
                                layout={{fit: 'fill'}}
                            />
                        ) : undefined;
                    })()}
                    onBack={() => router.back()}
                />

                <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                    {subscriptions.length === 0 ? (
                        isLoading ? (
                            <EmptyTable message="불러온 구독이 없어요" className="invisible" />
                        ) : (
                            <EmptyTable message="불러온 구독이 없어요" />
                        )
                    ) : (
                        <ul className="grid grid-cols-4 gap-8 w-full">
                            {subscriptions.map((subscription) => (
                                <SubscriptionItem
                                    key={subscription.id}
                                    title={subscription.product.name()}
                                    logo={subscription.product.image}
                                />
                            ))}
                        </ul>
                    )}
                </LoadableBox>

                <section
                    className={`w-full flex items-center justify-center transition-all ${
                        subscriptions.length === 0 && isLoading ? 'opacity-0' : ''
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <NextStepButton
                            text={nextBtnText || `완료하고 마치기`}
                            onClick={onNext}
                            className="btn-secondary"
                            localLoading
                        />
                        {moveFirst && (
                            <NextStepButton
                                text={moveFirstBtnText || '다른 자산으로 불러오기'}
                                onClick={moveFirst}
                                className="btn-scordi"
                                localLoading
                            />
                        )}
                    </div>
                </section>
            </PureLayoutContainer>
        </PureLayout>
    );
});
