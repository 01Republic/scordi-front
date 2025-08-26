import React, {useState} from 'react';
import cn from 'classnames';
import {TriangleAlert} from 'lucide-react';
import {currencyFormat, roundNumber} from '^utils/number';
import {SummaryOfBillingHistoriesDto} from '^types/dashboard.type';
import {BillingHistoryStatus, t_billingHistoryStatusForDashboard} from '^models/BillingHistory/type';
import {SubscriptionProfile} from '^models/Subscription/components';
import {OrgSubscriptionDetailPageRoute} from '^pages/orgs/[id]/subscriptions/[subscriptionId]';
import {LinkTo} from '^components/util/LinkTo';
import {NeedCheckSubscriptionIssueModal} from '^clients/private/orgs/home/OrgDashboardPage/MonthlyTotalExpenseSection/NeedCheckSubscriptionIssueModal';

interface ExpenseSubscriptionProps {
    summary?: SummaryOfBillingHistoriesDto;
    currentStatusTab?: BillingHistoryStatus;
}

export const ExpenseStatusTabContent = (props: ExpenseSubscriptionProps) => {
    const {summary, currentStatusTab = BillingHistoryStatus.PayWait} = props;
    const [isNeedCheckSubscriptionModalOpen, setIsNeedCheckSubscriptionModalOpen] = useState(false);
    const summaryOfState = (() => {
        switch (currentStatusTab) {
            case BillingHistoryStatus.PayWait:
                return summary?.pending;
            case BillingHistoryStatus.PaySuccess:
                return summary?.success;
            case BillingHistoryStatus.PayFail:
                return summary?.failure;
            default:
                return undefined;
        }
    })();
    const subscriptionSpends = summaryOfState?.subscriptionSpends || [];
    // const url = ;

    const today = new Date();

    const pastPaid = subscriptionSpends.filter((item) => {
        const subscription = item.subscription;
        const targetDate = subscription.nextComputedBillingDate || subscription.nextBillingDate;
        if (!targetDate) return false;
        return new Date(targetDate) < today;
    });

    const notPastPaid = subscriptionSpends.filter((item) => {
        const subscription = item.subscription;
        const targetDate = subscription.nextComputedBillingDate || subscription.nextBillingDate;
        if (!targetDate) return false;

        return new Date(targetDate) >= today;
    });

    // 로딩이 아직 안되었거나, 결과가 없는 경우
    if (subscriptionSpends.length === 0) {
        return (
            <div
                className={cn('w-full rounded-2xl flex items-center justify-center bg-white border py-10', {
                    'border-emerald-100 text-emerald-400': currentStatusTab === BillingHistoryStatus.PaySuccess,
                    'border-orange-100 text-orange-400': currentStatusTab === BillingHistoryStatus.PayWait,
                    'border-red-100 text-red-400': currentStatusTab === BillingHistoryStatus.PayFail,
                })}
            >
                <p>{`${t_billingHistoryStatusForDashboard(currentStatusTab)}된 내역이 없어요.`}</p>
            </div>
        );
    }

    return (
        <div
            className={cn('w-full rounded-2xl ', {
                'bg-emerald-100': currentStatusTab === BillingHistoryStatus.PaySuccess,
                'bg-orange-100 ': currentStatusTab === BillingHistoryStatus.PayWait,
                'bg-red-100': currentStatusTab === BillingHistoryStatus.PayFail,
            })}
        >
            {currentStatusTab === BillingHistoryStatus.PayWait ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                        {notPastPaid.map((spend) => (
                            <LinkTo
                                href={OrgSubscriptionDetailPageRoute.path(spend.organizationId, spend.subscriptionId)}
                                key={spend.subscription.id}
                                className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl"
                            >
                                <SubscriptionProfile
                                    subscription={spend.subscription}
                                    width={20}
                                    height={20}
                                    className="gap-3"
                                    textClassName="text-14 font-base font-normal"
                                    isAlias={false}
                                />
                                <p>{currencyFormat(roundNumber(spend.amount))}</p>
                            </LinkTo>
                        ))}
                    </div>

                    {pastPaid.length > 0 && (
                        <section className="p-2 flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={() => setIsNeedCheckSubscriptionModalOpen(true)}
                                className="flex items-center gap-2 cursor-pointer text-13 text-orange-400 pl-[18px]"
                            >
                                <TriangleAlert className="size-6 fill-orange-100" />
                                <span className="font-semibold text-16">확인이 필요한 구독이에요!</span>
                            </button>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
                                {pastPaid.map((spend) => (
                                    <LinkTo
                                        href={OrgSubscriptionDetailPageRoute.path(
                                            spend.organizationId,
                                            spend.subscriptionId,
                                        )}
                                        key={spend.subscription.id}
                                        className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl"
                                    >
                                        <SubscriptionProfile
                                            subscription={spend.subscription}
                                            width={20}
                                            height={20}
                                            className="gap-3"
                                            textClassName="text-14 font-base font-normal"
                                            isAlias={false}
                                        />
                                        <p>{currencyFormat(roundNumber(spend.amount))}</p>
                                    </LinkTo>
                                ))}
                            </div>
                        </section>
                    )}
                </>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
                    {subscriptionSpends.map((spend) => (
                        <LinkTo
                            href={OrgSubscriptionDetailPageRoute.path(spend.organizationId, spend.subscriptionId)}
                            key={spend.subscription.id}
                            className="w-full bg-white px-5 py-4 flex items-center justify-between rounded-xl"
                        >
                            <SubscriptionProfile
                                subscription={spend.subscription}
                                width={20}
                                height={20}
                                className="gap-3"
                                textClassName="text-14 font-base font-normal"
                                isAlias={false}
                            />
                            <p>{currencyFormat(roundNumber(spend.amount))}</p>
                        </LinkTo>
                    ))}
                </div>
            )}
            <NeedCheckSubscriptionIssueModal
                isOpened={isNeedCheckSubscriptionModalOpen}
                onClose={() => setIsNeedCheckSubscriptionModalOpen(false)}
            />
        </div>
    );
};
