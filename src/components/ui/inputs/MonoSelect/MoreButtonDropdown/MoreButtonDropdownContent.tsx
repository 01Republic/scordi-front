import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MoreButtonDropdownContentProps extends WithChildren {
    className?: string;
}

export const MoreButtonDropdownContent = memo((props: MoreButtonDropdownContentProps) => {
    const {className = '', children} = props;

    return (
        <div
            className={`card card-compact card-bordered bg-white px-1 py-0.5 rounded-md shadow-lg min-w-[50px] ${className}`}
        >
            {children}
        </div>
    );
});
MoreButtonDropdownContent.displayName = 'MoreButtonDropdownContent';
