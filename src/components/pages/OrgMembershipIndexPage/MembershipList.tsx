import React, {memo, useEffect} from 'react';
import {ContentPanel, ContentPanelPreloader} from '^layouts/ContentLayout';
import {getMemberships} from '^api/membership.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {MembershipDto} from '^types/membership.type';
import {PreLoader} from '^components/PreLoader';

export const MembershipList = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const [members, setMembers] = React.useState<Paginated<MembershipDto>>({} as Paginated<MembershipDto>);

    useEffect(() => {
        !!organizationId &&
            getMemberships({where: {organizationId}}).then((res) => {
                setMembers(res.data);
            });
    }, [organizationId]);

    if (members.items === undefined) return <ContentPanelPreloader />;

    return (
        <>
            {members.items.map((member, index) => (
                <div key={index} className="flex gap-4 items-center justify-center p-4 border-b border-b-[#dbd6e1]">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder inline-flex">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                            <span className="text-xs">{member.user.name[0]}</span>
                        </div>
                    </label>
                    <div className={'flex-1 text-gray-800'}>{member.user.name}</div>
                    <div className={'flex-1 text-sm'}>{member.user.email}</div>
                    <div className={'flex-1 text-sm'}>{member.level}</div>
                </div>
            ))}
        </>
    );
});
