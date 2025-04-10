import React from 'react';
import {debounce} from 'lodash';
import {Plus} from 'lucide-react';
import {useIdParam} from '^atoms/common';
import {OrgReviewCampaignNewPageRoute} from '^pages/orgs/[id]/reviewCampaigns/new';
import {LinkTo} from '^components/util/LinkTo';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {RequestItemCard} from './RequestItemCard';
import {RequestScopeHandler} from './RequestScopeHandler';
import {useReviewCampaigns} from '^models/ReviewCampaign/hook';
import {Button} from '^public/components/ui/button';
import {useRouter} from 'next/router';
import {Spinner} from '^components/util/loading';

export const OrgReviewCampaignListPage = () => {
    const router = useRouter();
    const orgId = useIdParam('id');
    const {search, result, movePage, isFetching} = useReviewCampaigns(orgId, {
        where: {organizationId: orgId},
        relations: ['organization', 'author'],
        itemsPerPage: 9,
        order: {finishAt: 'DESC'},
    });
    const campaigns = result.items;

    const onSearch = debounce((keyword?: string) => {
        return search((q) => ({
            ...q,
            keyword,
            page: 1,
            itemsPerPage: 9,
            order: {finishAt: 'DESC'},
        }));
    }, 500);

    return (
        <ListPage
            breadcrumb={['업무', {text: '요청', active: true}]}
            titleText="요청 리스트"
            Buttons={() => (
                <div>
                    <LinkTo
                        href={OrgReviewCampaignNewPageRoute.path(orgId)}
                        className="btn btn-scordi gap-2 no-animation btn-animation"
                        loadingOnBtn
                    >
                        <Plus />
                        <span>추가하기</span>
                    </LinkTo>
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
                        {campaigns.map((item, index) => (
                            <RequestItemCard key={index} item={item} />
                        ))}
                    </div>
                    {/* 하단 페이지네이션 */}
                    <div className="flex justify-end my-10">
                        <ListTablePaginator pagination={result.pagination} movePage={movePage} unit="개" />
                    </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center h-80 text-gray-400 bg-white border rounded-lg space-y-4 text-12">
                    현재 추가된 요청이 없네요
                    <br />새 요청을 추가하시겠어요?
                    <Button
                        variant={'scordi'}
                        size={'sm'}
                        onClick={() => router.push(OrgReviewCampaignNewPageRoute.path(orgId))}
                        className={'gap-2'}
                    >
                        <Plus />
                        <span>요청 추가하기</span>
                    </Button>
                </div>
            )}
        </ListPage>
    );
};
