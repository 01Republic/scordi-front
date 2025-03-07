import {memo, useEffect} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {Dropdown} from '^v3/share/Dropdown';
import {useCurrentOrg2} from '^models/Organization/hook';
import {useCurrentUser} from '^models/User/hook';
import {useMembershipInHeader} from '^models/Membership/hook';
import {LoadableBox} from '^components/util/loading';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {ChevronDown} from 'lucide-react';

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

    if (result.pagination.totalItemCount === 1) {
        return (
            <div className="font-medium cursor-default flex items-center gap-0.5">
                <span>{currentOrg?.name}</span>
            </div>
        );
    }

    return (
        <Dropdown
            placement="bottom-start"
            backdrop={false}
            Trigger={({visible}) => (
                <div className="font-medium cursor-pointer flex items-center gap-0.5">
                    <span>{currentOrg?.name}</span>
                    <ChevronDown size={10} strokeWidth={20} />
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
                                            className={`hover:bg-scordi-50 hover:text-scordi-600 ${
                                                isCurrent ? 'bg-scordi-50 text-scordi-600' : 'cursor-pointer'
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
