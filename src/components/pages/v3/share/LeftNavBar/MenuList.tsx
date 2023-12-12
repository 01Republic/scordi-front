import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface MenuListProps extends WithChildren {
    title?: string;
}

export const MenuList = memo((props: MenuListProps) => {
    const {title, children} = props;

    return (
        <section className="pb-6 border-b">
            <ul className="px-5 font-semibold">
                {title && <li className="py-2.5 text-sm flex items-center text-gray-400">{title}</li>}

                {children}
            </ul>
        </section>
    );
});
MenuList.displayName = 'MenuList';
