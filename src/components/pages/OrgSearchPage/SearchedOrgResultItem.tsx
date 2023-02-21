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
import Swal from 'sweetalert2';

interface SearchedOrgResultItemProps {
    org: OrganizationDto;
}

export const SearchedOrgResultItem = memo((props: SearchedOrgResultItemProps) => {
    const {org} = props;
    const setOrgIdParam = useSetRecoilState(orgIdParamState);
    const router = useRouter();
    const {currentUser} = useCurrentUser(null);
    const memberships = org.memberships || [];
    const ownerMembership = memberships.find((membership) => membership.level === MembershipLevel.OWNER)!;

    const goToJoinConfirm = (org: OrganizationDto) => {
        if (!currentUser) return;
        console.log(currentUser);

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
