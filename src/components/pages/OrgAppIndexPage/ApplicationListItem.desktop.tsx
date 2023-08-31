import React, {memo} from 'react';
import {SubscriptionDto} from '^types/subscription.type';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {OrgAppShowPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {ApplicationDetailPageRoute} from 'src/pages/orgs/[id]/products/[productId]/apps/[appId]';
import {t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {safeImageSrc} from '^types/product.type';
import {ContentPanelItem} from '^layouts/ContentLayout';
import {subscriptionIdParamState, orgIdParamState, productIdParamsState} from '^atoms/common';
import {useRecoilState} from 'recoil';
import {useRouterIdParamState} from '^atoms/common';

export const ApplicationListItemDesktop = memo((props: {applicationDto: SubscriptionDto}) => {
    const router = useRouter();
    const orgId = useRouterIdParamState('id', orgIdParamState);
    const {applicationDto} = props;
    const {billingCycle, paymentPlan, product} = applicationDto;
    const appId = applicationDto.id;

    return (
        <tr className="text-sm cursor-pointer" onClick={() => router.push(OrgAppShowPageRoute.path(orgId, appId))}>
            <td>
                <div className="flex items-center">
                    <img src={product.image} alt="" width={24} className="mr-4" />
                    <span>
                        {product.name} - {applicationDto.displayName}
                    </span>
                </div>
            </td>
            <td>
                <div>{paymentPlan?.name ?? '-'}</div>
            </td>
            <td>
                <div>{billingCycle ? t_BillingCycleTerm(billingCycle.term, true) : '-'}</div>
            </td>
            {/*<td className="text-right">*/}
            {/*    <p className="flex items-center justify-end font-semibold text-sm leading-none">*/}
            {/*        <small className="mr-[2px]">US$</small>*/}
            {/*        <span>{billingCycle.unitPrice || 0}</span>*/}
            {/*    </p>*/}
            {/*</td>*/}
            <td className="text-right">{applicationDto.nextBillingDate}</td>
            <td className="text-right">
                <p className="flex items-center justify-end font-semibold text-sm leading-none">
                    <small className="mr-[2px]">US$</small>
                    <span>{applicationDto.nextBillingAmount || 0}</span>
                </p>
            </td>
            <td>-</td>
        </tr>
    );
});
