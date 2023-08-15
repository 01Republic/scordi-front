import {Fragment, memo} from 'react';
import {ContentPanel, ContentTable} from '^layouts/ContentLayout';
import {t_BillingCycleTerm} from '^types/applicationBillingCycle.type';
import {useRecoilState} from 'recoil';
import {adminPrototypeDetail} from '^components/pages/admin/prototypes/AdminPrototypeDetailpage';

export const EditPrototypePlanCycle = memo(() => {
    const [prototype] = useRecoilState(adminPrototypeDetail);

    if (!prototype) return <></>;

    const {paymentPlans} = prototype;

    return (
        <ContentPanel title="플랜 & 결제주기">
            <ContentTable
                thead={
                    <tr>
                        <th>plan name</th>
                        <th>cycle term</th>
                        <th>unit price</th>
                        <th />
                    </tr>
                }
            >
                {(paymentPlans || []).map((plan, i) => {
                    const {billingCycles} = plan;
                    const rowSpan = Math.max(billingCycles.length, 1);

                    return (
                        <Fragment key={i}>
                            {(billingCycles || []).map((cycle, j) => (
                                <tr key={j}>
                                    <td rowSpan={rowSpan}>
                                        <span>{plan.name}</span>
                                        <span className="ml-0.5 text-xs text-gray-500">(#{plan.id})</span>
                                    </td>
                                    <td>
                                        <span>{t_BillingCycleTerm(cycle.term, true)}</span>
                                        <span className="ml-0.5 text-xs text-gray-500">(#{cycle.id})</span>
                                    </td>
                                    <td>
                                        <div className="flex gap-1.5">
                                            <span>${cycle.unitPrice}</span>
                                            <span>{cycle.isPerUser ? '/ User' : ''}</span>
                                        </div>
                                    </td>
                                    <td></td>
                                </tr>
                            ))}
                        </Fragment>
                    );
                })}
            </ContentTable>
        </ContentPanel>
    );
});
