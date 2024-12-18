import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {FaPlus} from 'react-icons/fa6';
import {toast} from 'react-hot-toast';
import {orgIdParamState} from '^atoms/common';
import {TeamMemberCreateMethodModal, TeamMemberCreateAutoModal} from '^clients/private/_modals/team-members';
import {OrgTeamMemberNewPageRoute} from '^pages/orgs/[id]/teamMembers/new';

interface AddTeamMemberModalProps {
    reload: () => any;
}

export const AddTeamMemberModal = memo((props: AddTeamMemberModalProps) => {
    const {reload} = props;
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);
    const [isCreateMethodModalOpened, setCreateMethodModalOpened] = useState(false);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);

    return (
        <>
            <button
                tabIndex={0}
                className="btn btn-scordi gap-2 mb-1 no-animation btn-animation"
                onClick={() => setCreateMethodModalOpened(true)}
            >
                <FaPlus />
                <span className="mr-1.5">구성원 추가</span>
            </button>

            <TeamMemberCreateMethodModal
                isOpened={isCreateMethodModalOpened}
                onClose={() => setCreateMethodModalOpened(false)}
                onSelect={(method) => {
                    if (method === 'auto') {
                        setCreateAutoModalOpened(true);
                    } else {
                        setCreateAutoModalOpened(false);
                        router.push(OrgTeamMemberNewPageRoute.path(orgId));
                    }
                }}
            />

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
        </>
    );
});
