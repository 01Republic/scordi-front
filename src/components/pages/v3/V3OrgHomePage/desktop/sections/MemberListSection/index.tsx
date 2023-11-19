import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {currentOrgAtom} from '^models/Organization/atom';
import {useTeamMembers} from '^models/TeamMember/hook';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {Section} from '../../Section';
import {MoreButton} from '../../MoreButton';
import {MemberItem} from './MemberItem';
import {AddMemberItem} from './AddMemberItem';
import {MemberLoading} from './MemberLoading';

export const MemberListSection = memo(function MemberListSection() {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {safePath} = useSafePathInCurrentOrg();
    const {search: getTeamMembers, result: teamMembers, isLoading} = useTeamMembers();

    useEffect(() => {
        if (!currentOrg) return;
        getTeamMembers({
            relations: ['membership', 'membership.user', 'organization', 'teams', 'teams.subscriptions'],
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    }, [currentOrg]);

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
            {/* 가로로 카드 리스트 있고 오른쪽 끝에 더보기 */}
            <div className="w-full flex gap-2 items-stretch min-h-[168px]">
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