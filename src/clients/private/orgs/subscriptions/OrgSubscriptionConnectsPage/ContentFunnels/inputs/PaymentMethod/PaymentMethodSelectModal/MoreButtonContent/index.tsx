import React from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {MoreButtonDropdownItem} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownItem';
import {MoreButtonDropdownContent} from '^components/ui/inputs/MonoSelect/MoreButtonDropdown/MoreButtonDropdownContent';
import {destroyCreditCardHandler} from './destroyCreditCardHandler';

interface MoreButtonContentProps {
    creditCard: CreditCardDto;
    onSaved: () => any;
}

export function MoreButtonContent(props: MoreButtonContentProps) {
    const {creditCard, onSaved} = props;

    return (
        <MoreButtonDropdownContent>
            <MoreButtonDropdownItem onClick={() => 1}>수정하기</MoreButtonDropdownItem>
            <MoreButtonDropdownItem onClick={() => destroyCreditCardHandler(creditCard, onSaved)}>
                삭제하기
            </MoreButtonDropdownItem>
        </MoreButtonDropdownContent>
    );
}
