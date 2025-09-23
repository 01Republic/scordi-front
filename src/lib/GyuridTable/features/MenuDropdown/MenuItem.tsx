import {ReactNode, useState} from 'react';
import {WithChildren} from '^types/global.type';
import Tippy from '@tippyjs/react/headless';
import {ChevronRight} from 'lucide-react';
import {Instance, Placement} from 'tippy.js';
import {cn} from '^public/lib/utils';

interface MenuItemProps extends WithChildren {
    isVisible?: boolean;
    onMouseEnter?: () => void;

    render?: (props: {
        attrs: {
            'data-placement': Placement;
            'data-reference-hidden'?: string;
            'data-escaped'?: string;
        };
        content?: ReactNode;
        instance?: Instance;
    }) => ReactNode;

    className?: string;
    onClick?: () => any;
}

export const MenuItem = (props: MenuItemProps) => {
    const {isVisible = false, onMouseEnter, children, render, className = '', onClick} = props;

    if (!render) {
        return (
            <div className="w-full">
                <div
                    className={cn(
                        `text-14 cursor-pointer w-full rounded-[6px] px-2 flex items-center gap-2 transition-all duration-[20ms] min-h-[28px] ${
                            isVisible ? 'bg-gray-200/40' : 'bg-white hover:bg-gray-200/40'
                        }`,
                        className,
                    )}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                >
                    {children}
                </div>
            </div>
        );
    }

    return (
        <Tippy
            visible={isVisible}
            placement="right-start"
            interactive
            offset={[-1, 0]}
            render={(attrs, content, instance) => render({attrs, content, instance})}
        >
            <div className="w-full">
                <div
                    className={`text-14 cursor-pointer w-full rounded-[6px] px-2 flex items-center gap-2 transition-all duration-[20ms] min-h-[28px] ${
                        isVisible ? 'bg-gray-200/40' : 'bg-white hover:bg-gray-200/40'
                    }`}
                    onMouseEnter={onMouseEnter}
                    onClick={onMouseEnter}
                >
                    {children}

                    <div className="ml-auto">
                        <ChevronRight className="text-gray-500" />
                    </div>
                </div>
            </div>
        </Tippy>
    );
};
