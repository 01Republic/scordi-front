import {SubscriptionDto, t_ConnectStatus} from '^types/subscription.type';
import {ContentPanelItem} from '^layouts/ContentLayout/ContentPanel';
import {t_BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import React from 'react';

interface OrgAppListItemProps {
    app: SubscriptionDto;
}

export function OrgAppListItem({app}: OrgAppListItemProps) {
    const {product} = app;

    return (
        <ContentPanelItem>
            {/* 1 */}
            <div className="bs-col px-0 bs-row mx-0 items-center">
                <div className="avatar mr-3">
                    <div className="mask mask-squircle h-8 w-8">
                        <img alt={`${product.name} Logo`} src={product.image} />
                    </div>
                </div>
                <div className="bs-col px-0">
                    <p className="font-bold">{product.name}</p>
                    <p className="text-xs text-gray-500">{app.displayName}</p>

                    {/*<p className="text-xs text-gray-500">*/}
                    {/*  <div className="badge badge-xs text-2xs">neutral</div>*/}
                    {/*  /!*<div className="badge badge-primary badge-outline badge-xs text-2xs"></div>*!/*/}
                    {/*</p>*/}
                </div>
            </div>

            {/* 2 */}
            {/* 요금제 */}
            <div className="bs-col px-0">
                <div>
                    <div className="rounded px-2 py-1 text-center font-semibold bg-pink-50 text-pink-500 text-xs w-[60px]">
                        {app.paymentPlan?.name || '-'}
                    </div>
                </div>
            </div>

            {/* 3 */}
            {/* 단가 */}
            <div className="bs-col px-0">
                <div>
                    <span className="text-sm">$</span>
                    <span className="font-bold">{app.billingCycle?.unitPrice || 0}</span>
                    &nbsp;
                    <span className="text-sm text-gray-500">{app.billingCycle?.isPerUser ? '사용자/' : ''}</span>
                    <span className="text-sm text-gray-500">
                        {app.billingCycle ? t_BillingCycleTerm(app.billingCycle.term) : '-'}
                    </span>
                </div>
            </div>

            {/* 3 */}
            {/* 인원 */}
            <div className="bs-col px-0">
                <div className="w-fit text-right">
                    <div className="" style={{lineHeight: 1}}>
                        <span className="text-sm">x</span>
                        <span className="font-bold">{app.paidMemberCount}</span>
                        &nbsp;
                        <span className="text-sm text-gray-500">{`명`}</span>
                        &nbsp;
                    </div>
                    {/*<div style={{ lineHeight: 1 }}>*/}
                    {/*  <div className="avatar-group -space-x-3">*/}
                    {/*    <div className="avatar">*/}
                    {/*      <div className="w-6">*/}
                    {/*        <img src="https://placeimg.com/192/192/people" />*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="avatar">*/}
                    {/*      <div className="w-6">*/}
                    {/*        <img src="https://placeimg.com/192/192/people" />*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="avatar">*/}
                    {/*      <div className="w-6">*/}
                    {/*        <img src="https://placeimg.com/192/192/people" />*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="avatar placeholder">*/}
                    {/*      <div className="w-6 bg-neutral-focus text-neutral-content">*/}
                    {/*        <span className="text-2xs">+{app.accountCount}</span>*/}
                    {/*      </div>*/}
                    {/*    </div>*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* 3 */}
            <div className="bs-col px-0">
                <div className="w-fit text-right">
                    {/* 결제예정금액 */}
                    <div className="text-info" style={{lineHeight: 1}}>
                        <span className="text-sm">$</span>
                        <span className="font-bold">{(app.billingCycle?.unitPrice || 0) * app.paidMemberCount}</span>
                    </div>
                    {/* 결제예정일 */}
                    <div style={{lineHeight: 1}}>
                        <span className="text-xs">next: 2022-10-01</span>
                    </div>
                </div>
            </div>

            {/* 3 */}
            {/* 변동금액 */}
            <div className="bs-col px-0">
                <div>1</div>
            </div>

            {/* 4 */}
            <div>
                <button className="btn btn-primary btn-sm">자세히</button>
            </div>
        </ContentPanelItem>
    );
}
