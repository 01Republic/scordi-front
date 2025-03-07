import {memo} from 'react';
import {LucideIcon} from 'lucide-react';
import {useRouter} from 'next/router';

interface BottomNavItemProps {
    text: string;
    Icon: LucideIcon;
    href: string;
    isActive: boolean;
}

export const BottomNavItem = memo((props: BottomNavItemProps) => {
    const {text, Icon, href, isActive} = props;
    const router = useRouter();

    const onclick = () => {
        router.push(href);
    };

    return (
        <div className="h-full">
            <div
                onClick={onclick}
                className={`cursor-pointer ${
                    isActive ? 'text-gray-900' : 'text-slate-400 hover:text-slate-500'
                } flex flex-col gap-1 h-full items-center justify-center pt-1`}
            >
                <span>
                    <Icon size={18} />
                </span>
                <span className="text-[11px]">{text}</span>
            </div>
        </div>
    );
});
