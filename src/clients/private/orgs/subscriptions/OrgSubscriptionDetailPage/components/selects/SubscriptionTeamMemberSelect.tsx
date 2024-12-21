import {memo, useEffect, useState} from 'react';
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

interface TeamMemberSelectProps {
    onSelected: () => void;
}

export const SubscriptionTeamMemberSelect = memo(function TeamMemberSelect(props: TeamMemberSelectProps) {
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
            props.onSelected();
        });
    };

    useEffect(() => {
        search({});
    }, []);

    useEffect(() => {
        setFormData((f) => ({...f, teamMemberIds}));
    }, [teamMemberIds]);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <TeamMemberSearchInput />

                    {/*<div className="flex items-center justify-start">*/}
                    {/*    <button className="btn btn-scordi gap-2" onClick={() => setCreateMethodModalOpened(true)}>*/}
                    {/*        <FaPlus />*/}
                    {/*        <span>구성원 추가</span>*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>

                <div className="pb-4">
                    <div className="flex items-start justify-start gap-2">
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
    );
});
