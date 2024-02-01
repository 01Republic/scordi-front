import {memo} from 'react';
import {MembershipTableRow} from '^v3/V3OrgSettingsMembersPage/MembershipTableRow';
import {useMembershipInMembershipTable} from '^models/Membership/hook';
import {MembershipDto} from '^models/Membership/types';

export const MembershipTable = memo(() => {
    const {result: membershipSearchResult} = useMembershipInMembershipTable();
    const members = membershipSearchResult.items;

    // 생성일 기준 역순으로 정렬하는 함수
    const sortByCreatedAtDescending = (members: MembershipDto[]) => {
        const newMembers = [...members];
        return newMembers.sort((a, b) => {
            const dateA: number = new Date(a.createdAt).valueOf();
            const dateB: number = new Date(b.createdAt).valueOf();

            return dateB - dateA;
        });
    };

    const sortedMembers = sortByCreatedAtDescending(members);

    return (
        <div className="card bg-white">
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
                        {sortedMembers.map((member, i) => (
                            <MembershipTableRow member={member} key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
