import React, {memo, useState} from 'react';
import {useRouter} from 'next/router';
import {useOrgIdParam} from '^atoms/common';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    MethodOption,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {OrgCreditCardNewPageRoute} from '^pages/orgs/[id]/creditCards/new';
import {CardAutoCreateModal} from '^clients/private/_modals/credit-cards';
import {Database, DatabaseBackup} from 'lucide-react';

interface AddCreditCardDropdownProps {
    reload: () => any;
}

export const AddCreditCardDropdown = memo((props: AddCreditCardDropdownProps) => {
    const {reload} = props;
    const router = useRouter();
    const orgId = useOrgIdParam();
    const [isCardAutoCreateModalOpen, setIsCardAutoCreateModalOpen] = useState(false);

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text="카드 추가" />

            <ListPageDropdownMenu>
                <MethodOption
                    Icon={Database}
                    title="결제내역 불러오기"
                    desc="카드사 로그인으로 한 번에 불러와요"
                    onClick={() => setIsCardAutoCreateModalOpen(true)}
                />

                <MethodOption
                    Icon={DatabaseBackup}
                    title="직접 추가하기"
                    desc="카드 정보를 입력한 뒤 추가해요"
                    onClick={() => router.push(OrgCreditCardNewPageRoute.path(orgId))}
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
