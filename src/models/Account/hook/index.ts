import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {getAccountsQueryAtom, accountsSearchResultAtom} from '^models/Account/atom';
import {AccountDto, FindAllAccountsQueryDto} from '^models/Account/types';
import {accountApi} from '^models/Account/api';
import {LoginDto} from '^types/crawler';
import CryptoJS from 'crypto-js';
import {useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {AxiosResponse} from 'axios';

export const useAccounts = () => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const [result, setResult] = useRecoilState(accountsSearchResultAtom);
    const [query, setQuery] = useRecoilState(getAccountsQueryAtom);

    async function search(params: FindAllAccountsQueryDto, force = false) {
        if (!force && JSON.stringify(query) === JSON.stringify(params)) return;

        setQuery((oldQuery) => {
            if (!force && JSON.stringify(oldQuery) === JSON.stringify(params)) return oldQuery;

            accountApi
                .index(orgId, params)
                .then((res) => res.data)
                .then((data) => {
                    setResult(data);
                });

            return params;
        });
    }

    const reload = () => search(query, true);

    const movePage = (page: number) => search({...query, page});

    function fetchAllAccountsBy(where: FindAllAccountsQueryDto['where'], force = false) {
        return search({relations: ['product'], where, itemsPerPage: 0}, force);
    }

    return {query, result, search, reload, movePage, fetchAllAccountsBy};
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
