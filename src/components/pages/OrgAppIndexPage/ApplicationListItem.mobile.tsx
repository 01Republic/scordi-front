import React, {memo} from 'react';
import {SubscriptionDto} from 'src/models/Subscription/types';
import Link from 'next/link';
import {OrgAppShowPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {t_BillingCycleTerm} from '^models/Subscription/types/billingCycleType';
import {safeImageSrc} from '^types/product.type';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

export const ApplicationListItemMobile = memo((props: {subscription: SubscriptionDto}) => {
    const {subscription} = props;
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const {billingCycle, paymentPlan, product} = subscription;

    return (
        <div className="bs-col-12">
            <Link href={OrgAppShowPageRoute.path(organizationId, subscription.id)}>
                <div
                    id={`ApplicationListItem-${subscription.id}`}
                    className="flex justify-items-stretch px-3 py-3 mb-3 bg-[#F9FAFB] shadow-sm rounded-xl cursor-pointer"
                >
                    <div className="flex items-center px-1">
                        <img
                            width={32}
                            height={32}
                            className="mask mask-squircle"
                            src={safeImageSrc(product, 32, 32)}
                            alt={`${product.nameEn} logo image`}
                        />
                    </div>
                    <div className="flex-1 px-3">
                        <p>
                            <b>{product.nameEn}</b>
                        </p>
                        <p className="text-sm text-gray-500">
                            {paymentPlan?.name || '-'} &middot;{' '}
                            {billingCycle ? t_BillingCycleTerm(billingCycle.term, true) : '-'}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="px-1 text-right">
                            <p className="flex items-center justify-end font-bold text-lg leading-none">
                                <small className="mr-[2px]">US$</small>
                                <span>{billingCycle?.unitPrice || 0}</span>
                            </p>
                            {/*<p className="leading-none text-xs text-gray-500">*/}
                            {/*    명 / {t_BillingCycleTerm(billingCycle.term)}*/}
                            {/*</p>*/}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
});
