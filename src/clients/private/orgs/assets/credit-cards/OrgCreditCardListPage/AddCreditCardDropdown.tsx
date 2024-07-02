import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    ListPageDropdownMenuItem,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';

export const AddCreditCardDropdown = memo(function AddCreditCardDropdown() {
    const orgId = useRecoilValue(orgIdParamState);

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text="카드 추가하기" />

            <ListPageDropdownMenu>
                <ListPageDropdownMenuItem>1</ListPageDropdownMenuItem>
                <ListPageDropdownMenuItem>2</ListPageDropdownMenuItem>
            </ListPageDropdownMenu>
        </ListPageDropdown>
    );
});
