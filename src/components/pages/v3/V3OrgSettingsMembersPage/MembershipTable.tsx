import {memo} from 'react';
import {MembershipTableRow} from '^v3/V3OrgSettingsMembersPage/MembershipTableRow';
import {useTeamMembers} from '^models/TeamMember/hook';

export const MembershipTable = memo(() => {
    const {result} = useTeamMembers();
    const teamMembers = result.items;

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
                        {teamMembers.map((teamMember, i) => (
                            <MembershipTableRow teamMember={teamMember} key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
