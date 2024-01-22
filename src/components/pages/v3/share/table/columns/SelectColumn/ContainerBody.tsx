import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {Loading} from '^v3/share/Loading';

interface ContainerBodyProps extends WithChildren {
    entries: any[];
    isLoading?: boolean;
    className?: string;
}

export const ContainerBody = memo((props: ContainerBodyProps) => {
    const {entries, className = '', isLoading = false, children} = props;

    return (
        <ul
            className={`menu py-0 block max-h-[300px] overflow-y-auto no-scrollbar ${className} ${
                isLoading ? 'no-click opacity-50' : ''
            }`}
        >
            {!entries.length && isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Loading size="8" />
                </div>
            )}
            {children}
        </ul>
    );
});
ContainerBody.displayName = 'ContainerBody';
