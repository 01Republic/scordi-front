import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {cn} from '^public/lib/utils';

interface ColumnProps extends WithChildren {
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export const Column = memo((props: ColumnProps) => {
    const {className = '', children, onClick, onMouseEnter, onMouseLeave} = props;

    return (
        <div
            className={cn(`cursor-default text-13 px-1.5 h-[40px] flex items-center`, className)}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </div>
    );
});
Column.displayName = 'Column';

interface FocusableColumnProps extends ColumnProps {
    isFocused?: boolean;
    isReacted?: boolean;
}

export const FocusableColumn = memo((props: FocusableColumnProps) => {
    const {isFocused = false, isReacted = false, className = '', ...res} = props;
    return (
        <Column
            className={cn(
                `border cursor-pointer ${
                    isFocused
                        ? 'border-indigo-300 bg-indigo-50'
                        : isReacted
                        ? 'border-transparent bg-indigo-50/50'
                        : 'border-transparent hover:border-indigo-300 hover:bg-indigo-50/50'
                } transition-all`,
                className,
            )}
            {...res}
        />
    );
});
