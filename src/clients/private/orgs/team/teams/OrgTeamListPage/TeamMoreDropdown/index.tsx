import {memo, useState} from 'react';
import {EllipsisVertical} from 'lucide-react';
import {TeamDto} from '^models/Team/type';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {TeamEditMenuItem} from './TeamEditMenuItem';
import {TeamRemoveMenuItem} from './TeamRemoveMenuItem';

interface TeamMoreDropdownProps {
    team: TeamDto;
    reload?: () => any;
    onEdit?: () => any;
}

export const TeamMoreDropdown = memo((props: TeamMoreDropdownProps) => {
    const {team, onEdit, reload} = props;
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`absolute top-2 right-2 ${isFocused ? 'visible' : 'invisible'} group-hover:visible`}>
            <MoreDropdown
                Trigger={() => (
                    <button
                        type="button"
                        onClick={() => setIsFocused(true)}
                        className="btn btn-xs btn-ghost btn-circle"
                    >
                        <EllipsisVertical fontSize={16} />
                    </button>
                )}
                onClose={() => setIsFocused(false)}
                offset={[0, 0]}
            >
                {({hide}) => {
                    return (
                        <MoreDropdown.Content>
                            <TeamEditMenuItem
                                team={team}
                                onClick={() => {
                                    hide();
                                    onEdit && onEdit();
                                }}
                            />
                            <TeamRemoveMenuItem
                                team={team}
                                reload={() => {
                                    hide();
                                    reload && reload();
                                }}
                            />
                        </MoreDropdown.Content>
                    );
                }}
            </MoreDropdown>
        </div>
    );
});
TeamMoreDropdown.displayName = 'TeamMoreDropdown';
