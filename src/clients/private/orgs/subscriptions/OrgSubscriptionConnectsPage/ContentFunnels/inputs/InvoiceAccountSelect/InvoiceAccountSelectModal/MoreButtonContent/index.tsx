import React from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {alert2, swalHTML} from '^components/util/dialog';
import {MoreButtonDropdownContent} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownContent';
import {MoreButtonDropdownItem} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownItem';
import {InvoiceAccountUpdateSwalForm} from '^models/InvoiceAccount/components';
import {destroyInvoiceAccountHandler} from '^models/InvoiceAccount/hook';

interface MoreButtonContentProps {
    invoiceAccount: InvoiceAccountDto;
    onClick?: () => any;
    onSaved: () => any;
}

export function MoreButtonContent(props: MoreButtonContentProps) {
    const {invoiceAccount, onClick, onSaved} = props;

    return (
        <MoreButtonDropdownContent>
            <MoreButtonDropdownItem
                onClick={() => {
                    onClick && onClick();
                    invoiceAccount.isManuallyCreated
                        ? swalHTML(<InvoiceAccountUpdateSwalForm invoiceAccount={invoiceAccount} onSave={onSaved} />)
                        : alert2(
                              '다른 구글 계정으로 연동하시겠어요?',
                              '해당 계정을 삭제하고 다른 계정으로 연동해보세요.',
                          );
                }}
            >
                수정하기
            </MoreButtonDropdownItem>
            <MoreButtonDropdownItem
                onClick={() => {
                    onClick && onClick();
                    destroyInvoiceAccountHandler(invoiceAccount, onSaved);
                }}
            >
                삭제하기
            </MoreButtonDropdownItem>
        </MoreButtonDropdownContent>
    );
}
