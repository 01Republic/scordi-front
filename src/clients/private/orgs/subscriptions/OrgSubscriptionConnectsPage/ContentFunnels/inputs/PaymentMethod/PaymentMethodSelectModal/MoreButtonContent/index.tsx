import React from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {MoreButtonDropdownItem} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownItem';
import {MoreButtonDropdownContent} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownContent';
import {codefCardApi} from '^models/CodefCard/api';
import {swalHTML} from '^components/util/dialog';
import {CreditCardUpdateSwalForm} from './CreditCardUpdateSwalForm';
import {destroyCreditCardHandler} from './destroyCreditCardHandler';

interface MoreButtonContentProps {
    creditCard: CreditCardDto;
    onSaved: () => any;
}

export function MoreButtonContent(props: MoreButtonContentProps) {
    const {creditCard, onSaved} = props;
    const {id, organizationId: orgId} = creditCard;

    return (
        <MoreButtonDropdownContent>
            <MoreButtonDropdownItem
                onClick={async () => {
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
            <MoreButtonDropdownItem onClick={() => destroyCreditCardHandler(creditCard, onSaved)}>
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
