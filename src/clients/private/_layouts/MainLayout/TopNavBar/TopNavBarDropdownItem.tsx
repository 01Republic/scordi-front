import {memo} from 'react';
import Link from 'next/link';
import {IconType} from '@react-icons/all-files';

interface TopNavBarDropdownItemProps {
    Icon: IconType;
    name: string;
    href: string;
    active?: boolean;
}

export const TopNavBarDropdownItem = memo((props: TopNavBarDropdownItemProps) => {
    const {Icon, name, href, active = false} = props;

    return (
        <li className="">
            <Link href={href || 'javascript:void(0)'}>
                <a className={`group active:bg-scordi-200 ${active ? 'bg-scordi-50' : 'hover:bg-scordi-50'}`}>
                    <Icon
                        className={`group-active:text-scordi-500 ${
                            active ? 'text-scordi' : 'text-gray-400 group-hover:text-scordi-400'
                        }`}
                    />
                    <span
                        className={`group-active:text-scordi-500 ${
                            active ? 'text-scordi' : 'text-gray-500 group-hover:text-scordi-400'
                        }`}
                    >
                        {name}
                    </span>
                </a>
            </Link>
        </li>
    );
});
TopNavBarDropdownItem.displayName = 'TopNavBarDropdownItem';
