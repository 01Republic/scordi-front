import React, {memo} from 'react';
import {ApplicationDto} from '^types/application.type';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {AppInfoPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {t_BillingCycleTerm} from '^types/applicationBillingCycle.type';
import {safeImageSrc} from '^types/applicationPrototype.type';
import {ContentPanelItem} from '^layouts/ContentLayout';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

export const ApplicationListItemDesktop = memo((props: {applicationDto: ApplicationDto}) => {
    const {applicationDto} = props;
    // const organizationId = useRouterIdParamState('id', orgIdParamState);
    const {billingCycle, paymentPlan, prototype} = applicationDto;

    return (
        <tr className="text-sm">
            <td>
                <div className="flex items-center">
                    <img src={prototype.image} alt="" width={24} className="mr-4" />
                    <span>{prototype.name}</span>
                </div>
            </td>
            <td>
                <div>{paymentPlan.name}</div>
            </td>
            <td>
                <div>{t_BillingCycleTerm(billingCycle.term, true)}</div>
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
