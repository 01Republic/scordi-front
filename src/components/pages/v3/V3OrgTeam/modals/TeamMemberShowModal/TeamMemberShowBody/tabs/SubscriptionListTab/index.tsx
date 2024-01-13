import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {currentTeamMemberState, useTeamMember} from '^models/TeamMember';
import {useSubscriptionsInTeamMemberShowModal} from '^models/Subscription/hook';
import {AddButton} from './AddButton';
import {LoadMoreButton} from './LoadMoreButton';
import {SubscriptionItem} from './SubscriptionItem';

export const SubscriptionListTab = memo(function SubscriptionListTab() {
    const {teamMember} = useTeamMember(currentTeamMemberState);
    const {result, search, except} = useSubscriptionsInTeamMemberShowModal();

    useEffect(() => {
        if (!teamMember) return;

        search({
            where: {
                organizationId: teamMember.organizationId,
                // @ts-ignore
                teamMembers: {id: teamMember.id},
            },
        });
    }, [teamMember]);

    const {items, pagination} = result;
    const {totalPage, currentPage, totalItemCount} = pagination;

    return (
        <MobileSection.Item className="border-b-0 grow">
            <MobileSection.Padding>
                <div className="sticky -mx-6 px-6 bg-white z-10" style={{top: 'calc(50px + 64px)'}}>
                    <div className="py-3 flex items-center justify-between">
                        <p className="text-xl font-semibold flex items-center">
                            {totalItemCount ? (
                                <>
                                    <span className="mr-2">총</span>
                                    <span className="font-bold text-scordi">{totalItemCount.toLocaleString()} 개</span>
                                    <span>를 사용하고 있어요</span>
                                </>
                            ) : (
                                <span>이용중인 서비스를 등록해보세요</span>
                            )}
                        </p>

                        <AddButton />
                    </div>

                    <hr />
                </div>

                <ul className="menu menu-compact lg:menu-normal bg-base-100 block no-scrollbar">
                    {teamMember &&
                        items.map((subscription, i) => (
                            <SubscriptionItem
                                key={i}
                                teamMember={teamMember}
                                subscription={subscription}
                                onDelete={() => except(subscription)}
                            />
                        ))}
                </ul>

                {totalPage > currentPage ? (
                    <LoadMoreButton />
                ) : (
                    <div>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                )}
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
