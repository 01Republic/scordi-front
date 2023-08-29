import {memo} from 'react';
import {SubscriptionDto} from '^types/subscription.type';
import {Locale, t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';

interface CurrentPlanPaidAccountStatusProps {
    application: SubscriptionDto;
}

export const CurrentPlanPaidAccountStatus = memo((props: CurrentPlanPaidAccountStatusProps) => {
    const {application} = props;
    const {prototype, paymentPlan, billingCycle} = application;

    const cycleName = billingCycle ? t_BillingCycleTerm(billingCycle.term, false, Locale.en) : '-';
    const unitPrice = billingCycle ? `$${billingCycle.unitPrice}` : '-';
    const paidMemberCount = application.paidMemberCount;
    const usingMemberCount = application.usedMemberCount;
    const totalPrice = `$${application.nextBillingAmount.toFixed(2)}`;
    const isDependOnAccounts = !!billingCycle?.isPerUser;

    if (!isDependOnAccounts) return <></>;

    return (
        <div className="card-body border-t">
            <p>
                <b className="text-lg mr-2">{unitPrice}</b>
                <span className="text-gray-500">per account / {cycleName}</span>
            </p>

            <div className="flex gap-16">
                <div className="flex-1">
                    <div>
                        <div className="flex justify-between">
                            <div className="">
                                <p className="text-sm">
                                    Paid for <b>{paidMemberCount}</b> accounts
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    <b>{usingMemberCount}</b> of <b>{paidMemberCount} accounts</b> used
                                </p>
                            </div>
                        </div>
                    </div>
                    <progress
                        className="progress progress-primary w-full bg-gray-300"
                        value={usingMemberCount}
                        max={paidMemberCount}
                    ></progress>
                    <div>
                        <p className="text-xs text-gray-500">{usingMemberCount} member</p>
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <span className="font-semibold">{totalPrice}</span>
                </div>
            </div>
        </div>
    );
});
