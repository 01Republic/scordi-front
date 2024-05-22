import {ChangeEvent} from 'react';
import {cardNumberFormat, onlyNumber} from '^components/util/string';

export const EMAIL_REGEXP =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;

export const emailValid = (val: string): boolean => EMAIL_REGEXP.test(val);

export const inputTextToCurrencyFormat = (e: ChangeEvent<HTMLInputElement>) => {
    const [amount, formattedText] = onlyNumber(e.target.value);
    e.target.value = formattedText;
    return amount;
};

export const inputTextToCardNumberFormat = (e: ChangeEvent<HTMLInputElement>) => {
    const value = cardNumberFormat(e.target.value);
    e.target.value = value;
    return value;
};

export const inputTextToCardNumberInShortFormat = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().replace(/[^\d^\*]/g, '');
    e.target.value = value;
    return value;
};

export const inputTextToISODateFormat = (e: ChangeEvent<HTMLInputElement>) => {
    return new Date(e.target.value).toISOString();
};
