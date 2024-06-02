import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {LoadableBox} from '^components/util/loading';
import {TeamMemberDto, useTeamMemberListForMasterSelectInCreateSubscription} from '^models/TeamMember';
import {createSubscriptionFormData} from '../../atom';
import {TeamMemberSelectableItem} from '../TeamMemberSelect/TeamMemberSelectableItem';

export const MasterSelectableSection = memo(function MasterSelectableSection() {
    const {isLoading, result} = useTeamMemberListForMasterSelectInCreateSubscription();
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    const select = (teamMember: TeamMemberDto) => {
        setFormData((f) => ({
            ...f,
            masterId: teamMember.id,
        }));
    };

    const unselect = () => {
        setFormData((f) => ({
            ...f,
            masterId: undefined,
        }));
    };

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
            {result.pagination.totalItemCount > 0 ? (
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        {result.items.map((teamMember, i) => {
                            const selected = !!formData.masterId && formData.masterId === teamMember.id;

                            return (
                                <TeamMemberSelectableItem
                                    key={i}
                                    teamMember={teamMember}
                                    onClick={() => (selected ? unselect() : select(teamMember))}
                                    selected={selected}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center py-4">
                    <div className="text-gray-300 flex flex-col items-center gap-4">
                        <div className="text-6xl">🐣</div>

                        <div className="text-16 font-medium">조직에서 조회된 멤버가 없어요</div>
                    </div>
                </div>
            )}
        </LoadableBox>
    );
});
