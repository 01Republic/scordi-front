import {memo} from 'react';
import {useMemberships} from '^models/Membership/hook';
import {MembershipTableRow} from '^v3/V3OrgSettingsMembersPage/MembershipTableRow';

export const MembershipTable = memo(() => {
    const {membershipSearchResult} = useMemberships();
    const {items} = membershipSearchResult;

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
                        {items.map((membership, i) => (
                            <MembershipTableRow membership={membership} key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
