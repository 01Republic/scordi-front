import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {FcDataBackup, FcDataRecovery} from 'react-icons/fc';
import {orgIdParamState} from '^atoms/common';
import {OrgTeamMemberNewPageRoute} from '^pages/orgs/[id]/teamMembers/new';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    MethodOption,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {GoogleAdminOAuthButton} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {useGoogleLoginForWorkspaceConnect, TeamMemberCreateAutoModal} from '^clients/private/_modals/team-members';
import {ExcelIcon} from '^components/react-icons';

interface AddTeamMemberDropdownProps {
    reload: () => any;
}

export const AddTeamMemberDropdown = memo((props: AddTeamMemberDropdownProps) => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);
    const [isCreateByExcelModalOpened, setCreateByExcelModalOpened] = useState(false);
    const {setCode: setGsuiteAuthCode, resetCode: resetGsuiteAuthCode} = useGoogleLoginForWorkspaceConnect();
    const {reload} = props;

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text="구성원 추가" />

            <ListPageDropdownMenu>
                <GoogleAdminOAuthButton
                    onCode={(code) => {
                        setGsuiteAuthCode(code);
                        setCreateAutoModalOpened(true);
                    }}
                >
                    <MethodOption
                        Icon={FcDataBackup}
                        title="구성원 불러오기"
                        desc="구글워크스페이스 로그인으로 한 번에 불러와요."
                        onClick={resetGsuiteAuthCode}
                    />
                </GoogleAdminOAuthButton>
                <MethodOption
                    Icon={FcDataRecovery}
                    title="직접 추가하기"
                    desc="구성원 정보를 입력한 뒤 추가해요."
                    onClick={() => router.push(OrgTeamMemberNewPageRoute.path(orgId))}
                />
                <MethodOption
                    Icon={ExcelIcon}
                    title="엑셀로 대량 등록하기"
                    desc="템플릿에 구성원 정보를 일괄 작성한 뒤 등록해요."
                    onClick={() => setCreateByExcelModalOpened(true)}
                />
            </ListPageDropdownMenu>

            <TeamMemberCreateAutoModal
                isOpened={isCreateAutoModalOpened}
                onClose={() => setCreateAutoModalOpened(false)}
                onCreate={() => {
                    toast.success('구성원을 모두 불러왔어요.');
                    setCreateAutoModalOpened(false);
                    return reload();
                }}
                onRetry={() => setCreateAutoModalOpened(true)}
            />
        </ListPageDropdown>
    );
});
