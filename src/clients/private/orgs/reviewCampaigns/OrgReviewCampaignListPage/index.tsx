import {debounce} from 'lodash';
import {useIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {Spinner} from '^components/util/loading';
import {useReviewCampaigns} from '^models/ReviewCampaign/hook';
import {ReviewCampaignCreateButton} from './ReviewCampaignCreateButton';
import {RequestScopeHandler} from './RequestScopeHandler';
import {RequestItemCard} from './RequestItemCard';

export const OrgReviewCampaignListPage = () => {
    const orgId = useIdParam('id');
    const {search, result, movePage, isFetching} = useReviewCampaigns(orgId, {
        where: {organizationId: orgId},
        relations: ['organization', 'author'],
        order: {id: 'DESC'},
    });
    const campaigns = result.items;

    const onSearch = debounce((keyword?: string) => {
        return search((q) => ({
            ...q,
            keyword,
            page: 1,
            order: {id: 'DESC'},
        }));
    }, 500);

    return (
        <ListPage
            breadcrumb={['업무', {text: '요청', active: true}]}
            titleText="요청 리스트"
            Buttons={() => (
                <div>
                    <ReviewCampaignCreateButton orgId={orgId} />
                </div>
            )}
            ScopeHandler={<RequestScopeHandler search={search} />}
            onSearch={onSearch}
        >
            {isFetching ? (
                <Spinner />
            ) : campaigns.length > 0 ? (
                <>
                    <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'}>
                        {campaigns.map((campaign) => (
                            <RequestItemCard key={campaign.id} item={campaign} />
                        ))}
                    </div>
                    {/* 하단 페이지네이션 */}
                    <div className="flex justify-end my-10">
                        <ListTablePaginator pagination={result.pagination} movePage={movePage} unit="개" />
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center h-80 text-gray-400 bg-white border rounded-lg space-y-4 text-12">
                    <EmptyTable
                        message={`현재 추가된 요청이 없네요\n새 요청을 추가하시겠어요?`}
                        Buttons={() => <ReviewCampaignCreateButton orgId={orgId} />}
                    />
                </div>
            )}
        </ListPage>
    );
};
