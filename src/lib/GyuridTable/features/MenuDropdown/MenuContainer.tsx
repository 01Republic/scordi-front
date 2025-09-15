import {ReactNode} from 'react';
import {WithChildren} from '^types/global.type';
import {Instance, Placement} from 'tippy.js';
import {cn} from '^public/lib/utils';

interface MenuContainerProps extends WithChildren {
    attrs: {
        'data-placement': Placement;
        'data-reference-hidden'?: string;
        'data-escaped'?: string;
    };
    content?: ReactNode;
    instance?: Instance;
    className?: string;
}

export const MenuContainer = (props: MenuContainerProps) => {
    const {attrs, instance, children, className = ''} = props;
    const rect = instance?.reference.getBoundingClientRect();
    const minWidth = rect && rect.width > 220 ? `${rect.width}px` : `220px`;

    return (
        <div
            {...attrs}
            className={cn(`bg-white text-14 shadow-lg border border-gray-200 rounded-lg text-gray-700`, className)}
            style={{minWidth}}
        >
            {children}
        </div>
    );
};
