import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {orgIdParamState} from '^atoms/common';
import {OrgTeamMemberNewPageRoute} from '^pages/orgs/[id]/teamMembers/new';
import {
    TeamMemberCreateAutoModal,
    TeamMemberCreateByExcelModal,
    TeamMemberCreateMethodModal,
} from '^clients/private/_modals/team-members';
import {QuickButton} from './QuickButton';

export const AddTeamMemberButton = memo(function AddTeamMemberButton() {
    const orgId = useRecoilValue(orgIdParamState);
    const router = useRouter();
    const [isTeamMemberCreateModalOpened, setIsTeamMemberCreateModalOpened] = useState(false);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);
    const [isCreateByExcelModalOpened, setCreateByExcelModalOpened] = useState(false);

    return (
        <>
            <QuickButton
                text="구성원 추가"
                Icon={() => <AiOutlineUserAdd />}
                onClick={() => setIsTeamMemberCreateModalOpened(true)}
            />

            {/*구성원 추가*/}
            <TeamMemberCreateMethodModal
                isOpened={isTeamMemberCreateModalOpened}
                onClose={() => setIsTeamMemberCreateModalOpened(false)}
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
                    toast.success('구성원을 모두 불러왔어요.');
                    setCreateAutoModalOpened(false);
                }}
                onRetry={() => setCreateAutoModalOpened(true)}
            />

            <TeamMemberCreateByExcelModal
                isOpened={isCreateByExcelModalOpened}
                onClose={() => setCreateByExcelModalOpened(false)}
                onCreate={() => {
                    setCreateByExcelModalOpened(false);
                }}
            />
        </>
    );
});
