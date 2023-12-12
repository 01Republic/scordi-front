import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {currentUserAtom} from '^models/User/atom';
import {MembershipDto} from 'src/models/Membership/types';
import {membershipApi} from '^models/Membership/api';
import {OrganizationDto} from '^models/Organization/type';
import {MembershipManager} from '^models/Membership/manager';
import {SelectOrgItem} from './SelectOrgItem';

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
    const [organizations, setOrganizations] = useState<OrganizationDto[]>([]);

    useEffect(() => {
        if (!currentOrg || !currentUser) return;

        membershipApi
            .index({
                where: {userId: currentUser.id},
                itemsPerPage: 0,
            })
            .then((res) => {
                setMemberships(res.data.items);
            });
    }, [currentOrg, currentUser]);

    useEffect(() => {
        if (!currentOrg) return;
        setOrganizations(MembershipManager.init(myMemberships).organizations());
    }, [currentOrg, myMemberships]);

    const hasMultiOrg = organizations.length > 1;

    return (
        <section className="border-b">
            <div className="px-5 dropdown dropdown-end dropdown-hover w-full">
                <label tabIndex={0} className={`block py-3 ${hasMultiOrg ? '' : 'cursor-pointer'}`}>
                    <span className="block text-xs text-gray-400">워크스페이스</span>
                    <span className="flex items-center justify-between">
                        <span className="font-semibold">
                            {currentOrg ? (
                                currentOrg.name
                            ) : (
                                <span className="block h-4 bg-slate-200 rounded w-[80px] animate-pulse">&nbsp;</span>
                            )}
                        </span>
                        {hasMultiOrg && <DownIcon />}
                    </span>
                </label>

                {hasMultiOrg && (
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu w-full p-2 shadow-xl bg-base-100 rounded-box w-52 max-h-[210px] overflow-y-auto flex-row"
                    >
                        {[...organizations].reverse().map((org, i) => {
                            return <SelectOrgItem key={i} org={org} isCurrent={org.id === currentOrg?.id} />;
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
});
