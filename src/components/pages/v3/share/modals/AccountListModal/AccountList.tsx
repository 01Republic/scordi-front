import React, {memo, useEffect} from 'react';
import {AccountDto} from '^models/Account/types';
import {AccountItem} from './AccountItem';
import {useRecoilState, useRecoilValue} from 'recoil';
import {accountListAtom, getAccountsQuery} from '^models/Account/atom';

interface AccountListProps {
    accounts?: AccountDto[];
    hideProduct?: boolean;
}

export const AccountList = memo((props: AccountListProps) => {
    const {hideProduct = false} = props;
    const accounts = useRecoilValue(getAccountsQuery);
    const [accountList, setAccountList] = useRecoilState(accountListAtom);

    useEffect(() => {
        if (accountList.length || !accounts) return;

        setAccountList(accounts.items);
    }, [accounts, accountList]);

    return (
        <ul className="w-full text-left py-4">
            {accountList?.length ? (
                accountList.map((account, i) => <AccountItem key={i} account={account} hideProduct={hideProduct} />)
            ) : (
                <li className="flex items-center justify-center h-52">
                    <div className="text-center no-selectable">
                        <p>아직 보관중인 계정이 없네요</p>
                        <p>계정을 안전하게 보관하고 공유해보세요</p>
                    </div>
                </li>
            )}
        </ul>
    );
});
