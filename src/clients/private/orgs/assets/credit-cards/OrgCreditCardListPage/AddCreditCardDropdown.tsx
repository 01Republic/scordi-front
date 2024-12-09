import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {FcDataBackup, FcDataRecovery} from 'react-icons/fc';
import {orgIdParamState} from '^atoms/common';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    MethodOption,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {isCardAutoCreateModalAtom} from './atom';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';

export const AddCreditCardDropdown = memo(function AddCreditCardDropdown() {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const setIsCardAutoCreateModalOpen = useSetRecoilState(isCardAutoCreateModalAtom);

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text="카드 추가" />

            <ListPageDropdownMenu>
                <MethodOption
                    Icon={FcDataBackup}
                    title="결제내역 불러오기"
                    desc="카드사 로그인으로 한 번에 불러와요"
                    onClick={() => setIsCardAutoCreateModalOpen(true)}
                />

                <MethodOption
                    Icon={FcDataRecovery}
                    title="직접 추가하기"
                    desc="카드 정보를 입력한 뒤 추가해요"
                    onClick={() => router.push(OrgCreditCardNewPageRoute.path(orgId))}
                />
            </ListPageDropdownMenu>
        </ListPageDropdown>
    );
});
