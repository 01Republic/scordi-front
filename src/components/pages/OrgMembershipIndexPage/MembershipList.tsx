import React, {memo, useEffect} from 'react';
import {ContentPanelPreloader} from '^layouts/ContentLayout';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {MembershipDto} from 'src/models/Membership/types';
import {useCurrentUser} from '^models/User/hook';
import {MemberListItem} from './MemberListItem';
import {membershipApi} from '^models/Membership/api';

export const MembershipList = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const [members, setMembers] = React.useState<Paginated<MembershipDto>>({} as Paginated<MembershipDto>);
    const {currentUser} = useCurrentUser(null);

    useEffect(() => {
        !!organizationId &&
            membershipApi.index({where: {organizationId}}).then((res) => {
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
