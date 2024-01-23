import {accountListAtom, accountsOfSubscriptionAtom} from '^models/Account/atom';
import {AccountDto, FindAllAccountsQueryDto} from '^models/Account/types';
import {accountApi} from '^models/Account/api';
import {LoginDto} from '^types/crawler';
import CryptoJS from 'crypto-js';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';

export const useAccounts = () => useAccountsV3(accountListAtom);

// 구독상세모달에서, 해당 구독에 연결된 계정 리스트를 보여줄 때 사용
export const useAccountsOfSubscriptionAtom = () => useAccountsV3(accountsOfSubscriptionAtom);

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

const useAccountsV3 = (atoms: PagedResourceAtoms<AccountDto, FindAllAccountsQueryDto>) => {
    const {search, ...methods} = usePagedResource(atoms, {
        endpoint: (params, orgId) => accountApi.index(orgId, params),
        useOrgId: true,
        getId: 'id',
        mergeMode: false,
    });

    function fetchAllAccountsBy(where: FindAllAccountsQueryDto['where'], force = false) {
        return search({relations: ['product'], where, itemsPerPage: 0}, force);
    }

    return {search, ...methods, fetchAllAccountsBy};
};
