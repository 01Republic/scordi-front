import {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {Avatar} from '^components/Avatar';
import {useCurrentUser} from '^models/User/hook';
import {useCurrentUserMemberships} from '^models/Membership/hook';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {MembershipManager} from '^models/Membership/manager';
import {OrganizationDto} from '^models/Organization/type';
import {LinkTo} from '^components/util/LinkTo';
import {ChevronDown} from 'lucide-react';

export const TopNavOrgSelect = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {currentUserMembership} = useCurrentUser(null, {
        orgIdParam: 'orgId',
    });
    const {currentUserMemberships: myMemberships} = useCurrentUserMemberships();
    const [organizations, setOrganizations] = useState<OrganizationDto[]>([]);

    useEffect(() => {
        if (!currentOrg) return;
        setOrganizations(MembershipManager.init(myMemberships).organizations());
    }, [currentOrg, myMemberships]);

    if (!currentOrg || !currentUserMembership || !myMemberships) return <></>;

    const hasMultiOrg = organizations.length > 1;

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <label
                tabIndex={0}
                className={`btn btn-sm items-center justify-between cursor-pointer gap-2 ${
                    !hasMultiOrg
                        ? 'btn-outline !border-slate-300 !text-slate-400 hover:!border-slate-400 hover:!text-slate-500 !bg-base-100 !no-animation'
                        : ''
                }`}
            >
                <span>{currentOrg.name}</span>
                {hasMultiOrg && <ChevronDown />}
            </label>

            {hasMultiOrg && (
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52 max-h-[200px] overflow-y-auto flex-row items-stretch justify-items-stretch"
                >
                    {[...organizations].reverse().map((org, i) => {
                        const isCurrent = org.id === currentOrg.id;
                        return (
                            <li key={i} className="w-full">
                                <LinkTo
                                    href={V3OrgHomePageRoute.path(org.id)}
                                    className={`text-sm !normal-case flex gap-2 py-2 ${
                                        isCurrent ? 'bg-scordi-light-100' : 'bg-base-100'
                                    } font-[500] text-gray-700 hover:text-scordi`}
                                >
                                    <Avatar className="w-5" src={org.image} />
                                    <span>{org.name}</span>
                                </LinkTo>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
});
