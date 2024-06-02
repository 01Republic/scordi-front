import {memo} from 'react';
import {useListOf} from '^hooks/useResource';
import {selectedTeamMembersAtom} from './atom';
import {getColor} from '^components/util/palette';
import {FaTimes} from 'react-icons/fa';

export const TeamMemberSelectedSection = memo(function TeamMemberSelectedSection() {
    const {list, remove} = useListOf(selectedTeamMembersAtom, {getKey: 'id'});

    return (
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
    );
});
