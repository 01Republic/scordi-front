import {memo} from 'react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {TeamDto} from '^models/Team/type';
import {PencilLine} from 'lucide-react';

interface TeamEditMenuItemProps {
    team: TeamDto;
    onClick?: () => any;
}

export const TeamEditMenuItem = memo((props: TeamEditMenuItemProps) => {
    const {team, onClick} = props;

    return (
        <MoreDropdown.MenuItem onClick={onClick} className="flex items-center gap-2">
            <PencilLine />
            <div>수정하기</div>
        </MoreDropdown.MenuItem>
    );
});
TeamEditMenuItem.displayName = 'TeamEditMenuItem';
