import React, {ChangeEvent, memo, MouseEventHandler, useEffect, useState} from 'react';
import {TeamMemberDto} from '^models/TeamMember/type';
import {SubscriptionDto} from '^models/Subscription/types';
import {useTeamMembers} from '^models/TeamMember/hook';
import {useForm} from 'react-hook-form';
import {subscriptionApi} from '^models/Subscription/api';
import {MasterProfileOption} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr/columns/MasterProfile/MasterProfileOption';

interface MasterProfileProps {
    subscription: SubscriptionDto;
}

// TODO
//  subscription state 를 바꿔주지 않고 master state 만 바꿔주고 있음.
//  개별 subscription 을 다시 렌더링할 수 있는 방법이 필요?
export const MasterProfile = memo((props: MasterProfileProps) => {
    const {subscription} = props;
    const {
        result: {items: members},
    } = useTeamMembers();
    const form = useForm<Record<string, string>>();
    const [memberOptions, setMemberOptions] = useState<TeamMemberDto[]>();
    const [filteredMemberOptions, setFilteredMemberOptions] = useState<TeamMemberDto[]>();
    const [master, setMaster] = useState<TeamMemberDto>();

    useEffect(() => {
        subscription.master && setMaster(subscription.master);
    }, [subscription]);

    useEffect(() => {
        master && form.setValue('masterName', master.name);
    }, [master]);

    useEffect(() => setMemberOptions(members), [members]);

    const filterByName = (name: string) => {
        if (!memberOptions) return;
        return memberOptions.filter((member) => member.name.includes(name));
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.currentTarget.value;
        setFilteredMemberOptions(filterByName(name) ?? []);
    };

    const onClick = (id: number) => {
        if (master?.id === id) return;
        subscriptionApi
            //
            .update(subscription.id, {masterId: id})
            .then(({data}) => setMaster(data.master));
    };

    return (
        <>
            <div className="dropdown">
                <div tabIndex={0}>
                    <MasterProfileOption member={master} />
                </div>
                {memberOptions?.length || filteredMemberOptions?.length ? (
                    <ul className="dropdown-content z-[1] py-2 px-3 mt-1 bg-base-100 rounded-box border">
                        <li>
                            <input
                                {...form.register('masterName')}
                                tabIndex={0}
                                className="input input-bordered input-sm mb-3"
                                onChange={onChange}
                            />
                        </li>
                        {(filteredMemberOptions ?? memberOptions)?.map((member, i) => (
                            <li className="text-sm cursor-pointer text-start mb-1.5" key={i}>
                                <MasterProfileOption member={member} onClick={onClick} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
});
MasterProfile.displayName = 'MasterProfile';
