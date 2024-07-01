import {memo} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

export const IsCreditCardTag = memo((props: {value: boolean | string}) => {
    const {value} = props;

    const colorClass = value ? 'bg-rose-200' : 'bg-indigo-200';
    const text = value ? '신용카드' : '체크카드';

    return <TagUI className={colorClass}>{text}</TagUI>;
});
