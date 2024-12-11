import React, {MouseEvent, useState} from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {MoreButtonDropdownItem} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownItem';
import {MoreButtonDropdownContent} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownContent';
import {codefCardApi} from '^models/CodefCard/api';
import {confirm2, swalHTML} from '^components/util/dialog';
import {CreditCardUpdateSwalForm} from './CreditCardUpdateSwalForm';
import {destroyCreditCardHandler} from './destroyCreditCardHandler';
import {teamInvoiceAccountApi} from '^models/TeamInvoiceAccount/api';
import {toast} from 'react-hot-toast';
import {creditCardApi} from '^models/CreditCard/api';

interface MoreButtonContentProps {
    creditCard: CreditCardDto;
    onClick?: () => any;
    onSaved: () => any;
}

export function MoreButtonContent(props: MoreButtonContentProps) {
    const {creditCard, onClick, onSaved} = props;
    const {id, organizationId: orgId} = creditCard;

    const onDelete = async () => {
        confirm2(
            `결제수단을 삭제할까요?`,
            <span>
                이 작업은 취소할 수 없습니다.
                <br />
                <b>워크스페이스 전체</b>에서 삭제되며, <br />
                연결된 내역이 있다면 함께 삭제됩니다. <br />
                그래도 삭제하시겠어요?
            </span>,
            'warning',
        ).then((res) => {
            if (res.isConfirmed) {
                creditCardApi.destroy(orgId, id).then(() => {
                    toast.success('삭제되었어요.');
                    onSaved();
                });
            }
        });
    };

    return (
        <MoreButtonDropdownContent>
            <MoreButtonDropdownItem
                onClick={async () => {
                    onClick && onClick();
                    const isCodefConnected = await checkIsConnectedWithCodefCard(orgId, id);
                    swalHTML(
                        <CreditCardUpdateSwalForm
                            creditCard={creditCard}
                            onSave={onSaved}
                            isCodefConnected={!!isCodefConnected}
                        />,
                    );
                }}
            >
                수정하기
            </MoreButtonDropdownItem>
            <MoreButtonDropdownItem
                onClick={() => {
                    onClick && onClick();
                    onDelete();
                }}
            >
                삭제하기
            </MoreButtonDropdownItem>
        </MoreButtonDropdownContent>
    );
}

function checkIsConnectedWithCodefCard(orgId: number, creditCardId: number) {
    return codefCardApi
        .index(orgId, {
            where: {creditCardId},
        })
        .then((res) => {
            return res.data.pagination.totalItemCount;
        });
}
