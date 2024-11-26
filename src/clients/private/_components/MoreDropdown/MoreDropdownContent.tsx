import {DetailedHTMLProps, HTMLAttributes, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {eventCut} from '^utils/event';

interface MoreDropdownContentProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
    className?: string;
    isPureClassName?: boolean;
}

export const MoreDropdownContent = memo((props: MoreDropdownContentProps) => {
    const {isPureClassName = false, className = '', onClick, children, ...res} = props;

    return (
        <ul
            {...res}
            className={
                isPureClassName
                    ? className
                    : `dropdown-content menu px-0 py-1 shadow-xl text-13 bg-base-100 border rounded-md min-w-32 ${className}`
            }
            onClick={(e) => {
                eventCut(e);
                onClick && onClick(e);
            }}
        >
            {children}
        </ul>
    );
});
MoreDropdownContent.displayName = 'MoreDropdownContent';
