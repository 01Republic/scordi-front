import {ReactNodeLike} from 'prop-types';
import {memo} from 'react';

export interface AdminInfoListItemProps {
    label: ReactNodeLike;
    value: ReactNodeLike;
    borderBottom?: boolean;
}

function humanize(str: string) {
    return str
        .replace(/[A-Z]/g, (m) => ` ${m}`)
        .replace(/^[\s_]+|[\s_]+$/g, '')
        .replace(/[_\s]+/g, ' ')
        .replace(/^[a-z]/, (m) => m.toUpperCase());
}

export const AdminInfoListItem = memo((props: AdminInfoListItemProps) => {
    const {label, value, borderBottom = true} = props;

    return (
        <li>
            <div className={`flex w-full items-align justify-between ${borderBottom ? 'border-b' : ''} px-6 py-4`}>
                <div className="font-semibold">{typeof label === 'string' ? humanize(label) : label}</div>
                <div>{value}</div>
            </div>
        </li>
    );
});
