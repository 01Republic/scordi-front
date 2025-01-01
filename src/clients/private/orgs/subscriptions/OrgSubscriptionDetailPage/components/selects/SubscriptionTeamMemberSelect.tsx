import React, {memo, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {
    TeamMemberCreateAutoModal,
    TeamMemberCreateManualModal,
    TeamMemberCreateMethodModal,
} from '^clients/private/_modals/team-members';
import {TeamMemberSearchInput} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/TeamMemberSelect/TeamMemberSearchInput';
import {TeamMemberSelectableSection} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/TeamMemberSelect/TeamMemberSelectableSection';
import {useListOf} from '^hooks/useResource';
import {selectedTeamMembersAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionConnectsPage/ContentFunnels/inputs/TeamMemberSelect/atom';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {FaTimes} from 'react-icons/fa';
import {updateCurrentSubscriptionState} from '^v3/V3OrgAppShowPage/atom';
import {Button} from '^components/util/form-control/inputs/ButtonGroupRadio/Button';
import {subscriptionApi} from '^models/Subscription/api';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {orgIdParamState} from '^atoms/common';
import {useSubscriptionSeatsInMemberTab} from '^models/SubscriptionSeat/hook/useSubscriptionSeats';

interface SubscriptionTeamMemberSelectModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const SubscriptionTeamMemberSelectModal = memo(function TeamMemberSelect(
    props: SubscriptionTeamMemberSelectModalProps,
) {
    // const {search, reload} = useTeamMemberListInCreateSubscription();
    const [isCreateMethodModalOpened, setCreateMethodModalOpened] = useState(false);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);
    const [isCreateManualModalOpened, setCreateManualModalOpened] = useState(false);
    const {list, remove} = useListOf(selectedTeamMembersAtom, {getKey: 'id'});
    const setFormData = useSetRecoilState(updateCurrentSubscriptionState);
    const teamMemberIds = (list || []).map((teamMember) => teamMember.id);
    const orgId = useRecoilValue(orgIdParamState);
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const {search, reload, result} = useSubscriptionSeatsInMemberTab();

    if (!orgId || !subscription) return null;

    const handleUpdate = () => {
        const promises = list.map((teamMember) => {
            subscriptionApi.seatsApi.create(orgId, subscription.id, {teamMemberId: teamMember.id});
            remove(teamMember);
        });

        Promise.all(promises)
            .then(() => {
                toast.success('구성원을 추가했어요.');
                props.onClose();
                reload();
            })
            .catch((err) => {
                console.error(err);
                toast.error('구성원 추가 중 오류가 발생했어요.');
            });
    };

    useEffect(() => {
        search({});
    }, []);

    useEffect(() => {
        setFormData((f) => ({...f, teamMemberIds}));
    }, [teamMemberIds]);

    return (
        <SlideUpModal open={props.isOpened} onClose={props.onClose} size="md">
            <p className={'text-lg bold mb-4'}>{`${subscription?.product.nameKo}을 이용중인 구성원을 연결하세요.`}</p>
            <div>
                <div className="flex flex-col gap-4">
                    <TeamMemberSearchInput />

                    <div className="pb-4">
                        <div className="flex items-start justify-start gap-2 flex-wrap">
                            {list.map((teamMember, i) => (
                                <div
                                    key={i}
                                    className={`${teamMember.getAvatarColor()} rounded-md text-white py-2 px-3 flex items-center justify-between gap-2 cursor-pointer no-selectable hover:shadow-lg transition-all btn-animation`}
                                    onClick={() => remove(teamMember)}
                                >
                                    <span>{teamMember.name}</span>
                                    <FaTimes size={12} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={'max-h-96 overflow-scroll'}>
                        <TeamMemberSelectableSection
                            gridCols={1}
                            filter={(teamMember) =>
                                !!result.items.find((seat) => seat.teamMember?.id === teamMember.id)
                            }
                        />
                    </div>

                    <Button className={'btn-scordi'} onClick={handleUpdate}>
                        추가
                    </Button>
                </div>

                <TeamMemberCreateMethodModal
                    isOpened={isCreateMethodModalOpened}
                    onClose={() => setCreateMethodModalOpened(false)}
                    onSelect={(method) => {
                        if (method === 'auto') {
                            setCreateManualModalOpened(false);
                            setCreateAutoModalOpened(true);
                        } else {
                            setCreateAutoModalOpened(false);
                            setCreateManualModalOpened(true);
                        }
                    }}
                />

                <TeamMemberCreateAutoModal
                    isOpened={isCreateAutoModalOpened}
                    onClose={() => setCreateAutoModalOpened(false)}
                    onCreate={() => {
                        toast.success('구성원을 모두 불러왔어요.');
                        setCreateAutoModalOpened(false);
                        return reload();
                    }}
                    onRetry={() => setCreateAutoModalOpened(true)}
                />

                <TeamMemberCreateManualModal
                    isOpened={isCreateManualModalOpened}
                    onClose={() => setCreateManualModalOpened(false)}
                    onCreate={() => {
                        toast.success('구성원을 추가했어요.');
                        setCreateManualModalOpened(false);
                        return reload();
                    }}
                />
            </div>
        </SlideUpModal>
    );
});
