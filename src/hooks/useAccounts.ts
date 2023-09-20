import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {useRecoilState} from 'recoil';
import {getAccountsQueryAtom, accountsSearchResultAtom} from '^atoms/accounts.atom';
import {FindAllAccountsQueryDto} from '^types/account.type';
import {accountApi} from '^api/account.api';
import {LoginDto} from '^types/crawler';
import CryptoJS from 'crypto-js';

export const useAccounts = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(accountsSearchResultAtom);
    const [query, setQuery] = useRecoilState(getAccountsQueryAtom);

    async function search(params: FindAllAccountsQueryDto) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await accountApi.index(orgId, params).then((res) => res.data);
        setResult(data);
        setQuery(params);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};

export const useAccountSign = () => {
    const CRAWLER_SIGN_SECRET = process.env.NEXT_PUBLIC_CRAWLER_SIGN_SECRET as string;

    const encryptLoginQuery = (loginQuery: LoginDto) => {
        const data = JSON.stringify(loginQuery);
        return CryptoJS.AES.encrypt(data, CRAWLER_SIGN_SECRET).toString();
    };

    const decryptSign = (sign: string) => {
        const bytes = CryptoJS.AES.decrypt(sign, CRAWLER_SIGN_SECRET);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };

    return {encrypt: encryptLoginQuery, decrypt: decryptSign};
};
