import {memo} from 'react';
import {IconType} from '@react-icons/all-files';

interface BottomNavItemProps {
    text: string;
    Icon: IconType;
    href: string;
    isActive: boolean;
}

export const BottomNavItem = memo((props: BottomNavItemProps) => {
    const {text, Icon, href, isActive} = props;

    return (
        <div className="h-full">
            <a
                href={href}
                className={`${
                    isActive ? 'text-gray-900' : 'text-slate-400 hover:text-slate-500'
                } flex flex-col gap-1 h-full items-center justify-center pt-1`}
            >
                <span>
                    <Icon size={18} />
                </span>
                <span className="text-xs">
                    <small>{text}</small>
                </span>
            </a>
        </div>
    );
});
