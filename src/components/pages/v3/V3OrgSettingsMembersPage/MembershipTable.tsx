import {memo} from 'react';
import {MembershipTableRow} from '^v3/V3OrgSettingsMembersPage/MembershipTableRow';
import {useTeamMembers} from '^models/TeamMember/hook';
import {TeamMemberDto} from '^models/TeamMember/type';

export const MembershipTable = memo(() => {
    const {result} = useTeamMembers();
    const teamMembers = result.items;

    // 생성일 기준 역순으로 정렬하는 함수
    const sortByCreatedAtDescending = (teamMembers: TeamMemberDto[]) => {
        const newTeamMembers = [...teamMembers];
        return newTeamMembers.sort((a, b) => {
            const dateA: number = new Date(a.createdAt).valueOf();
            const dateB: number = new Date(b.createdAt).valueOf();

            return dateB - dateA;
        });
    };

    const sortedTeamMembers = sortByCreatedAtDescending(teamMembers);

    return (
        <div className="w-full inline-grid">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="bg-base-100">이름</th>
                            <th className="bg-base-100">팀</th>
                            <th className="bg-base-100">권한</th>
                            <th className="bg-base-100">상태</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedTeamMembers.map((teamMember, i) => (
                            <MembershipTableRow teamMember={teamMember} key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
