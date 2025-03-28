import React, {memo, useEffect, useState} from 'react';
import {toast} from 'react-hot-toast';
import {useTeamMemberListInCreateSubscription} from '^models/TeamMember';
import {
    TeamMemberCreateAutoModal,
    TeamMemberCreateManualModal,
    TeamMemberCreateByExcelModal,
} from '^clients/private/_modals/team-members';
import {TeamMemberSearchInput} from './TeamMemberSearchInput';
import {TeamMemberSelectedSection} from './TeamMemberSelectedSection';
import {TeamMemberSelectableSection} from './TeamMemberSelectableSection';
import {TeamMemberCreateMethodModal} from './TeamMemberCreateMethodModal';
import {Plus} from 'lucide-react';

export const TeamMemberSelect = memo(function TeamMemberSelect() {
    const {search, reload, result} = useTeamMemberListInCreateSubscription();
    const [isCreateMethodModalOpened, setCreateMethodModalOpened] = useState(false);
    const [isCreateAutoModalOpened, setCreateAutoModalOpened] = useState(false);
    const [isCreateManualModalOpened, setCreateManualModalOpened] = useState(false);
    const [isCreateByExcelModalOpened, setCreateByExcelModalOpened] = useState(false);
    const [isAllSelectTeamMember, setIsAllSelectTeamMember] = useState(false);

    useEffect(() => {
        search({});
    }, []);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <TeamMemberSearchInput />

                    <div className="flex items-center justify-start gap-2">
                        <button className="btn btn-scordi gap-2" onClick={() => setCreateMethodModalOpened(true)}>
                            <Plus />
                            <span>구성원 추가</span>
                        </button>
                        <button
                            className={`btn btn-white gap-2 ${result.items.length === 0 && 'disabled'}`}
                            disabled={result.items.length === 0}
                            onClick={() => setIsAllSelectTeamMember(!isAllSelectTeamMember)}
                        >
                            <span>{isAllSelectTeamMember ? '선택취소' : '전체선택'}</span>
                        </button>
                    </div>
                </div>

                <TeamMemberSelectedSection />

                <TeamMemberSelectableSection isAllSelectTeamMember={isAllSelectTeamMember} />
            </div>

            <TeamMemberCreateMethodModal
                isOpened={isCreateMethodModalOpened}
                onClose={() => setCreateMethodModalOpened(false)}
                onSelect={(method) => {
                    switch (method) {
                        case 'auto':
                            setCreateManualModalOpened(false);
                            setCreateByExcelModalOpened(false);
                            return setCreateAutoModalOpened(true);
                        case 'manual':
                            setCreateAutoModalOpened(false);
                            setCreateByExcelModalOpened(false);
                            return setCreateManualModalOpened(true);
                        case 'by-excel':
                            setCreateAutoModalOpened(false);
                            setCreateManualModalOpened(false);
                            return setCreateByExcelModalOpened(true);
                        default:
                            return;
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

            <TeamMemberCreateByExcelModal
                isOpened={isCreateByExcelModalOpened}
                onClose={() => setCreateByExcelModalOpened(false)}
                onCreate={() => {
                    setCreateByExcelModalOpened(false);
                    return reload();
                }}
            />
        </div>
    );
});
