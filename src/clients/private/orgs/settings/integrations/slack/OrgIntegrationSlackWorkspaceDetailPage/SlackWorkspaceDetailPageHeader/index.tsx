import React, {memo} from 'react';
import {NextImage} from '^components/NextImage';
import SlackLogo from '^public/logo/icons/ic_slack.png';
import {ChevronLeft} from 'lucide-react';
import {useRouter} from 'next/router';
import {useSlackWorkspaceInDetailPage} from '^models/integration/IntegrationSlackWorkspace/hook';
import {useSlackMembersInDetailPage} from '^models/integration/IntegrationSlackMember/hook';
import {SlackWorkspaceMembersSyncButton} from '^clients/private/orgs/settings/integrations/slack/OrgIntegrationSlackWorkspaceDetailPage/SlackWorkspaceDetailPageHeader/SlackWorkspaceMembersSyncButton';

interface SlackWorkspaceDetailPageHeaderProps {
    //
}

export const SlackWorkspaceDetailPageHeader = memo((props: SlackWorkspaceDetailPageHeaderProps) => {
    const {} = props;
    const router = useRouter();
    const {data: workspace} = useSlackWorkspaceInDetailPage();
    const {refetch} = useSlackMembersInDetailPage({
        relations: ['teamMember'],
        order: {isDeleted: 'ASC', id: 'DESC'},
        itemsPerPage: 0,
    });

    return (
        <div className="flex items-center">
            {/* Back button */}
            <div
                className="mr-4 text-gray-400 hover:text-gray-900 transition-all cursor-pointer"
                onClick={() => router.back()}
            >
                <ChevronLeft fontSize={20} className="" />
            </div>

            {/* Left-side contents */}
            <div className="flex-1">
                {/* Profile */}
                <div className="flex items-center gap-3">
                    {/* logo */}
                    <div className="relative w-10 h-10 max-w-[60px] max-h-[60px]">
                        <NextImage src={SlackLogo} alt="slack logo" />
                    </div>

                    {/* info */}
                    <div>
                        {/* service name */}
                        <div className="flex items-center gap-2.5">
                            {/* service name */}
                            <h2 className="leading-none">Slack</h2>

                            {/* connect status */}
                            <div></div>
                        </div>

                        {/* workspace name */}
                        <div className="text-gray-500">{workspace?.workspaceName}</div>
                    </div>
                </div>
            </div>

            {/* Right-side button group */}
            <div>
                <div>
                    <SlackWorkspaceMembersSyncButton workspace={workspace} reload={() => refetch()} />
                </div>
            </div>
        </div>
    );
});
SlackWorkspaceDetailPageHeader.displayName = 'SlackWorkspaceDetailPageHeader';
