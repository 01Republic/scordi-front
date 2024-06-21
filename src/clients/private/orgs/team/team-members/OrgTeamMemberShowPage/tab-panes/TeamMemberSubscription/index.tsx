import React, {memo} from 'react';
import {useSubscriptionsInTeamMemberShowPage} from '^models/Subscription/hook';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentTeamMember} from '../../atom';
import {TeamMemberSubscriptionTableHeader} from './TeamMemberSubscriptionTableHeader';
import {TeamMemberSubscriptionTableRow} from './TeamMemberSubscriptionTableRow';

export const TeamMemberSubscription = memo(function TeamMemberSubscription() {
    const {currentTeamMember: teamMember} = useCurrentTeamMember();
    const {search, result, isLoading, movePage, changePageSize, reload, orderBy} =
        useSubscriptionsInTeamMemberShowPage();

    if (!teamMember) return <></>;

    const onReady = () => {
        search({
            where: {
                organizationId: teamMember.organizationId,
                // @ts-ignore
                teamMembers: {id: teamMember.id},
            },
            order: {id: 'DESC'},
        });
    };

    return (
        <section className="py-8">
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                // hideTopPaginator
            >
                <ListTable
                    onReady={onReady}
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <TeamMemberSubscriptionTableHeader orderBy={orderBy} />}
                    Row={({item}) => (
                        <TeamMemberSubscriptionTableRow teamMember={teamMember} subscription={item} reload={reload} />
                    )}
                />
            </ListTableContainer>
        </section>
    );
});
