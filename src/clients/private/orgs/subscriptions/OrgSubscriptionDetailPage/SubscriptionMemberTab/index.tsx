import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {FaPlus} from 'react-icons/fa6';
import {orgIdParamState} from '^atoms/common';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useSubscriptionSeatsInMemberTab} from '^models/SubscriptionSeat/hook/useSubscriptionSeats';
import {MemberStatusScopeHandler} from './MemberStatusScopeHandler';
import {MemberStatusSummarySection} from './MemberStatusSummarySection';
import {SubscriptionTeamMemberSelectModal} from './SubscriptionTeamMemberSelect';
import {TeamMemberInSubscriptionTableRow} from './TeamMemberInSubscriptionTableRow';
import {TeamMemberInSubscriptionTableHeader} from './TeamMemberInSubscriptionTableHeader';

export const SubscriptionMemberTab = memo(function SubscriptionMemberTab() {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload: reloadSubscription} = useCurrentSubscription();
    const {result, isLoading, isEmptyResult, isNotLoaded, movePage, changePageSize, reload, orderBy} =
        useSubscriptionSeatsInMemberTab();
    const [isOpened, setIsOpened] = useState(false);

    const onClose = () => {
        setIsOpened(false);
        onPageReload();
    };

    const onPageReload = () => {
        reload();
        reloadSubscription();
    };

    useEffect(() => {
        orgId && onPageReload();
    }, [orgId]);

    return (
        <div className={'py-4 space-y-4'}>
            <MemberStatusSummarySection />

            <div className={'flex justify-between'}>
                <MemberStatusScopeHandler />

                <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => setIsOpened(true)}>
                    <FaPlus />
                    &nbsp;멤버 연결하기
                </button>
            </div>

            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="명"
                isNotLoaded={isNotLoaded}
                isLoading={isLoading}
                isEmptyResult={isEmptyResult}
                emptyMessage="조회된 구성원이 없어요."
                emptyButtonText="구성원 등록"
                EmptyButtons={() => (
                    <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={() => setIsOpened(true)}>
                        <FaPlus />
                        &nbsp;멤버 연결하기
                    </button>
                )}
            >
                <ListTable
                    items={result.items}
                    isLoading={false}
                    Header={() => <TeamMemberInSubscriptionTableHeader orderBy={orderBy} />}
                    Row={({item}) => <TeamMemberInSubscriptionTableRow seat={item} reload={onPageReload} />}
                />
            </ListTableContainer>

            <SubscriptionTeamMemberSelectModal isOpened={isOpened} onClose={onClose} />
        </div>
    );
});
