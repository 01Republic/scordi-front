import {atom} from 'recoil';
import {GmailParsedItem, GoogleAccessTokenData} from '^api/tasting.api';
import {GoogleSignedUserData} from '^atoms/currentUser.atom';
import {Currency} from '^types/crawler';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {BillingHistoryDto} from '^types/billing.type';

export const gmailItemsLoadingAtom = atom({
    key: 'gmailItemsLoadingAtom',
    default: false,
});

export const gmailItemsLoadedAtom = atom({
    key: 'gmailItemsLoadedAtom',
    default: false,
});

export const gmailProfileAtom = atom<GoogleSignedUserData | null>({
    key: 'gmailProfileAtom',
    default: null,
});

export const gmailItemsAtom = atom<GmailParsedItem[]>({
    key: 'gmailItemsAtom',
    default: [],
});

export const draftAccountAtom = atom<InvoiceAccountDto | null>({
    key: 'draftAccountAtom',
    default: null,
});

export const draftBillingHistoriesAtom = atom<BillingHistoryDto[]>({
    key: 'draftBillingHistoriesAtom',
    default: [],
});

export const displayCurrencyAtom = atom<Currency>({
    key: 'displayCurrencyAtom',
    default: Currency.KRW,
});
