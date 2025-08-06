import {useIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {EmptyTable} from '^clients/private/_components/table/EmptyTable';
import {ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {StepbyTutorialButton, StepByTutorialReviewCampaign} from '^components/ExternalCDNScripts/step-by';
import {Spinner} from '^components/util/loading';
import {useReviewCampaigns} from '^models/ReviewCampaign/hook';
import {debounce} from 'lodash';
import {useTranslation} from 'next-i18next';
import {RequestItemCard} from './RequestItemCard';
import {RequestScopeHandler} from './RequestScopeHandler';
import {ReviewCampaignCreateButton} from './ReviewCampaignCreateButton';

export const OrgReviewCampaignListPage = () => {
    const orgId = useIdParam('id');
    const {t} = useTranslation('reviewCampaigns');
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
            breadcrumb={[
                t('list.breadcrumb.work') as string,
                {text: t('list.breadcrumb.request') as string, active: true},
            ]}
            titleText={t('list.title') as string}
            Buttons={() => (
                <>
                    <StepbyTutorialButton onClick={StepByTutorialReviewCampaign} />
                    <ReviewCampaignCreateButton orgId={orgId} />
                </>
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
                        <ListTablePaginator
                            pagination={result.pagination}
                            movePage={movePage}
                            unit={t('pagination.unit') as string}
                        />
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center h-80 text-gray-400 bg-white border rounded-lg space-y-4 text-12">
                    <EmptyTable
                        message={t('list.emptyMessage')}
                        Buttons={() => <ReviewCampaignCreateButton orgId={orgId} />}
                    />
                </div>
            )}
        </ListPage>
    );
};
