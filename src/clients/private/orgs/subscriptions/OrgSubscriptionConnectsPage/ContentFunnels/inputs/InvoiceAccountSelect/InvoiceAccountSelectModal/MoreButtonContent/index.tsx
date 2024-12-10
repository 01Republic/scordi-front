import React from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {alert2, confirm2, runIfSwalConfirmed, swalHTML} from '^components/util/dialog';
import {MoreButtonDropdownContent} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownContent';
import {MoreButtonDropdownItem} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownItem';
import {InvoiceAccountUpdateSwalForm} from '^models/InvoiceAccount/components';
import {destroyInvoiceAccountHandler} from '^models/InvoiceAccount/hook';
import {invoiceAccountApi} from '^models/InvoiceAccount/api';
import {toast} from 'react-hot-toast';

interface MoreButtonContentProps {
    invoiceAccount: InvoiceAccountDto;
    onSaved: () => any;
}

export function MoreButtonContent(props: MoreButtonContentProps) {
    const {invoiceAccount, onSaved} = props;
    const {organizationId: orgId, id, subscriptions} = invoiceAccount;

    const onDestroyInvoiceAccountHandler = async () => {
        const destroy = () => {
            invoiceAccountApi.destroyV3(orgId, id).then(() => {
                toast.success('삭제했습니다.');
                onSaved();
            });
        };

        if (!subscriptions) {
            console.warn('invoiceAccount 에 subscriptions 가 relations 되어 있어야 합니다.');
            return;
        }

        // 연결된 결제내역이 있는 경우
        if (subscriptions.length > 0) {
            confirm2(
                '구독과 연결된 청구서 메일입니다.',
                <span>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제되며, <br />
                    연결된 내역이 있다면 함께 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </span>,
            ).then(runIfSwalConfirmed(destroy));
        }

        // 결제내역과 연결되지 않은 청구메일의 경우
        else {
            confirm2(
                '청구서 메일을 삭제할까요?',
                <span>
                    이 작업은 취소할 수 없습니다.
                    <br />
                    <b>워크스페이스 전체</b>에서 삭제되며, <br />
                    연결된 내역이 있다면 함께 삭제됩니다. <br />
                    그래도 삭제하시겠어요?
                </span>,
            ).then(runIfSwalConfirmed(destroy));
        }
    };

    return (
        <MoreButtonDropdownContent>
            <MoreButtonDropdownItem
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
            </MoreButtonDropdownItem>
            <MoreButtonDropdownItem onClick={onDestroyInvoiceAccountHandler}>삭제하기</MoreButtonDropdownItem>
        </MoreButtonDropdownContent>
    );
}
