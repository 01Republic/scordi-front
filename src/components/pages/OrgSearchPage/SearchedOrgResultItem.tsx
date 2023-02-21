import React, {memo, useEffect} from 'react';
import {MembershipLevel} from '^types/membership.type';
import {JoinOrgRoute} from '^pages/orgs/joinOrg';
import {createMembership} from '^api/membership.api';
import {errorNotify} from '^utils/toast-notify';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {OrganizationDto} from '^types/organization.type';
import {orgIdParamState} from '^atoms/common';
import {useRecoilState, useSetRecoilState} from 'recoil';

interface SearchedOrgResultItemProps {
    org: OrganizationDto;
}

export const SearchedOrgResultItem = memo((props: SearchedOrgResultItemProps) => {
    const {org} = props;
    // const [orgIdParam, setOrgIdParam] = useRecoilState(orgIdParamState);
    const setOrgIdParam = useSetRecoilState(orgIdParamState);
    const router = useRouter();
    const {currentUser} = useCurrentUser(null);
    const memberships = org.memberships || [];
    const ownerMembership = memberships.find((membership) => membership.level === MembershipLevel.OWNER)!;

    const goToJoinConfirm = (org: OrganizationDto) => {
        if (!currentUser) return;

        const request = createMembership({
            organizationId: org.id,
            userId: currentUser.id,
            level: MembershipLevel.MEMBER,
        }).catch(errorNotify);

        toast
            .promise(request, {
                success: {
                    render: () => `Successfully requested!`,
                    icon: '🟢',
                },
            })
            .then(() => {
                if (org.memberships === undefined) return;
                setOrgIdParam(org.id);
                router.push(JoinOrgRoute.path());
            });
    };

    return (
        <div className="flex justify-between items-center">
            <p className="text-lg">{org.name}</p>
            <p className="text-md">{ownerMembership?.user?.email}</p>
            <button className="btn" onClick={() => goToJoinConfirm(org)}>
                join
            </button>
        </div>
    );
});
