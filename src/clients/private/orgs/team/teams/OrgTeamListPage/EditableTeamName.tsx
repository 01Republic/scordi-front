import {memo, KeyboardEvent, FocusEvent} from 'react';
import {useTranslation} from 'next-i18next';
import {TeamDto} from '^models/Team/type';
import {teamApi} from '^models/Team/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';
import {PencilLine} from 'lucide-react';

interface EditableTeamNameProps {
    team: TeamDto;
    isEditMode: boolean;
    setIsEditMode: (isEditMode: boolean) => any;
    reload?: () => any;
}

export const EditableTeamName = memo((props: EditableTeamNameProps) => {
    const {t} = useTranslation('teams');
    const {team, isEditMode, setIsEditMode, reload} = props;
    const orgId = team.organizationId;

    if (!isEditMode) return <div className="font-bold truncate mb-[4px]">{team.name}</div>;

    const cancel = (e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
        e.target.value = team.name;
        setIsEditMode(false);
    };

    const update = (e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
        const name = e.target.value.trim();

        if (team.name === name) return cancel(e);

        teamApi
            .update(orgId, team.id, {name})
            .then(() => {
                setIsEditMode(false);
                toast.success(t('messages.teamUpdated'));
                reload && reload();
            })
            .catch(errorToast);
    };

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
            className="mb-[5px] flex items-center justify-center gap-1"
        >
            {/* Fake Icon for input position */}
            <PencilLine fontSize={14} className="text-gray-500 invisible" />

            <input
                type="text"
                defaultValue={team.name}
                autoFocus
                className="input input-sm w-11/12 px-2 py-[1px] h-[initial] leading-[initial] text-16 bg-gray-100 rounded text-center font-bold !outline-none"
                onKeyUp={(e) => {
                    if (e.key === 'Escape') cancel(e);
                    if (!e.shiftKey && e.key === 'Enter') update(e);
                }}
                onBlur={(e) => update(e)}
            />

            <PencilLine fontSize={14} className="text-gray-500" />
        </div>
    );
});
EditableTeamName.displayName = 'EditableTeamName';
