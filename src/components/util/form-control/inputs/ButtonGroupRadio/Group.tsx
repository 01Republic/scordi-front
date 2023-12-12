import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface GroupProps extends WithChildren {
    className?: string;
}

export const Group = memo((props: GroupProps) => {
    const {className = ''} = props;
    const children = [props.children].flat();

    return (
        <div className={`w-full grid grid-cols-${children.length} gap-1 bg-gray-100 rounded-[0.5rem] p-1 ${className}`}>
            {children}
        </div>
    );
});
Group.displayName = 'Group';
