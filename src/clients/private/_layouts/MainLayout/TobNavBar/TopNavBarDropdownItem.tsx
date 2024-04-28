import {memo} from 'react';
import Link from 'next/link';
import {IconType} from '@react-icons/all-files';

interface TopNavBarDropdownItemProps {
    Icon: IconType;
    name: string;
    href: string;
}

export const TopNavBarDropdownItem = memo((props: TopNavBarDropdownItemProps) => {
    const {Icon, name, href} = props;

    return (
        <li className="">
            <Link href={href || 'javascript:void(0)'}>
                <a className="group active:bg-scordi-200">
                    <Icon className="text-gray-400 group-hover:text-gray-600 group-active:text-scordi-500" />
                    <span className="text-gray-500 group-hover:text-gray-700 group-active:text-scordi-500">{name}</span>
                </a>
            </Link>
        </li>
    );
});
TopNavBarDropdownItem.displayName = 'TopNavBarDropdownItem';
