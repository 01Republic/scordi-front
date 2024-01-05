import {memo} from 'react';
import {TeamMemberManager, useTeamMembers} from '^models/TeamMember';
import {TeamMemberTableRow} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/TeamMemberTableSection/TaemMemberTable/TeamMemberTableRow';

export const TeamMemberTable = memo(() => {
    const {result, reload} = useTeamMembers();
    const teamMembers = result.items;
    const teamMemberManager = TeamMemberManager.init(teamMembers);
    const sortedTeamMembers = teamMemberManager.sortByCreatedAtDescending(teamMembers);

    return (
        <div className="card bg-white shadow">
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="bg-base-100">멤버</th>
                            {/* 이용 앱 수 */}
                            <th className="bg-base-100"></th>
                            {/* 팀 */}
                            <th className="bg-base-100">팀</th>
                            {/* 권한 */}
                            <th className="bg-base-100"></th>
                            {/* 상태 */}
                            <th className="bg-base-100"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedTeamMembers.map((teamMember, i) => (
                            <TeamMemberTableRow key={i} teamMember={teamMember} reload={reload} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
