import {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface IsFreeTierTagUIProps {
    value: boolean;
}

export const IsFreeTierTagUI = memo((props: IsFreeTierTagUIProps) => {
    const {value} = props;
    const colorClass = value ? 'bg-gray-100' : 'bg-green-200';
    const text = value ? '무료' : '유료';

    return <TagUI className={colorClass}>{text}</TagUI>;
});
IsFreeTierTagUI.displayName = 'IsFreeTierTagUI';
