import {memo} from 'react';
import {getColor, palette} from '^components/util/palette';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {TeamDto} from '^models/Team/type';
import {cn} from '^public/lib/utils';
import {unitFormat} from '^utils/number';

interface TeamTagProps {
    id?: number;
    name?: string;
}

export const TeamTag = memo((props: TeamTagProps) => {
    const {id, name} = props;

    if (id && name) {
        const colorClass = getColor(name.length + id, palette.notionColors);
        return <TagUI className={colorClass}>{name}</TagUI>;
    } else {
        return <span className="text-gray-200 italic text-sm">비어있음</span>;
    }
});
TeamTag.displayName = 'TeamTag';

interface TeamTagsProps {
    teams: TeamDto[];
    nowrap?: boolean;
    className?: string;
    summarize?: boolean;
}

export const TeamTags = memo((props: TeamTagsProps) => {
    const {teams, nowrap = false, summarize = false, className = ''} = props;

    if (summarize) {
        const [team] = teams;
        const otherCount = teams.length - 1;
        return (
            <div className={cn(`flex ${nowrap ? 'items-center' : 'flex-wrap'}`, className)}>
                {team && <TeamTag key={team.id} id={team.id} name={team.name} />}
                {otherCount > 0 && <span>외 {unitFormat(otherCount)}</span>}
            </div>
        );
    }

    return (
        <div className={cn(`flex ${nowrap ? 'items-center' : 'flex-wrap'}`, className)}>
            {teams.map((team) => (
                <TeamTag key={team.id} id={team.id} name={team.name} />
            ))}
        </div>
    );
});
