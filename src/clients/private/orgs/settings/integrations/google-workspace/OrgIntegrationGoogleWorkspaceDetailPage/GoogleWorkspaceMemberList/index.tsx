import {memo} from 'react';
import {useGoogleWorkspaceMembersInDetailPage} from '^models/integration/IntegrationGoogleWorkspaceMember/hooks';
import {LoadableBox} from '^components/util/loading';
import {WorkspaceMemberListHeader} from './WorkspaceMemberListHeader';
import {GoogleWorkspaceMemberRow} from './GoogleWorkspaceMemberRow';
import {WorkspaceMemberListSearchInput} from './WorkspaceMemberListSearchInput';
import {ActiveMemberFilter} from './ActiveMemberFilter';

interface GoogleWorkspaceMemberListProps {
    //
}

export const GoogleWorkspaceMemberList = memo((props: GoogleWorkspaceMemberListProps) => {
    const {
        data: result,
        search,
        params,
        isFetching,
        refetch,
        prevPage,
        nextPage,
    } = useGoogleWorkspaceMembersInDetailPage();

    return (
        <div>
            <div className="mt-3 mb-3 flex items-center justify-between">
                <div></div>

                <div className="flex items-center gap-3">
                    <ActiveMemberFilter
                        defaultChecked={!params.where?.isDeleted}
                        onChange={(isDeleted) => {
                            return search((p) => {
                                const {where} = p;
                                return {...p, where: {...where, isDeleted}, page: 1};
                            });
                        }}
                    />

                    <WorkspaceMemberListSearchInput onChange={(keyword) => search((p) => ({...p, keyword}))} />
                </div>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Panel Head */}
                <WorkspaceMemberListHeader pagination={result.pagination} prevPage={prevPage} nextPage={nextPage} />

                <LoadableBox isLoading={isFetching} loadingType={2} noPadding>
                    {/* Panel Body */}
                    <div className="flex flex-col">
                        {result.items.map((item, i) => (
                            <GoogleWorkspaceMemberRow key={i} item={item} reload={() => refetch()} />
                        ))}
                    </div>
                </LoadableBox>
            </div>
        </div>
    );
});
GoogleWorkspaceMemberList.displayName = 'GoogleWorkspaceMemberList';
