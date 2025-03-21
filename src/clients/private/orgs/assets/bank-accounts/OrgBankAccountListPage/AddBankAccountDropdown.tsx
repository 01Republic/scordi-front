import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {OrgBankAccountNewPageRoute} from '^pages/orgs/[id]/bankAccounts/new';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    MethodOption,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {CardAutoCreateModal} from '^clients/private/_modals/credit-cards';
import {Database, DatabaseBackup} from 'lucide-react';

interface AddBankAccountDropdownProps {
    reload: () => any;
}

export const AddBankAccountDropdown = memo((props: AddBankAccountDropdownProps) => {
    const {reload} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text="계좌 추가" />

            <ListPageDropdownMenu>
                {/* TODO: 공동인증서로 불러오기 기능 완료시 복구 */}
                {/*<MethodOption*/}
                {/*    Icon={Database}*/}
                {/*    title="이체내역 불러오기"*/}
                {/*    desc="공동인증서로 간편하게 불러와요."*/}
                {/*    onClick={() => setIsCardAutoCreateModalOpen(true)}*/}
                {/*/>*/}

                <MethodOption
                    Icon={DatabaseBackup}
                    title="직접 입력하기"
                    desc="계좌 정보를 입력한 뒤 추가해요."
                    onClick={() => router.push(OrgBankAccountNewPageRoute.path(orgId))}
                />
            </ListPageDropdownMenu>

            <CardAutoCreateModal
                isOpened={isCardAutoCreateModalOpen}
                onClose={() => setIsCardAutoCreateModalOpen(false)}
                onCreate={() => {
                    setIsCardAutoCreateModalOpen(false);
                    return reload();
                }}
            />
        </ListPageDropdown>
    );
});
