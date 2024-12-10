import {memo, useEffect, useState} from 'react';
import {FaPlus} from 'react-icons/fa6';
import {toast} from 'react-hot-toast';
import {useTeamMemberListInCreateSubscription} from '^models/TeamMember';
import {TeamMemberCreateAutoModal, TeamMemberCreateManualModal} from '^clients/private/_modals/team-members';
import {TeamMemberSearchInput} from './TeamMemberSearchInput';
import {TeamMemberSelectedSection} from './TeamMemberSelectedSection';
import {TeamMemberSelectableSection} from './TeamMemberSelectableSection';
import {TeamMemberCreateMethodModal} from './TeamMemberCreateMethodModal';

export const TeamMemberSelect = memo(function TeamMemberSelect() {
    const {search, reload} = useTeamMemberListInCreateSubscription();
    const [isCreateMethodModalOpened, setCreateMethodModalOpened] = useState(false);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);
    const [isCreateManualModalOpened, setCreateManualModalOpened] = useState(false);

    useEffect(() => {
        search({});
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <TeamMemberSearchInput />

                    <div className="flex items-center justify-start">
                        <button className="btn btn-scordi gap-2" onClick={() => setCreateMethodModalOpened(true)}>
                            <FaPlus />
                            <span>구성원 추가</span>
                        </button>
                    </div>
                </div>

                <TeamMemberSelectedSection />

                <TeamMemberSelectableSection />
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
