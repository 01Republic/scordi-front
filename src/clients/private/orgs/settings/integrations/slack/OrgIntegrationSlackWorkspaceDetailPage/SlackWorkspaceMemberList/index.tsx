import {memo} from 'react';
import {useSlackWorkspaceInDetailPage} from '^models/integration/IntegrationSlackWorkspace/hook';
import {useIdParam} from '^atoms/common';
import {useQuery} from '@tanstack/react-query';
import {integrationSlackMemberApi} from '^models/integration/IntegrationSlackMember/api';
import {useSlackMembersInDetailPage} from '^models/integration/IntegrationSlackMember/hook';
import {NextImage} from '^components/NextImage';
import {unitFormat} from '^utils/number';
import {ChevronDown, X} from 'lucide-react';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {SlackWorkspaceMemberRow} from '^clients/private/orgs/settings/integrations/slack/OrgIntegrationSlackWorkspaceDetailPage/SlackWorkspaceMemberList/SlackWorkspaceMemberRow';

interface SlackWorkspaceMemberListProps {
    //
}

export const SlackWorkspaceMemberList = memo((props: SlackWorkspaceMemberListProps) => {
    const {} = props;
    const orgId = useIdParam('id');
    const workspaceId = useIdParam('slackWorkspaceId');
    // const {data: workspace} = useSlackWorkspaceInDetailPage();
    const {data: result, refetch} = useSlackMembersInDetailPage({
        relations: ['teamMember'],
        order: {isDeleted: 'ASC', id: 'DESC'},
        itemsPerPage: 0,
    });

    console.log('result', result);
    const {items, pagination} = result;
    const {totalItemCount} = pagination;

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mt-8">
            {/* Panel Head */}
            <div className="py-3 px-6 bg-gray-100/50 border-b border-gray-200">
                <div className="flex items-center">
                    <div className="font-semibold text-12">MEMBERS in slack</div>
                    <div className="text-14 mx-2">&middot;</div>
                    <div className="text-12">총 {unitFormat(totalItemCount, '명')}</div>
                </div>
            </div>

            {/* Panel Body */}
            <div className="flex flex-col">
                {items.map((item, i) => (
                    <SlackWorkspaceMemberRow key={i} item={item} reload={() => refetch()} />
                ))}
            </div>
        </div>
    );
});
SlackWorkspaceMemberList.displayName = 'SlackWorkspaceMemberList';
