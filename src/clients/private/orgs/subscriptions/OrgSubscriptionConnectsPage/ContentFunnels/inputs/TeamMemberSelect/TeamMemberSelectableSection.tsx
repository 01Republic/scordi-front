import {memo} from 'react';
import {useTeamMemberListInCreateSubscription} from '^models/TeamMember';
import {LoadableBox} from '^components/util/loading';
import {selectedTeamMembersAtom} from './atom';
import {TeamMemberSelectableItem} from './TeamMemberSelectableItem';
import {useListOf} from '^hooks/useResource';

export const TeamMemberSelectableSection = memo(function TeamMemberSelectableSection() {
    const {isLoading, result} = useTeamMemberListInCreateSubscription();
    const {list, add, remove} = useListOf(selectedTeamMembersAtom, {getKey: 'id'});

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
            {result.pagination.totalItemCount > 0 ? (
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        {result.items.map((teamMember, i) => {
                            const selected = list.some((m) => m.id === teamMember.id);

                            return (
                                <TeamMemberSelectableItem
                                    key={i}
                                    teamMember={teamMember}
                                    onClick={() => (selected ? remove(teamMember) : add(teamMember))}
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
