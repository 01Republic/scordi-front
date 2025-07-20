import {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {Trash2} from 'lucide-react';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {TeamDto} from '^models/Team/type';
import {confirm2, confirmed} from '^components/util/dialog';
import {teamApi} from '^models/Team/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface TeamRemoveMenuItemProps {
    team: TeamDto;
    reload?: () => any;
}

export const TeamRemoveMenuItem = memo((props: TeamRemoveMenuItemProps) => {
    const {t} = useTranslation('teams');
    const {team, reload} = props;

    const onClick = () => {
        const removeConfirm = () => {
            return confirm2(
                <span className="text-20">
                    <span className="text-scordi">{team.name}</span>
                    {t('messages.confirmDelete')}
                </span>,
                <div className="text-16 -mt-4 -mx-2 px-[10px]">
                    <div>{t('messages.deleteAllTeamInfo')}</div>
                    <div className="mb-4">{t('messages.cannotUndo')}</div>
                    <div>{t('messages.confirmDeleteNow')}</div>
                </div>,
            );
        };

        return confirmed(removeConfirm())
            .then(() => teamApi.destroy(team.organizationId, team.id))
            .then(() => toast.success(t('messages.teamDeleted')))
            .then(() => reload && reload())
            .catch(errorToast);
    };

    return (
        <MoreDropdown.MenuItem onClick={onClick} className="flex items-center gap-2 text-red-400 hover:text-red-500">
            <Trash2 />
            <div>{t('actions.delete')}</div>
        </MoreDropdown.MenuItem>
    );
});
TeamRemoveMenuItem.displayName = 'TeamRemoveMenuItem';
