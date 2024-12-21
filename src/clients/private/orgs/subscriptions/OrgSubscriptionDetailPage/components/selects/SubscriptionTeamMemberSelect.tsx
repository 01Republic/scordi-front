import React, {memo, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useTeamMemberListInCreateSubscription} from '^models/TeamMember';
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
import {prompt2} from '^components/util/dialog';

interface SubscriptionTeamMemberSelectModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const SubscriptionTeamMemberSelectModal = memo(function TeamMemberSelect(
    props: SubscriptionTeamMemberSelectModalProps,
) {
    const {search, reload} = useTeamMemberListInCreateSubscription();
    const [isCreateMethodModalOpened, setCreateMethodModalOpened] = useState(false);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);
    const [isCreateManualModalOpened, setCreateManualModalOpened] = useState(false);
    const {list, remove} = useListOf(selectedTeamMembersAtom, {getKey: 'id'});
    const setFormData = useSetRecoilState(updateCurrentSubscriptionState);
    const teamMemberIds = (list || []).map((teamMember) => teamMember.id);
    const subscription = useRecoilValue(subscriptionSubjectAtom);

    if (!subscription) return null;

    const handleUpdate = () => {
        // TODO: 업데이트 반영이 안됨
        subscriptionApi.update(subscription?.id, {teamMemberIds}).then(() => {
            toast.success('구성원을 추가했어요.');
            props.onClose();
        });
    };

    const updatePaidCount = async () => {
        const result = await prompt2(`구매한 계정 수를 입력해 주세요.`);
        if (result.isConfirmed && result.value) {
            // TODO: 구매 수 업데이트
            // const req = subscriptionApi.update(subscription.id, {paidMemberCount: result.value});
            // req.then((res) => {
            //     const updatedTeam = res.data;
            //     reload && reload();
            //     const currentSelected = getValue().find(({value}) => value.id === team.id);
            //     if (currentSelected) {
            //         // @ts-ignore
            //         setValue({label: updatedTeam.name, value: updatedTeam, isUpdated: true}, 'select-option');
            //     }
            //     toast.success('변경되었습니다');
            // });
            // req.catch((err) => toast.error(err.message));
            toast.success('계정 수가 변경되었어요.');
        }
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
            <div className={'flex justify-end items-center gap-2'}>
                <p className={'text-sm'}>현재 구매한 계정 수: {subscription.paidMemberCount}개</p>
                <button className={'btn btn-outline btn-sm text-14 bg-white'} onClick={updatePaidCount}>
                    수정하기
                </button>
            </div>
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
                        <TeamMemberSelectableSection gridCols={1} />
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
