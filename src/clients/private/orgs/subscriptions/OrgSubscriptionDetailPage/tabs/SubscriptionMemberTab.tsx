import {StatusCard} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/StatusCard';
import {CreditCardScopeHandler} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardScopeHandler';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {AddCreditCardDropdown} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/AddCreditCardDropdown';
import {CreditCardTableHeader} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardTableHeader';
import {CreditCardTableRow} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardTableRow';
import React, {memo} from 'react';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {RiUser3Fill, RiUserFollowFill, RiUserForbidFill, RiUserUnfollowFill} from 'react-icons/ri';
import {AddTeamMemberDropdown} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/AddTeamMemberDropdown';
import {TeamMemberTableHeader} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/TeamMemberTableHeader';
import {TeamMemberTableRow} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/TeamMemberTableRow';
import {useTeamMembersInTeamMembersTable} from '^models/TeamMember';
import {InviteStatusScopeHandler} from '^clients/private/orgs/team/team-members/OrgTeamMemberListPage/InviteStatusScopeHandler';

export const SubscriptionMemberTab = memo(function SubscriptionMemberTab() {
    const {
        search,
        result,
        isLoading,
        isEmptyResult,
        isNotLoaded,
        query,
        searchAndUpdateCounter,
        movePage,
        changePageSize,
        reload,
        orderBy,
    } = useTeamMembersInTeamMembersTable();

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'bg-gray-200 grid grid-cols-4 p-4 space-x-4 rounded'}>
                <StatusCard
                    title={'현재 멤버'}
                    titleValue={'6'}
                    icon={<RiUser3Fill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-purple-400'}
                />
                <StatusCard
                    title={'유료 사용자'}
                    titleValue={'4'}
                    icon={<RiUserFollowFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-orange-400'}
                />
                <StatusCard
                    title={'이번달 종료 예정'}
                    titleValue={'1'}
                    icon={<RiUserUnfollowFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-pink-400'}
                />
                <StatusCard
                    title={'비활성 사용자'}
                    titleValue={'2'}
                    icon={<RiUserForbidFill size={20} className="h-full w-full p-[6px] text-white" />}
                    iconColor={'bg-blue-400'}
                />
            </div>
            <InviteStatusScopeHandler />
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
                EmptyButtons={() => <AddTeamMemberDropdown reload={reload} />}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <TeamMemberTableHeader orderBy={orderBy} />}
                    Row={({item}) => <TeamMemberTableRow teamMember={item} reload={reload} />}
                />
            </ListTableContainer>
        </div>
    );
});
