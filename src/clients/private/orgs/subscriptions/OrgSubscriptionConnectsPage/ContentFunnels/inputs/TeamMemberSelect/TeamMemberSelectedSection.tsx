import {memo, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {FaTimes} from 'react-icons/fa';
import {useListOf} from '^hooks/useResource';
import {createSubscriptionFormData} from '../../atom';
import {selectedTeamMembersAtom} from './atom';

export const TeamMemberSelectedSection = memo(function TeamMemberSelectedSection() {
    const {list, remove} = useListOf(selectedTeamMembersAtom, {getKey: 'id'});
    const setFormData = useSetRecoilState(createSubscriptionFormData);
    const teamMemberIds = (list || []).map((teamMember) => teamMember.id);

    useEffect(() => {
        setFormData((f) => ({...f, teamMemberIds}));
    }, [teamMemberIds]);

    return (
        <div className="pb-4">
            <div className="flex items-start justify-start gap-2 h-auto flex-wrap w-full">
                {list.map((teamMember, i) => (
                    <div
                        key={i}
                        className={`${teamMember.getAvatarColor()} rounded-md text-white py-2 px-3 flex items-center justify-between gap-2 cursor-pointer no-selectable hover:shadow-lg transition-all btn-animation whitespace-nowrap`}
                        onClick={() => remove(teamMember)}
                    >
                        <span>{teamMember.name}</span>
                        <FaTimes size={12} />
                    </div>
                ))}
            </div>
        </div>
    );
});
