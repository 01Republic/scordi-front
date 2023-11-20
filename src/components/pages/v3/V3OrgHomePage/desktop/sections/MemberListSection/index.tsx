import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {useTeamMembers} from '^models/TeamMember/hook';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {Section} from '../../Section';
import {MoreButton} from '../../MoreButton';
import {MemberItem} from './MemberItem';
import {AddMemberItem} from './AddMemberItem';
import {MemberLoading} from './MemberLoading';
import {orgIdParamState} from '^atoms/common';

export const MemberListSection = memo(function MemberListSection() {
    const orgId = useRecoilValue(orgIdParamState);
    const {search: getTeamMembers, result: teamMembers, isLoading} = useTeamMembers();
    const {safePath} = useSafePathInCurrentOrg();

    useEffect(() => {
        if (!orgId || isNaN(orgId)) return;
        getTeamMembers({
            relations: ['membership', 'membership.user', 'organization', 'teams', 'teams.subscriptions'],
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    }, [orgId]);

    return (
        <Section
            title={
                <>
                    등록된 멤버{' '}
                    <span className="text-black">
                        <b>{teamMembers.items.length}</b>명
                    </span>
                </>
            }
            titleButtons={[
                <MoreButton href={safePath((org) => V3OrgTeamMembersPageRoute.path(org.id))} text="전체보기" />,
            ]}
        >
            <div className="w-full flex gap-2 items-stretch min-h-[168px] overflow-x-auto mb-[-2rem] mx-[-1rem] px-[1rem] pb-[2rem]">
                <AddMemberItem />
                {isLoading ? (
                    <MemberLoading />
                ) : (
                    teamMembers.items.map((member, i) => <MemberItem member={member} key={i} />)
                )}
            </div>
        </Section>
    );
});
