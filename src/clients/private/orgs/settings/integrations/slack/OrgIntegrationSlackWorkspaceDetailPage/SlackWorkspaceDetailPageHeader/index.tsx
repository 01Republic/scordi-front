import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {ChevronLeft} from 'lucide-react';
import SlackLogo from '^public/logo/icons/ic_slack.png';
import {NextImage} from '^components/NextImage';
import {useSlackWorkspaceInDetailPage} from '^models/integration/IntegrationSlackWorkspace/hook';
import {useSlackMembersInDetailPage} from '^models/integration/IntegrationSlackMember/hooks';
import {SlackWorkspaceMembersSyncButton} from './SlackWorkspaceMembersSyncButton';

interface SlackWorkspaceDetailPageHeaderProps {
    //
}

export const SlackWorkspaceDetailPageHeader = memo((props: SlackWorkspaceDetailPageHeaderProps) => {
    const {} = props;
    const router = useRouter();
    const {data: workspace} = useSlackWorkspaceInDetailPage();
    const {refetch} = useSlackMembersInDetailPage();

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
            <div className="flex items-center gap-3">
                <div>
                    <div className="text-gray-400 text-14 font-medium" onClick={() => console.log(workspace)}>
                        ID: {workspace?.uid}
                    </div>
                </div>
                <div>
                    <SlackWorkspaceMembersSyncButton workspace={workspace} reload={() => refetch()} />
                </div>
            </div>
        </div>
    );
});
SlackWorkspaceDetailPageHeader.displayName = 'SlackWorkspaceDetailPageHeader';
