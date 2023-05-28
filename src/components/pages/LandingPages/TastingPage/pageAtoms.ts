import {atom} from 'recoil';
import {GmailItem, GoogleAccessTokenData} from '^api/tasting.api';
import {GoogleSignedUserData} from '^atoms/currentUser.atom';
import {Currency} from '^types/crawler';

export const gmailAccessTokenDataAtom = atom<GoogleAccessTokenData | null>({
    key: 'gmailAccessTokenDataAtom',
    default: null,
});

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

export const gmailItemsAtom = atom<GmailItem[]>({
    key: 'gmailItemsAtom',
    default: [],
});

export const displayCurrencyAtom = atom<Currency>({
    key: 'displayCurrencyAtom',
    default: Currency.USD,
});
