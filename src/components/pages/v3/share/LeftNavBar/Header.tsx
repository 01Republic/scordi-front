import {memo, useEffect, useState} from 'react';
import {GrFormDown} from 'react-icons/gr';
import {useRecoilValue} from 'recoil';
import Link from 'next/link';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {currentOrgAtom} from '^models/Organization/atom';
import {currentUserAtom} from '^models/User/atom';
import {MembershipDto} from '^models/Membership/type';
import {membershipApi} from '^models/Membership/api';

const DownIcon = memo(() => {
    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polyline fill="none" stroke="#9b9b9b" strokeWidth="2" points="18 9 12 15 6 9" />
        </svg>
    );
});

export const Header = memo(function Header() {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const currentUser = useRecoilValue(currentUserAtom);
    const [myMemberships, setMemberships] = useState<MembershipDto[]>([]);

    useEffect(() => {
        if (!currentOrg || !currentUser) return;

        membershipApi
            .index({
                where: {userId: currentUser.id, organizationId: currentOrg.id},
                itemsPerPage: 0,
            })
            .then((res) => {
                setMemberships(res.data.items);
            });
    }, [currentOrg, currentUser]);

    const otherMemberships = myMemberships.filter((membership) => membership.organizationId !== currentOrg?.id);
    const isEmpty = otherMemberships.length === 0;

    return (
        <section className="border-b">
            <div className="px-5 dropdown dropdown-end dropdown-hover w-full">
                <label tabIndex={0} className={`block py-3 ${isEmpty ? '' : 'cursor-pointer'}`}>
                    <span className="block text-xs text-gray-400">워크스페이스</span>
                    <span className="flex items-center justify-between">
                        <span className="font-semibold">{currentOrg?.name}</span>
                        {!isEmpty && <DownIcon />}
                    </span>
                </label>

                {!isEmpty && (
                    <ul tabIndex={0} className="dropdown-content menu w-full p-2 shadow bg-base-100 rounded-box">
                        {otherMemberships.map((membership, i) => {
                            const org = membership.organization;
                            const isCurrent = org.id === currentOrg?.id;
                            return (
                                <li key={i}>
                                    <Link href={V3OrgHomePageRoute.path(org.id)}>
                                        <a>{org.name}</a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
});
