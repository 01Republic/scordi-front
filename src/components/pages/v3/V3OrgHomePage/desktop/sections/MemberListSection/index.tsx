import {orgIdParamState} from '^atoms/common';
import {useSafePathInCurrentOrg} from '^hooks/useSafePath';
import {useTeamMembersInDashboard} from '^models/TeamMember/hook';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {useTranslation} from 'next-i18next';
import {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {MoreButton} from '../../MoreButton';
import {Section} from '../../Section';
import {AddMemberItem} from './AddMemberItem';
import {MemberItem} from './MemberItem';
import {MemberLoading} from './MemberLoading';

export const MemberListSection = memo(function MemberListSection() {
    const orgId = useRecoilValue(orgIdParamState);
    const {safePath} = useSafePathInCurrentOrg();
    const {t} = useTranslation('common');
    const {result: teamMembers, search: getTeamMembers, isLoading} = useTeamMembersInDashboard();

    useEffect(() => {
        // first loaded.
        getTeamMembers({
            relations: ['membership', 'membership.user', 'organization', 'teams', 'subscriptions'],
            order: {id: 'DESC'},
            itemsPerPage: 10,
        });
    }, [orgId]);

    return (
        <Section
            title={
                <>
                    등록된 멤버{' '}
                    <span className="text-black">
                        <b>{teamMembers.pagination.totalItemCount.toLocaleString()}</b>명
                    </span>
                </>
            }
            titleButtons={[
                <MoreButton
                    href={safePath((org) => V3OrgTeamMembersPageRoute.path(org.id))}
                    text={t('button.viewAll')}
                />,
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
