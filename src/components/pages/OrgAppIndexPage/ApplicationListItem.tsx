import React, {memo} from 'react';
import {ApplicationDto} from '^types/application.type';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {AppInfoPageRoute} from '^pages/orgs/[id]/apps/[appId]';
import {t_BillingCycleTerm} from '^types/applicationBillingCycle.type';

export const ApplicationListItem = memo((props: {applicationDto: ApplicationDto}) => {
    const router = useRouter();
    const organizationId = Number(router.query.id);
    const {applicationDto} = props;
    const {billingCycle, paymentPlan, prototype} = applicationDto;

    return (
        <div className="bs-col-12">
            <Link href={AppInfoPageRoute.path(`${organizationId}`, `${applicationDto.id}`)}>
                <div
                    id={`ApplicationListItem-${applicationDto.id}`}
                    className="flex justify-items-stretch px-3 py-3 mb-3 bg-[#F9FAFB] shadow-sm rounded-xl cursor-pointer"
                >
                    <div className="flex items-center px-1">
                        <img width={32} src={prototype.image} alt={`${prototype.name} logo image`} />
                    </div>
                    <div className="flex-1 px-3">
                        <p>
                            <b>{prototype.name}</b>
                        </p>
                        <p className="text-sm text-gray-500">
                            {paymentPlan.name} &middot; {t_BillingCycleTerm(billingCycle.term, true)}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <div className="px-1 text-right">
                            <p className="flex items-center justify-end font-bold text-lg leading-none">
                                <small className="mr-[2px]">US$</small>
                                <span>{billingCycle.unitPrice || 0}</span>
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
