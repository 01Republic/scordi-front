import React, {memo, ReactNode, useEffect, useState} from 'react';
import {ChevronDown, ChevronUp, MessageCircleQuestion} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {WithChildren} from '^types/global.type';
import {cn} from '^public/lib/utils';
import {FindOptionsOrderValue} from '^types/utils/find-options';

interface CardTableTrProps extends WithChildren {
    gridClass?: string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => any;
}

const CardTableTr = memo((props: CardTableTrProps) => {
    const {gridClass = 'grid-cols-5', className = '', children, onClick} = props;

    return (
        <li onClick={onClick}>
            <div className={`py-2 px-4 grid ${gridClass} gap-2 ${className}`}>{children}</div>
        </li>
    );
});

export const CardTableTH = memo((props: CardTableTrProps) => {
    const {className = '', gridClass, children, onClick} = props;

    return (
        <CardTableTr
            gridClass={gridClass}
            className={`font-semibold border-b bg-gray-300 rounded-tl-box rounded-tr-box ${className}`}
            onClick={onClick}
        >
            {children}
        </CardTableTr>
    );
});

export const CardTableTR = memo((props: CardTableTrProps & {borderBottom?: boolean}) => {
    const {className = '', gridClass, borderBottom = true, children, onClick} = props;

    return (
        <CardTableTr
            gridClass={gridClass}
            className={`text-sm items-center hover:bg-neutral ${borderBottom ? 'border-b' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </CardTableTr>
    );
});

interface CardTableThLabelProps {
    text: ReactNode;
    hint?: ReactNode;
    className?: string;
}

export const CardTableThLabel = (props: CardTableThLabelProps) => {
    const {text, hint, className = ''} = props;

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div>{text}</div>

            {hint && (
                <Tippy content={hint} className="!text-11">
                    <div>
                        <MessageCircleQuestion fontSize={12} className="text-gray-400" />
                    </div>
                </Tippy>
            )}
        </div>
    );
};

interface CardTableSortableColumnProps extends WithChildren {
    className?: string;
    defaultValue?: 'ASC' | 'DESC' | FindOptionsOrderValue;
    onClick: (sortVal: 'ASC' | 'DESC') => any;
}

export const CardTableSortableColumn = (props: CardTableSortableColumnProps) => {
    const {defaultValue = 'ASC', className = '', children, onClick} = props;
    const [val, setVal] = useState<'ASC' | 'DESC'>(defaultValue === 'DESC' ? 'DESC' : 'ASC');

    useEffect(() => {
        setVal(defaultValue === 'DESC' ? 'DESC' : 'ASC');
    }, [defaultValue]);

    return (
        <div className={cn('flex items-center justify-between', className)}>
            {children}

            <div
                className="flex items-center ml-1.5"
                onClick={() => {
                    const nextVal = val === 'ASC' ? 'DESC' : 'ASC';
                    setVal(nextVal);
                    onClick(nextVal);
                }}
            >
                {val === 'DESC' && <ChevronDown />}
                {val === 'ASC' && <ChevronUp />}
            </div>
        </div>
    );
};
