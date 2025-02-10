import {FormControl} from '^clients/private/_components/inputs/FormControl';
import React, {memo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TeamMemberSelectColumn} from '^models/TeamMember/components/TeamMemberSelectColumn';
import {useCurrentSubscription} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {subscriptionApi} from '^models/Subscription/api';
import {UpdateSubscriptionRequestDto} from '^models/Subscription/types';
import {toast} from 'react-hot-toast';
import {TeamMemberProfileCompact} from '^models/TeamMember/components/TeamMemberProfile';
import SubscriptionTeamList from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionInfoTab/SubscriptionBasicInfoSection/SubscriptionTeamList';

export const SubscriptionBasicInfoSection = memo(() => {
    const form = useForm<UpdateSubscriptionRequestDto>();
    const [isEditMode, setIsEditMode] = useState(false);
    const {reload, currentSubscription: subscription} = useCurrentSubscription();

    if (!subscription) return null;

    const onSubmit = (dto: UpdateSubscriptionRequestDto) => {
        subscriptionApi.update(subscription.id, dto).then(() => {
            toast.success('변경사항을 저장했어요.');
            setIsEditMode(false);
            reload();
        });
    };

    return (
        <section>
            <div className="card card-bordered bg-white rounded-md relative">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                        <a className="link text-14" onClick={() => setIsEditMode((v) => !v)}>
                            {isEditMode ? '취소' : '수정'}
                        </a>

                        {isEditMode && <button className="btn btn-sm btn-scordi">저장</button>}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md flex flex-col gap-4">
                            <h2 className="leading-none text-xl font-semibold pb-4">기본 정보</h2>

                            <FormControl label="워크스페이스명">
                                {isEditMode ? (
                                    <input
                                        className="input border-gray-200 bg-gray-100 w-full"
                                        defaultValue={subscription?.alias}
                                        {...form.register('alias')}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.alias || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="소속(팀)">
                                <div className="flex items-center gap-1" style={{height: '49.5px'}}>
                                    <SubscriptionTeamList />
                                </div>
                            </FormControl>

                            <FormControl label="담당자">
                                {isEditMode ? (
                                    <TeamMemberSelectColumn
                                        className={
                                            'input border-gray-200 bg-gray-100 w-full flex flex-col justify-center'
                                        }
                                        defaultValue={subscription?.master}
                                        onChange={(teamMember) => {
                                            form.setValue('masterId', teamMember?.id);
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.master ? (
                                            <TeamMemberProfileCompact item={subscription?.master} />
                                        ) : (
                                            '-'
                                        )}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="비고">
                                {isEditMode ? (
                                    <input
                                        type="tel"
                                        className="input border-gray-200 bg-gray-100 w-full"
                                        defaultValue={subscription?.desc || undefined}
                                        {...form.register('desc')}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {subscription?.desc || '-'}
                                    </div>
                                )}
                                <span />
                            </FormControl>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
});
