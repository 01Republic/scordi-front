import {memo} from 'react';
import {useSlackMembersInDetailPage} from '^models/integration/IntegrationSlackMember/hooks';
import {LoadableBox} from '^components/util/loading';
import {SlackWorkspaceMemberRow} from './SlackWorkspaceMemberRow';
import {SlackWorkspaceMemberListHeader} from './SlackWorkspaceMemberListHeader';
import {SlackMemberListSearchInput} from '^clients/private/orgs/settings/integrations/slack/OrgIntegrationSlackWorkspaceDetailPage/SlackWorkspaceMemberList/SlackMemberListSearchInput';
import {ActiveMemberFilter} from '^clients/private/orgs/settings/integrations/slack/OrgIntegrationSlackWorkspaceDetailPage/SlackWorkspaceMemberList/ActiveMemberFilter';

interface SlackWorkspaceMemberListProps {
    //
}

export const SlackWorkspaceMemberList = memo((props: SlackWorkspaceMemberListProps) => {
    const {data: result, search, isFetching, refetch, prevPage, nextPage} = useSlackMembersInDetailPage();

    return (
        <div>
            <div className="mt-3 mb-3 flex items-center justify-between">
                <div></div>

                <div className="flex items-center gap-3">
                    <ActiveMemberFilter
                        onChange={(isDeleted) => {
                            return search((p) => {
                                const {where} = p;
                                return {...p, where: {...where, isDeleted}};
                            });
                        }}
                    />

                    <SlackMemberListSearchInput onChange={(keyword) => search((p) => ({...p, keyword}))} />
                </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Panel Head */}
                <SlackWorkspaceMemberListHeader
                    pagination={result.pagination}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />

                <LoadableBox isLoading={isFetching} loadingType={2} noPadding>
                    {/* Panel Body */}
                    <div className="flex flex-col">
                        {result.items.map((item, i) => (
                            <SlackWorkspaceMemberRow key={i} item={item} reload={() => refetch()} />
                        ))}
                    </div>
                </LoadableBox>
            </div>
        </div>
    );
});
SlackWorkspaceMemberList.displayName = 'SlackWorkspaceMemberList';
