import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {hh_mm, yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {SubscriptionItemMoreDropdown} from './SubscriptionItemMoreDropdown';
import {OpenButtonColumn} from '^clients/private/_components/table/OpenButton';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import Tippy from '@tippyjs/react';
import {
    BillingCycleTypeTagUI,
    LatestPayAmount,
    MemberCount,
    NextComputedBillingDateText,
    SubscriptionUsingStatusTag,
} from '^models/Subscription/components';

interface SubscriptionItemProps {
    subscription: SubscriptionDto;
    reload: () => any;
    isConnectStatusView?: boolean;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const {subscription, reload, isConnectStatusView = false} = props;
    const {product, invoiceAccounts = []} = subscription;
    const [invoiceAccount] = invoiceAccounts;

    return (
        <>
            {/* ID */}
            <div>
                <span className="badge badge-xs">#{subscription.id}</span>
            </div>

            {/* Product */}
            <div className="col-span-2">
                <OpenButtonColumn href={AdminProductPageRoute.path(product.id)}>
                    <div className="flex gap-2 items-center">
                        <Avatar src={product.image} className="w-[20px] border border-gray-200 rounded-full shadow" />
                        <p className="text-left flex items-center gap-0.5 leading-none">
                            <span className="text-12 text-gray-500">(#{product.id})</span>
                            <span className="whitespace-nowrap">{product.nameKo}</span>
                        </p>
                    </div>
                </OpenButtonColumn>
            </div>

            {isConnectStatusView ? (
                <>
                    {/* 결제수단(계좌) */}
                    <div className="col-span-2"></div>

                    {/* 결제수단 */}
                    <div className="col-span-2"></div>

                    {/* 청구서 계정 */}
                    <div className="col-span-2">
                        {invoiceAccount ? (
                            <Tippy
                                className="!text-12"
                                content={
                                    <div className="flex flex-col gap-0.5">
                                        {invoiceAccounts.map((invoiceAccount, i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <div>({invoiceAccount.id})</div>
                                                <div>{invoiceAccount.email}</div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            >
                                <div>
                                    <div className="flex gap-2 items-center">
                                        <Avatar src={invoiceAccount.image!} className="w-[20px]" />
                                        <p className="text-left flex items-center gap-0.5 leading-none overflow-hidden">
                                            <span className="whitespace-nowrap truncate text-ellipsis">
                                                {invoiceAccount.email}
                                            </span>
                                            <span className="text-12 text-gray-400 whitespace-nowrap">
                                                등 {invoiceAccounts.length}개
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Tippy>
                        ) : (
                            <EmptyText />
                        )}
                    </div>
                </>
            ) : (
                <>
                    {/* 상태 */}
                    <div>
                        <SubscriptionUsingStatusTag
                            value={subscription.usingStatus}
                            className="no-selectable !cursor-default"
                        />
                    </div>

                    {/* 결제주기 */}
                    <div className="">
                        <BillingCycleTypeTagUI
                            value={subscription.billingCycleType}
                            className="no-selectable !cursor-default"
                            short
                        />
                    </div>

                    {/* 결제금액 */}
                    <div className="text-right">
                        <LatestPayAmount subscription={subscription} />
                    </div>

                    {/* 갱신일 */}
                    <div className="text-right">
                        <NextComputedBillingDateText subscription={subscription} />
                    </div>

                    {/* 사용인원 */}
                    <div className="text-center">
                        <MemberCount subscription={subscription} />
                    </div>

                    {/* 비고 */}
                    <div className="col-span-2">
                        <div>{subscription.desc}</div>
                    </div>
                </>
            )}

            {/* 등록일시 */}
            <div>
                <div className={`tooltip tooltip-top tooltip-success`} data-tip={hh_mm(subscription.createdAt)}>
                    {yyyy_mm_dd(subscription.createdAt)}
                </div>
            </div>

            {/* 수정일시 */}
            {isConnectStatusView && (
                <div>
                    <div className={`tooltip tooltip-top tooltip-success`} data-tip={hh_mm(subscription.updatedAt)}>
                        {yyyy_mm_dd(subscription.updatedAt)}
                    </div>
                </div>
            )}

            {/* actions */}
            <div className="flex gap-2 items-center justify-end">
                <SubscriptionItemMoreDropdown subscription={subscription} reload={reload} />
                {/*<button className="btn btn-sm btn-primary">보기</button>*/}
                {/*<button className="btn btn-sm btn-warning">수정</button>*/}
                {/*<button className="btn btn-sm btn-error">삭제</button>*/}
            </div>
        </>
    );
});

const EmptyText = () => <span className="text-12 text-gray-300">비어있음</span>;
