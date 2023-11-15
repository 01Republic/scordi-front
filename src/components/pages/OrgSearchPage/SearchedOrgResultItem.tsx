import React, {memo} from 'react';
import {MembershipLevel} from '^models/Membership/type';
import {JoinOrgRoute} from '^pages/orgs/joinOrg';
import {errorNotify} from '^utils/toast-notify';
import {useRouter} from 'next/router';
import {useCurrentUser} from '^models/User/hook';
import {OrganizationDto} from '^models/Organization/type';
import {orgIdParamState} from '^atoms/common';
import {useRecoilState, useSetRecoilState} from 'recoil';
import Swal from 'sweetalert2';
import {membershipApi} from '^models/Membership/api';

interface SearchedOrgResultItemProps {
    org: OrganizationDto;
}

export const SearchedOrgResultItem = memo((props: SearchedOrgResultItemProps) => {
    const {org} = props;
    const setOrgIdParam = useSetRecoilState(orgIdParamState);
    const {currentUser} = useCurrentUser(null);
    const router = useRouter();
    const memberships = org.memberships || [];
    const ownerMembership = memberships.find((membership) => membership.level === MembershipLevel.OWNER)!;

    const goToJoinConfirm = (org: OrganizationDto) => {
        if (!currentUser) return;

        if (currentUser.orgName === org.name) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You've already in this group",
                footer: '<a href="">go to main</a>',
            });
        } else {
            Swal.fire({
                title: 'Are you sure?',
                text: `Wanna join ${org.name}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, join it!',
            })
                .then(() => {
                    membershipApi.create({
                        organizationId: org.id,
                        userId: currentUser.id,
                        level: MembershipLevel.MEMBER,
                    });
                })
                .then(() => {
                    if (org.memberships === undefined) return;
                    setOrgIdParam(org.id);
                    router.push(JoinOrgRoute.path());
                })
                .catch(errorNotify);
        }
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
