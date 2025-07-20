import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {
    TeamMemberCreateMethodModal,
    TeamMemberCreateAutoModal,
    TeamMemberCreateByExcelModal,
} from '^clients/private/_modals/team-members';
import {OrgTeamMemberNewPageRoute} from '^pages/orgs/[id]/teamMembers/new';
import {Plus} from 'lucide-react';
import {useTranslation} from 'next-i18next';

interface AddTeamMemberModalProps {
    reload: () => any;
}

export const AddTeamMemberModal = memo((props: AddTeamMemberModalProps) => {
    const {t} = useTranslation('members');
    const {reload} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isCreateMethodModalOpened, setCreateMethodModalOpened] = useState(false);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);
    const [isCreateByExcelModalOpened, setCreateByExcelModalOpened] = useState(false);

    return (
        <>
            <button
                tabIndex={0}
                className="btn btn-scordi gap-2 mb-1 no-animation btn-animation"
                onClick={() => setCreateMethodModalOpened(true)}
            >
                <Plus />
                <span className="mr-1.5">{t('list.addMember') as string}</span>
            </button>

            <TeamMemberCreateMethodModal
                isOpened={isCreateMethodModalOpened}
                onClose={() => setCreateMethodModalOpened(false)}
                onSelect={(method) => {
                    switch (method) {
                        case 'auto':
                            return setCreateAutoModalOpened(true);
                        case 'manual':
                            setCreateAutoModalOpened(false);
                            return router.push(OrgTeamMemberNewPageRoute.path(orgId));
                        case 'by-excel':
                            return setCreateByExcelModalOpened(true);
                        default:
                            return;
                    }
                }}
            />

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
        </>
    );
});
