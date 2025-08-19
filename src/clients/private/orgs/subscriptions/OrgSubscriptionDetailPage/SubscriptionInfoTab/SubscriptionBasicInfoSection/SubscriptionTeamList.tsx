import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {useOrgIdParam} from '^atoms/common';
import {useTeamMembers2, useTeamMembersInSubscriptionShowModal} from '^models/TeamMember';
import {TeamDto} from '^models/Team/type';
import {TeamTag} from '^models/Team/components/TeamTag';
import {subscriptionSubjectAtom} from '../../atom';
import {EmptyValue} from '../../EmptyValue';

const SubscriptionTeamList = memo(function TeamList() {
    const orgId = useOrgIdParam();
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    const {search, result} = useTeamMembers2(orgId, {});

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

    if (!teams.length) return <EmptyValue />;

    return (
        <div className="flex items-start gap-1 flex-wrap pt-0.5" style={{height: '49.5px'}}>
            {teams.map((team) => (
                <TeamTag key={team.id} id={team.id} name={team.name} />
            ))}
        </div>
    );
});

export default SubscriptionTeamList;
