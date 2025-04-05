import {memo} from 'react';
import {useSlackWorkspaceInDetailPage} from '^models/integration/IntegrationSlackWorkspace/hook';
import {useIdParam} from '^atoms/common';
import {useQuery} from '@tanstack/react-query';
import {integrationSlackMemberApi} from '^models/integration/IntegrationSlackMember/api';
import {useSlackMembersInDetailPage} from '^models/integration/IntegrationSlackMember/hooks';
import {NextImage} from '^components/NextImage';
import {unitFormat} from '^utils/number';
import {ChevronDown, ChevronLeft, ChevronRight, X} from 'lucide-react';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import {SlackWorkspaceMemberRow} from '^clients/private/orgs/settings/integrations/slack/OrgIntegrationSlackWorkspaceDetailPage/SlackWorkspaceMemberList/SlackWorkspaceMemberRow';
import {LoadableBox} from '^components/util/loading';

interface SlackWorkspaceMemberListProps {
    //
}

export const SlackWorkspaceMemberList = memo((props: SlackWorkspaceMemberListProps) => {
    const {} = props;
    const orgId = useIdParam('id');
    const workspaceId = useIdParam('slackWorkspaceId');
    // const {data: workspace} = useSlackWorkspaceInDetailPage();
    const {data: result, isFetching, refetch, prevPage, nextPage} = useSlackMembersInDetailPage();

    console.log('result', result);
    const {items, pagination} = result;
    const {totalItemCount, totalPage, currentPage} = pagination;

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden mt-8">
            {/* Panel Head */}
            <div className="py-3 px-6 bg-gray-100/50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="font-semibold text-12">MEMBERS in slack</div>
                        <div className="text-14 mx-2">&middot;</div>
                        <div className="text-12">총 {unitFormat(totalItemCount, '명')}</div>
                    </div>

                    <div className="flex items-center">
                        <div className="text-12 text-gray-600 mr-4">
                            <span>{totalPage.toLocaleString()}p</span>
                            <span className="mx-0.5">중</span>
                            <span>{currentPage.toLocaleString()}p</span>
                        </div>

                        <div className="flex items-center gap-1">
                            {/* active = current page > 1 */}
                            <button
                                className={`btn btn-xs btn-white btn-square no-animation btn-animation ${
                                    currentPage <= 1 ? 'btn-disabled' : ''
                                }`}
                                onClick={() => prevPage()}
                            >
                                <ChevronLeft />
                            </button>

                            {/* active = current page < total page */}
                            <button
                                className={`btn btn-xs btn-white btn-square no-animation btn-animation ${
                                    currentPage >= totalPage ? 'btn-disabled' : ''
                                }`}
                                onClick={() => nextPage()}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <LoadableBox isLoading={isFetching} loadingType={2} noPadding>
                {/* Panel Body */}
                <div className="flex flex-col">
                    {items.map((item, i) => (
                        <SlackWorkspaceMemberRow key={i} item={item} reload={() => refetch()} />
                    ))}
                </div>
            </LoadableBox>
        </div>
    );
});
SlackWorkspaceMemberList.displayName = 'SlackWorkspaceMemberList';
