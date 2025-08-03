import {useQueries} from '@tanstack/react-query';
import {EmptyTable} from '^_components/table/EmptyTable';
import {useOrgIdParam} from '^atoms/common';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {PureLayoutContainer} from '^clients/private/_layouts/PureLayout/PureLayoutContainer';
import {Lottie, LOTTIE_SRC} from '^components/LottieNoSSR';
import {LoadableBox} from '^components/util/loading';
import {BankAccountDto} from '^models/BankAccount/type';
import {CreditCardDto} from '^models/CreditCard/type';
import {subscriptionApi} from '^models/Subscription/api';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindOptionsWhere} from '^types/utils/find-options';
import {unitFormat} from '^utils/number';
import {WithLoopText} from '^utils/TypeWritter';
import {queriesCombine} from '^utils/useQueries';
import {useTranslation} from 'next-i18next';
import {useRouter} from 'next/router';
import {memo, ReactNode} from 'react';
import {NextStepButton} from '../common/NextStepButton';
import {StatusHeader} from '../common/StatusHeader';
import {SubscriptionItem} from './SubscriptionItem';

interface AssetConnectSuccessPageTemplateProps {
    assets: (CreditCardDto | BankAccountDto)[];
    onNext: () => any;
    nextBtnText?: ReactNode;
    moveFirst?: () => any;
    moveFirstBtnText?: ReactNode;
}

export const AssetConnectSuccessPageTemplate = memo((props: AssetConnectSuccessPageTemplateProps) => {
    const {t} = useTranslation('assets');
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
                        if (isLoading) return <WithLoopText text={t('connectSteps.successPage.loading')} />;

                        return (
                            <span onClick={() => refetch()}>
                                {subscriptions.length > 0
                                    ? t('connectSteps.successPage.subscriptionsFound', {
                                          count: unitFormat(subscriptions.length),
                                      })
                                    : t('connectSteps.successPage.noSubscriptions')}
                            </span>
                        );
                    })()}
                    subTitle={(() => {
                        if (isLoading) return '';

                        return subscriptions.length > 0 ? undefined : t('connectSteps.successPage.noSubscriptionsDesc');
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
                            <EmptyTable
                                message={t('connectSteps.successPage.noSubscriptionsMessage')}
                                className="invisible"
                            />
                        ) : (
                            <EmptyTable message={t('connectSteps.successPage.noSubscriptionsMessage')} />
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
                            text={nextBtnText || t('connectSteps.successPage.completeButton')}
                            onClick={onNext}
                            className="btn-secondary"
                            localLoading
                        />
                        {moveFirst && (
                            <NextStepButton
                                text={moveFirstBtnText || t('connectSteps.successPage.loadOtherAssetsButton')}
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
