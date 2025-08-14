import React, {memo} from 'react';
import {GmailItemDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {IdBadge} from './IdBadge';
import {DateColumn} from './DateColumn';
import {InvoiceAccountProfileCompact} from '^models/InvoiceAccount/components';
import {OrganizationDto} from '^models/Organization/type';

interface GmailItemRowProps {
    item: GmailItemDto;
    showInfo?: boolean;
    onSelectOrg?: (org: OrganizationDto) => any;
    onSelectInvoiceAccount?: (invoiceAccount: InvoiceAccountDto) => any;
}

export const GmailItemRow = memo((props: GmailItemRowProps) => {
    const {item, showInfo = false, onSelectOrg, onSelectInvoiceAccount} = props;
    const {invoiceAccount} = item;

    return (
        <div
            className="grid grid-cols-24 gap-2 text-12 items-center min-h-[44px] -mx-2 px-2 rounded-md cursor-default hover:bg-gray-50 transition-all"
            onClick={() => console.log(item)}
        >
            {/* 조직 */}
            {showInfo && (
                <div
                    className="col-span-3 flex items-center gap-1 cursor-pointer group"
                    onClick={() => item.organization && onSelectOrg && onSelectOrg(item.organization)}
                >
                    <IdBadge>{item.organizationId}</IdBadge>
                    <span className="text-scordi group-hover:underline underline-offset-2">
                        {item.organization?.name}
                    </span>
                </div>
            )}

            {/* 계정 */}
            {showInfo && (
                <div className="col-span-3">
                    {invoiceAccount && (
                        <div className="group relative cursor-pointer">
                            <div className=" bg-white text-scordi">
                                <InvoiceAccountProfileCompact invoiceAccount={invoiceAccount} ellipsis />
                            </div>
                            <div className="hidden cursor-pointer group-hover:block absolute top-0 left-0 w-max -mx-2 -my-1 px-2 py-1 bg-gray-100 border-gray-200 rounded-md">
                                <div className="flex items-center gap-1">
                                    <div
                                        className="cursor-pointer text-scordi hover:underline underline-offset-2"
                                        onClick={() => onSelectInvoiceAccount && onSelectInvoiceAccount(invoiceAccount)}
                                    >
                                        <InvoiceAccountProfileCompact invoiceAccount={invoiceAccount} />
                                    </div>
                                    <IdBadge># {item.invoiceAccountId}</IdBadge>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 발신자 */}
            <div className="col-span-4 leading-none">
                <div className="font-semibold break-all">{item.fromName}</div>
                <div className="text-gray-500 break-all">{item.fromEmail}</div>
            </div>

            {/* 제목 / 수신일시 / 스니펫 */}
            <div className={`${showInfo ? 'col-span-11' : 'col-span-17'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="font-semibold break-all">{item.title}</div>
                    </div>
                </div>
                <div className="text-gray-500 leading-tight text-10 break-all">{item.snippet}</div>
            </div>

            {/* 받은시각 */}
            <div className="col-span-2 text-right">
                <DateColumn date={item.receivedAt} />
            </div>

            {/* 기타 */}
            <div className="col-span-1"></div>
        </div>
    );
});
GmailItemRow.displayName = 'GmailItemRow';
