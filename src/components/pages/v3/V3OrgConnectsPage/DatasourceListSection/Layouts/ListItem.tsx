import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface ListItemProps extends WithChildren {
    className?: string;
}
export const ListItem = memo((props: ListItemProps) => {
    const {children, className} = props;

    return <li className={`${className} flex justify-between items-center border rounded-box p-3 mb-3`}>{children}</li>;
});
