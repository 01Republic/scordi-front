import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useTeamMembersInSubscriptionShowModal} from '^models/TeamMember';
import {TeamDto} from '^models/Team/type';
import {TeamTag} from '^models/Team/components/TeamTag';

const SubscriptionTeamList = memo(function TeamList() {
    const orgId = useRecoilValue(orgIdParamState);
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const {search, result} = useTeamMembersInSubscriptionShowModal();

    const onReady = () => {
        search({
            where: {
                // @ts-ignore
                subscriptions: {id: subscription.id},
            },
            relations: ['teams', 'subscriptions'],
            order: {id: 'DESC'},
        });
    };

    const teams = Array.from(
        new Map(
            result.items
                .map((teamMember) => teamMember.teams)
                .flat()
                .filter((team): team is TeamDto => !!team)
                .map((team) => [team.id, team]),
        ).values(),
    );

    useEffect(() => {
        orgId && onReady();
    }, [orgId]);

    if (!teams.length) return <i className="text-gray-400">미설정</i>;

    return (
        <div className="flex items-center gap-1" style={{height: '49.5px'}}>
            {teams.map((team) => (
                <TeamTag key={team.id} id={team.id} name={team.name} />
            ))}
        </div>
    );
});

export default SubscriptionTeamList;