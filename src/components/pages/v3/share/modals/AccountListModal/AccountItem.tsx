import React, {memo} from 'react';
import {AccountDto} from '^types/account.type';

interface AccountItemProps {
    account: AccountDto;
}

export const AccountItem = memo((props: AccountItemProps) => {
    const {account} = props;

    return (
        <li className="flex gap-4 mb-4 px-0 py-1 cursor-pointer">
            <p>fds</p>
        </li>
    );
});
