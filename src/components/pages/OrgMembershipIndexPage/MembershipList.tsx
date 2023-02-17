import React, {memo, useEffect} from 'react';
import {ContentPanelPreloader} from '^layouts/ContentLayout';
import {getMemberships, patchMemberships} from '^api/membership.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {MembershipDto, UpdateMembershipRequestDto} from '^types/membership.type';
import {useCurrentUser} from '^hooks/useCurrentUser';
import {toast} from 'react-toastify';
import {error} from 'console';
import {errorNotify} from '^utils/toast-notify';

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

    const acceptMember = (data: UpdateMembershipRequestDto, id: number) => {
        patchMemberships(data, id).catch(errorNotify);
        toast.
            success: {
                render: () => `Successfully requested!`,
                icon: '🟢',
            }
    };

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
                    {member.approvalStatus === 'APPROVED' ? (
                        <div className="p-5 badge font-bold bg-blue-100">using</div>
                    ) : (
                        <div className="p-5 badge font-bold">disabled</div>
                    )}
                    <button
                        className="btn btn-m bg-yellow-500 text-white font-nomal"
                        disabled={member.approvalStatus === 'APPROVED'}
                        onClick={() =>
                            acceptMember(
                                {level: member.level, approvalStatus: member.approvalStatus},
                                member.organizationId,
                            )
                        }
                    >
                        accept
                    </button>
                </div>
            ))}
        </>
    );
});

//|| currentUser.isAdmin === false
