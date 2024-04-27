import {memo, useEffect} from 'react';
import {FaChevronDown} from 'react-icons/fa6';
import {LinkTo} from '^components/util/LinkTo';
import {Dropdown} from '^v3/share/Dropdown';
import {useCurrentOrg, useCurrentOrg2} from '^models/Organization/hook';
import {useCurrentUser} from '^models/User/hook';
import {useMembershipInHeader} from '^models/Membership/hook';
import {LoadableBox} from '^components/util/loading';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {orgIdParamState} from '^atoms/common';

interface WorkspaceDropdownProps {
    //
}

export const WorkspaceDropdown = memo((props: WorkspaceDropdownProps) => {
    const {} = props;
    const {currentOrg} = useCurrentOrg2();
    const {currentUser} = useCurrentUser();
    const {search, result, isLoading} = useMembershipInHeader();

    useEffect(() => {
        if (!currentOrg || !currentUser) return;

        search({
            relations: ['organization'],
            where: {userId: currentUser.id},
            includeAdmin: true,
            itemsPerPage: 0,
            order: {id: 'DESC'},
        });
    }, [currentOrg, currentUser]);

    if (!currentOrg) return <></>;

    return (
        <Dropdown
            placement="bottom"
            backdrop={false}
            Trigger={({visible}) => (
                <div className="font-medium cursor-pointer flex items-center gap-0.5">
                    <span>{currentOrg?.name}</span>
                    <FaChevronDown size={10} strokeWidth={20} />
                </div>
            )}
            Content={({visible, show, hide}) => {
                if (!currentUser) return <></>;

                const {items, pagination} = result;

                return (
                    <LoadableBox isLoading={isLoading} noPadding loadingType={2}>
                        <ul className="p-0 text-13 shadow-xl menu dropdown-content z-[1] bg-base-100 border rounded-md max-h-[300px] block overflow-y-auto no-scrollbar">
                            {items.map((membership, i) => {
                                const orgId = membership.organizationId;
                                const orgName = membership.organization.name;
                                const orgPath = OrgMainPageRoute.path(orgId);
                                const isCurrent = orgId === currentOrg?.id;
                                return (
                                    <li key={i}>
                                        <LinkTo
                                            href={orgPath}
                                            className={`hover:bg-blue-50 hover:text-blue-600 ${
                                                isCurrent ? 'bg-blue-50 text-blue-600' : ''
                                            }`}
                                        >
                                            {orgName}
                                        </LinkTo>
                                    </li>
                                );
                            })}
                        </ul>
                    </LoadableBox>
                );
            }}
        />
    );
});
WorkspaceDropdown.displayName = 'WorkspaceDropdown';
