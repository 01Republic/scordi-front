import React from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {alert2, swalHTML} from '^components/util/dialog';
import {MoreButtonItem} from './MoreButtonItem';
import {InvoiceAccountUpdateSwalForm} from './InvoiceAccountUpdateSwalForm';
import {destroyInvoiceAccountHandler} from './destroyInvoiceAccountHandler';

interface MoreButtonContentProps {
    invoiceAccount: InvoiceAccountDto;
    onSaved: () => any;
}

export function MoreButtonContent(props: MoreButtonContentProps) {
    const {invoiceAccount, onSaved} = props;

    return (
        <div className="card card-compact card-bordered bg-white px-1 py-0.5 rounded-md shadow-lg min-w-[50px]">
            <MoreButtonItem
                onClick={() => {
                    invoiceAccount.isManuallyCreated
                        ? swalHTML(<InvoiceAccountUpdateSwalForm invoiceAccount={invoiceAccount} onSave={onSaved} />)
                        : alert2(
                              '다른 구글 계정으로 연동하시겠어요?',
                              '해당 계정을 삭제하고 다른 계정으로 연동해보세요.',
                          );
                }}
            >
                수정하기
            </MoreButtonItem>
            <MoreButtonItem onClick={() => destroyInvoiceAccountHandler(invoiceAccount, onSaved)}>
                삭제하기
            </MoreButtonItem>
        </div>
    );
}
