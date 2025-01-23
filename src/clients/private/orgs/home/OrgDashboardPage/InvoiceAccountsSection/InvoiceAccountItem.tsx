import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {DashboardInvoiceAccountsSectionItemDto} from '^models/_dashboard/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components';
import {unitFormat} from '^utils/number';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {ProductDto} from '^models/Product/type';

interface InvoiceAccountItemProps {
    item: DashboardInvoiceAccountsSectionItemDto;
    // item: InvoiceAccountDto;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const {item} = props;
    const {invoiceAccountId, invoiceAccount, organizationId, product, subscriptionCount} = item;

    return (
        <li className="py-[17.8px] border-b-[1px] last:border-b-0">
            <LinkTo href={OrgInvoiceAccountShowPageRoute.path(organizationId, invoiceAccountId)}>
                <div className="flex items-center justify-between">
                    <InvoiceAccountProfile invoiceAccount={invoiceAccount} />

                    <p className="font-medium text-16 text-gray-900">
                        <CountText product={product} count={subscriptionCount} />
                    </p>
                </div>
            </LinkTo>
        </li>
    );
});
InvoiceAccountItem.displayName = 'InvoiceAccountItem';

const CountText = (props: {product: ProductDto | null; count: number}) => {
    const {product, count} = props;

    if (!product) {
        return <span>{unitFormat(0, '개')}</span>;
    }

    if (count > 1) {
        return (
            <span>
                {product.name()} 외 {unitFormat(count - 1, '개')}
            </span>
        );
    }

    return (
        <span>
            {product.name()} {unitFormat(count, '개')}
        </span>
    );
};
