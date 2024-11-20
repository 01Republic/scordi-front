import {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {LinkTo} from '^components/util/LinkTo';
import {AdminOrgPageRoute} from '^pages/admin/orgs/[id]';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {CardTableTR} from '^admin/share';
import {SubscriptionDto} from '^models/Subscription/types';
import {Dropdown} from '^v3/share/Dropdown';
import {TransferProductButton} from './TransferProductButton';
import {RemoveProductSubscriptionButton} from './RemoveProductSubscriptionButton';

interface ProductSubscriptionItemProps {
    subscription: SubscriptionDto;
    borderBottom?: boolean;
    reload?: () => any;
}

export const ProductSubscriptionItem = memo((props: ProductSubscriptionItemProps) => {
    const {subscription, borderBottom = false, reload} = props;

    return (
        <CardTableTR gridClass="grid-cols-10" borderBottom={borderBottom}>
            {/* name */}
            <div className="col-span-2">
                <div className="flex gap-2 items-center">
                    <Avatar src={subscription.product.image} className="w-[32px]" />
                    <p className="text-left flex flex-col gap-0.5">
                        <span className="text-xs text-gray-500 leading-none">(#{subscription.id})</span>
                        <span className="truncate text-sm leading-none">
                            {subscription.product.name()} {subscription.alias ? `- ${subscription.alias}` : ''}
                        </span>
                    </p>
                </div>
            </div>

            {/*조직*/}
            <div className="col-span-2">
                {subscription.organization ? (
                    <LinkTo href={AdminOrgPageRoute.path(subscription.organizationId)} className="hover:link-primary">
                        <p className="text-left flex flex-col gap-0.5 leading-none">
                            <span className="text-xs text-gray-500">(#{subscription.organizationId})</span>
                            <span>{subscription.organization.name}</span>
                        </p>
                    </LinkTo>
                ) : (
                    <span>-</span>
                )}
            </div>

            {/*등록방법*/}
            <div>{subscription.connectMethod}</div>

            {/* 연결된 결제내역 수 */}
            <div>{(subscription.billingHistories || []).length.toLocaleString()}</div>

            {/* 연결된 멤버 수 */}
            <div>{(subscription.teamMembers || []).length.toLocaleString()}</div>

            {/* 인보이스 계정 수 */}
            <div>{(subscription.invoiceAccounts || []).length.toLocaleString()}</div>

            {/* Timestamps */}
            <div>
                <div className="text-left flex flex-col gap-0.5 text-sm">
                    {/*created at*/}
                    <p className="leading-none text-gray-500 text-10">{yyyy_mm_dd_hh_mm(subscription.createdAt)}</p>
                    {/*updated at*/}
                    <p className="leading-none text-12">{yyyy_mm_dd_hh_mm(subscription.updatedAt)}</p>
                </div>
            </div>

            <div className="flex items-center justify-end">
                <Dropdown
                    offset={[0, 5]}
                    Trigger={() => <button className="btn btn-sm btn-scordi">더 보기</button>}
                    Content={({hide}) => {
                        const onFinish = () => {
                            hide();
                            reload && reload();
                        };

                        return (
                            <div className="dropdown-content menu menu-compact p-0 rounded-lg shadow bg-white">
                                <li className="overflow-hidden">
                                    <TransferProductButton subscription={subscription} onFinish={onFinish} />
                                </li>
                                <li className="overflow-hidden">
                                    <RemoveProductSubscriptionButton subscription={subscription} onFinish={onFinish} />
                                </li>
                            </div>
                        );
                    }}
                />
            </div>
        </CardTableTR>
    );
});
ProductSubscriptionItem.displayName = 'ProductSubscriptionItem';
