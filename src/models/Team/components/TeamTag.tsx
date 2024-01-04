import {memo} from 'react';
import {getColor, palette} from '^components/util/palette';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

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
