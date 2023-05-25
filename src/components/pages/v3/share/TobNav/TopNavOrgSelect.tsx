import {memo} from 'react';
import {AiOutlineSetting} from '@react-icons/all-files/ai/AiOutlineSetting';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^atoms/organizations.atom';
import {BiChevronDown} from '@react-icons/all-files/bi/BiChevronDown';
import {Avatar} from '^components/Avatar';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {useCurrentUserMemberships} from '^hooks/useMemberships';
import {useRouter} from 'next/router';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';

export const TopNavOrgSelect = memo(() => {
    const router = useRouter();
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {currentUserMembership} = useCurrentUser(null, {
        orgIdParam: 'orgId',
    });
    const {currentUserMemberships: myMemberships} = useCurrentUserMemberships();

    if (!currentOrg || !currentUserMembership || !myMemberships) return <></>;

    const otherMemberships = myMemberships.filter((membership) => membership.organizationId !== currentOrg.id);
    const isEmpty = otherMemberships.length === 0;

    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            <label
                tabIndex={0}
                className={`btn btn-sm items-center justify-between cursor-pointer gap-2 ${
                    isEmpty ? 'btn-outline !text-gray-500 !bg-base-100 !no-animation' : ''
                }`}
            >
                <span>{currentOrg.name}</span>
                {!isEmpty && <BiChevronDown />}
            </label>

            {!isEmpty && (
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-box w-52">
                    {otherMemberships.map((membership, i) => {
                        const org = membership.organization;
                        return (
                            <li key={i}>
                                <a
                                    className="text-sm flex gap-2 py-2 bg-base-100 font-[500] text-gray-700 hover:text-scordi"
                                    onClick={() => router.push(V3OrgHomePageRoute.path(org.id))}
                                >
                                    <Avatar className="w-5" src={org.image} />
                                    <span>{org.name}</span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
});
