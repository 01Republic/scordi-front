import {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

export const IsPersonalTag = memo((props: {value: boolean | string}) => {
    const {value} = props;

    const colorClass = value ? 'bg-red-200' : 'bg-blue-200';
    const text = value ? '개인' : '법인';

    return <TagUI className={colorClass}>{text}</TagUI>;
});
