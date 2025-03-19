import React from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useSubscriptionTableListAtom} from '^models/Subscription/hook';
import {debounce} from 'lodash';
import {LinkTo} from '^components/util/LinkTo';
import {OrgSubscriptionSelectPageRoute} from '^pages/orgs/[id]/subscriptions/select';
import {Plus} from 'lucide-react';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTablePaginator} from '^clients/private/_components/table/ListTable';
import {RequestItemCard} from '^clients/private/orgs/requests/OrgRequestListPage/RequestItemCard';
import {RequestScopeHandler} from '^clients/private/orgs/requests/OrgRequestListPage/RequestScopeHandler';

const data = [
    {
        status: '진행 중',
        date: '2025년 1월 24일 생성',
        title: '요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목',
        progress: 17,
        goal: 100,
    },
    {
        status: '진행 중',
        date: '2025년 1월 24일 생성',
        title: '요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목',
        progress: 50,
        goal: 100,
    },
    {
        status: '진행 중',
        date: '2025년 1월 24일 생성',
        title: '요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목',
        progress: 84,
        goal: 100,
    },
    {
        status: '완료',
        date: '2025년 1월 24일 생성',
        title: '요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목',
        progress: 30,
        goal: 100,
    },
    {
        status: '진행 중',
        date: '2025년 1월 24일 생성',
        title: '요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목',
        progress: 30,
        goal: 100,
    },
    {
        status: '진행 중',
        date: '2025년 1월 24일 생성',
        title: '요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목',
        progress: 30,
        goal: 100,
    },
    {
        status: '진행 중',
        date: '2025년 1월 24일 생성',
        title: '요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목',
        progress: 30,
        goal: 100,
    },
    {
        status: '진행 중',
        date: '2025년 1월 24일 생성',
        title: '요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목 요청 제목',
        progress: 30,
        goal: 100,
    },
];

export const OrgRequestListPage = () => {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, query, isLoading, isNotLoaded, isEmptyResult, movePage, changePageSize, orderBy, reload} =
        useSubscriptionTableListAtom();

    const onReady = () => {
        search({
            where: {organizationId: orgId},
            relations: ['master', 'teamMembers', 'creditCard', 'bankAccount'],
            order: {currentBillingAmount: {dollarPrice: 'DESC'}, isFreeTier: 'ASC', id: 'DESC'},
        });
    };

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    }, 500);

    const AddRequestButton = () => (
        <div>
            <LinkTo
                href={OrgSubscriptionSelectPageRoute.path(orgId)}
                className="btn btn-scordi gap-2 no-animation btn-animation"
                loadingOnBtn
            >
                <Plus />
                <span>추가하기</span>
            </LinkTo>
        </div>
    );

    return (
        <ListPage
            onReady={onReady}
            breadcrumb={['업무', {text: '요청', active: true}]}
            titleText="요청 리스트"
            Buttons={() => <AddRequestButton />}
            ScopeHandler={RequestScopeHandler}
            onSearch={onSearch}
        >
            {data.length === 0 && (
                <div className="flex flex-col justify-center items-center h-80 text-gray-400 bg-white border rounded-lg">
                    현재 추가된 요청이 없네요
                    <br />
                    새 요청을 추가하시겠어요?
                    <AddRequestButton />
                </div>
            )}
            {data.length > 0 && (
                <>
                    <div className={'grid grid-cols-3 gap-4'}>
                        {data.map((item, index) => (
                            <RequestItemCard key={index} {...item} />
                        ))}
                    </div>
                    <div className="flex justify-end my-10">
                        <ListTablePaginator
                            pagination={result.pagination}
                            movePage={movePage}
                            onChangePerPage={changePageSize}
                            unit="개"
                        />
                    </div>
                </>
            )}
        </ListPage>
    );
};
