import {memo} from 'react';
import {CardTableTR} from '^admin/share';
import {Avatar} from '^components/Avatar';
import {SubscriptionDto} from 'src/models/Subscription/types';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';

interface SubscriptionItemProps {
    subscription: SubscriptionDto;
    borderBottom?: boolean;
}

export const SubscriptionItem = memo((props: SubscriptionItemProps) => {
    const {subscription, borderBottom = true} = props;

    const [invoiceAccount] = subscription.invoiceAccounts || [];

    return (
        <CardTableTR gridClass="grid-cols-7" borderBottom={borderBottom}>
            {/* name */}
            <div>
                <div className="flex gap-2 items-center">
                    <Avatar src={subscription.product.image} className="w-[32px]" />
                    <p className="text-left flex flex-col gap-0.5 leading-none">
                        <span className="text-xs text-gray-500">(#{subscription.id})</span>
                        <span className="whitespace-nowrap">{subscription.product.nameKo}</span>
                    </p>
                </div>
            </div>

            {/* billing */}
            <div></div>

            {/* 인보이스 계정 */}
            <div className="col-span-2">
                {invoiceAccount && (
                    <div className="flex gap-2 items-center">
                        <Avatar src={invoiceAccount.image!} className="w-[32px]" />
                        <p className="text-left flex flex-col gap-0.5 leading-none">
                            <span className="text-xs text-gray-500">(#{invoiceAccount.id})</span>
                            <span className="whitespace-nowrap">{invoiceAccount.email}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* created at */}
            <div>
                <span className="whitespace-nowrap">{yyyy_mm_dd_hh_mm(subscription.createdAt)}</span>
            </div>

            <div>
                <span className="whitespace-nowrap">{yyyy_mm_dd_hh_mm(subscription.updatedAt)}</span>
            </div>

            {/* actions */}
            <div className="flex gap-2 items-center">
                <button className="btn btn-sm btn-primary">보기</button>
                <button className="btn btn-sm btn-warning">수정</button>
                <button className="btn btn-sm btn-error">삭제</button>
            </div>
        </CardTableTR>
    );
});
