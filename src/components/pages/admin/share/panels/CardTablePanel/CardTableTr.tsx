import {WithChildren} from '^types/global.type';
import {memo} from 'react';

interface CardTableTrProps extends WithChildren {
    gridClass?: string;
    className?: string;
}

const CardTableTr = memo((props: CardTableTrProps) => {
    const {gridClass = 'grid-cols-5', className = '', children} = props;

    return (
        <li>
            <div className={`py-2 px-4 grid ${gridClass} gap-2 ${className}`}>{children}</div>
        </li>
    );
});

export const CardTableTH = memo((props: CardTableTrProps) => {
    const {gridClass, children} = props;

    return (
        <CardTableTr gridClass={gridClass} className="font-semibold border-b bg-gray-300 rounded-tl-box rounded-tr-box">
            {children}
        </CardTableTr>
    );
});

export const CardTableTR = memo((props: CardTableTrProps & {borderBottom?: boolean}) => {
    const {gridClass, borderBottom = true, children} = props;

    return (
        <CardTableTr
            gridClass={gridClass}
            className={`text-sm items-center hover:bg-neutral ${borderBottom ? 'border-b' : ''}`}
        >
            {children}
        </CardTableTr>
    );
});
