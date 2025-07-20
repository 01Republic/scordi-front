import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {OrgTeamMemberNewPageRoute} from '^pages/orgs/[id]/teamMembers/new';
import {
    ListPageDropdown,
    ListPageDropdownButton,
    ListPageDropdownMenu,
    MethodOption,
} from '^clients/private/_layouts/_shared/ListPageMainDropdown';
import {GoogleAdminOAuthButton} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {
    useGoogleLoginForWorkspaceConnect,
    TeamMemberCreateAutoModal,
    TeamMemberCreateByExcelModal,
} from '^clients/private/_modals/team-members';
import {Database, DatabaseBackup, FileSpreadsheet} from 'lucide-react';
import {useTranslation} from 'next-i18next';

interface AddTeamMemberDropdownProps {
    reload: () => any;
}

export const AddTeamMemberDropdown = memo((props: AddTeamMemberDropdownProps) => {
    const {t} = useTranslation('members');
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);
    const [isCreateByExcelModalOpened, setCreateByExcelModalOpened] = useState(false);
    const {setCode: setGsuiteAuthCode, resetCode: resetGsuiteAuthCode} = useGoogleLoginForWorkspaceConnect();
    const {reload} = props;

    return (
        <ListPageDropdown>
            <ListPageDropdownButton text={t('addMember.dropdown.title') as string} />

            <ListPageDropdownMenu>
                <GoogleAdminOAuthButton
                    onCode={(code) => {
                        setGsuiteAuthCode(code);
                        setCreateAutoModalOpened(true);
                    }}
                >
                    <MethodOption
                        Icon={Database}
                        title={t('addMember.dropdown.loadFromGoogle.title') as string}
                        desc={t('addMember.dropdown.loadFromGoogle.desc') as string}
                        onClick={resetGsuiteAuthCode}
                    />
                </GoogleAdminOAuthButton>
                <MethodOption
                    Icon={DatabaseBackup}
                    title={t('addMember.dropdown.addManually.title') as string}
                    desc={t('addMember.dropdown.addManually.desc') as string}
                    onClick={() => router.push(OrgTeamMemberNewPageRoute.path(orgId))}
                />
                <MethodOption
                    Icon={FileSpreadsheet}
                    title={t('addMember.dropdown.addByExcel.title') as string}
                    desc={t('addMember.dropdown.addByExcel.desc') as string}
                    onClick={() => setCreateByExcelModalOpened(true)}
                />
            </ListPageDropdownMenu>

            <TeamMemberCreateAutoModal
                isOpened={isCreateAutoModalOpened}
                onClose={() => setCreateAutoModalOpened(false)}
                onCreate={() => {
                    toast.success(t('addMember.modal.success') as string);
                    setCreateAutoModalOpened(false);
                    return reload();
                }}
                onRetry={() => setCreateAutoModalOpened(true)}
            />

            <TeamMemberCreateByExcelModal
                isOpened={isCreateByExcelModalOpened}
                onClose={() => setCreateByExcelModalOpened(false)}
                onCreate={() => {
                    setCreateByExcelModalOpened(false);
                    return reload();
                }}
            />
        </ListPageDropdown>
    );
});
