import { useOrgIdParam } from '^atoms/common';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    MethodOption,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import { OrgAssetsConnectPageRoute } from '^pages/orgs/[id]/assets/connect';
import { OrgConnectManualPageRoute } from '^pages/orgs/[id]/assets/connect/manual';
import { Database, DatabaseBackup } from 'lucide-react';
import { useRouter } from 'next/router';
import { memo } from 'react';

export const AddAssetDropdown = memo(() => {
    const router = useRouter();
    const orgId = useOrgIdParam();

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text="자산 추가" />

            <ListPageDropdownMenu>
                <MethodOption
                    Icon={Database}
                    title="자산내역 불러오기"
                    desc="은행, 카드사 로그인으로 한 번에 불러와요"
                    onClick={() => router.push(OrgAssetsConnectPageRoute.path(orgId))}
                />

                <MethodOption
                    Icon={DatabaseBackup}
                    title="직접 추가하기"
                    desc="자산 정보를 입력한 뒤 추가해요"
                    onClick={() => router.push(OrgConnectManualPageRoute.path(orgId))}
                />
            </ListPageDropdownMenu>
        </ListPageDropdown>
    );
});

AddAssetDropdown.displayName = 'AddAssetDropdown';
