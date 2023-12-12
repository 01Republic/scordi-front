import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {Avatar} from '^components/Avatar';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useAlert} from '^hooks/useAlert';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {BsDashCircle} from 'react-icons/bs';

interface InvoiceAccountTableRowProps {
    invoiceAccount: InvoiceAccountDto | undefined;
}

export const InvoiceAccountTableRow = memo((props: InvoiceAccountTableRowProps) => {
    const {search: getInvoiceAccounts} = useInvoiceAccounts();
    const orgId = useRecoilValue(orgIdParamState);
    const {alert} = useAlert();

    const {invoiceAccount} = props;
    if (!invoiceAccount) return <></>;

    const invoiceAccountId = invoiceAccount?.id;

    const onDelete = () => {
        if (!orgId || isNaN(orgId) || !invoiceAccountId || isNaN(invoiceAccountId)) return;
        const res = alert.destroy({
            title: '인보이스 수신 계정을 삭제하시겠습니까?',
            onConfirm: () => invoiceAccountApi.destroy(orgId, invoiceAccountId),
        });

        res.then(() => {
            getInvoiceAccounts({itemsPerPage: 10});
        });
    };

    return (
        <tr>
            {/* 이메일 */}
            <td>
                <div className="flex gap-3 items-center">
                    <Avatar src={invoiceAccount.image || undefined} className="w-7 h-7" />
                    <div>
                        <p className="text-sm flex gap-2 font-semibold items-center">
                            <span>{invoiceAccount.email}</span>
                        </p>
                    </div>
                </div>
            </td>

            {/*삭제 버튼*/}
            <td className="text-end">
                <button
                    onClick={onDelete}
                    className="relative top-[-2px] text-red-300 hover:text-red-500 transition-all"
                >
                    <BsDashCircle size={22} strokeWidth={0.3} />
                </button>
            </td>
        </tr>
    );
});
