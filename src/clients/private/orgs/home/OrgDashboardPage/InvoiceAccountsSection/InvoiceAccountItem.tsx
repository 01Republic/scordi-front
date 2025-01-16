import React, {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {DashboardInvoiceAccountsSectionItemDto} from '^models/_dashboard/type';
import {InvoiceAccountProfile} from '^models/InvoiceAccount/components';
import {unitFormat} from '^utils/number';
import {OrgInvoiceAccountShowPageRoute} from '^pages/orgs/[id]/invoiceAccounts/[invoiceAccountId]';

interface InvoiceAccountItemProps {
    item: DashboardInvoiceAccountsSectionItemDto;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const {item} = props;

    const {invoiceAccount, organizationId, billingHistoryCount, product, id} = item;

    return (
        <li className="px-4 py-[17.8px] border-b-[1px] last:border-b-0">
            <LinkTo href={OrgInvoiceAccountShowPageRoute.path(organizationId, id)}>
                <div className="flex items-center justify-between">
                    {/* TODO: 서버에서 invoiceAccount 을 필수값으로 변경해줄 예정. 변경되면 아래 코드도 바꿔줘야 함. */}
                    {invoiceAccount ? <InvoiceAccountProfile invoiceAccount={invoiceAccount} /> : <></>}

                    <p className="font-medium text-16 text-gray-900">
                        {product && billingHistoryCount > 1 ? (
                            <span>
                                {product.name()} 외 {unitFormat(billingHistoryCount - 1, '건')}
                            </span>
                        ) : (
                            <span>
                                {product?.name()} {unitFormat(billingHistoryCount, '건')}
                            </span>
                        )}
                    </p>
                </div>
            </LinkTo>
        </li>
    );
});
InvoiceAccountItem.displayName = 'InvoiceAccountItem';
