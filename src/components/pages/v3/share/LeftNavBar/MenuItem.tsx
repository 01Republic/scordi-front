import {Component, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {useRouter} from 'next/router';
import {IconType} from '@react-icons/all-files';
import {ReactComponentLike} from 'prop-types';
import Link from 'next/link';

interface MenuItemProps extends WithChildren {
    href: string;
    isActive: boolean;
    name?: string;
    Icon?: IconType | ReactComponentLike;
}

export const MenuItem = memo((props: MenuItemProps) => {
    const {href, name, Icon = Component, isActive = false, children} = props;

    return (
        <li>
            <Link href={href || '#'}>
                <a
                    className={`py-2.5 text-sm flex items-center gap-2 cursor-pointer ${
                        isActive ? 'text-scordi' : 'hover:text-scordi'
                    }`}
                >
                    {children || (
                        <>
                            <Icon /> <span>{name}</span>
                        </>
                    )}
                </a>
            </Link>
        </li>
    );
});
MenuItem.displayName = 'MenuItem';
