import React, {memo} from 'react';
import {LucideIcon} from 'lucide-react';
import {ListPageDropdownMenuItem} from './ListPageDropdownMenuItem';

interface Props {
    Icon: LucideIcon;
    title: string;
    desc?: string;
    onClick: () => any;
}

export const MethodOption = memo((props: Props) => {
    const {Icon, title, desc, onClick} = props;

    return (
        <ListPageDropdownMenuItem plain>
            <div
                onClick={onClick}
                className="py-2 px-4 group-hover:text-scordi group-hover:bg-scordi-light-50 transition-all flex items-center gap-3 cursor-pointer"
            >
                <Icon />

                <div className="flex-auto">
                    <p className="text-13">{title}</p>
                    {desc && (
                        <p className="text-11 text-gray-400 group-hover:text-scordi-400 whitespace-nowrap">{desc}</p>
                    )}
                </div>
            </div>
        </ListPageDropdownMenuItem>
    );
});
