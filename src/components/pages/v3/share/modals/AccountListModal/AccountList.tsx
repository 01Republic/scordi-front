import React, {memo} from 'react';
import {AccountDto} from '^models/Account/types';
import {AccountItem} from './AccountItem';

interface AccountListProps {
    accounts?: AccountDto[];
    hideProduct?: boolean;
}

export const AccountList = memo((props: AccountListProps) => {
    const {accounts, hideProduct = false} = props;

    return (
        <ul className="w-full text-left py-4">
            {accounts && accounts.length ? (
                accounts.map((account, i) => <AccountItem key={i} account={account} hideProduct={hideProduct} />)
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
