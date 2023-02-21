import React, {memo, useEffect} from 'react';
import {ContentPanelPreloader} from '^layouts/ContentLayout';
import {getMemberships} from '^api/membership.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {MembershipDto} from '^types/membership.type';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {MemberListItem} from './MemberListItem';

export const MembershipList = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const [members, setMembers] = React.useState<Paginated<MembershipDto>>({} as Paginated<MembershipDto>);
    const {currentUser} = useCurrentUser(null);

    useEffect(() => {
        !!organizationId &&
            getMemberships({where: {organizationId}}).then((res) => {
                setMembers(res.data);
            });
    }, [organizationId]);

    if (members.items === undefined) return <ContentPanelPreloader />;
    if (currentUser === null) return <></>;

    return (
        <>
            {members.items.map((member, index) => (
                <MemberListItem key={index} memberShip={member} />
            ))}
        </>
    );
});
