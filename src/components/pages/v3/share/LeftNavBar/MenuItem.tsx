import {Component, HTMLAttributeAnchorTarget, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LucideIcon} from 'lucide-react';
import {ReactComponentLike} from 'prop-types';
import {LinkTo} from '^components/util/LinkTo';

interface MenuItemProps extends WithChildren {
    href: string;
    isActive: boolean;
    name?: string;
    Icon?: LucideIcon | ReactComponentLike;
    status?: 'new' | 'soon' | 'running';
    target?: HTMLAttributeAnchorTarget;
}

export const MenuItem = memo((props: MenuItemProps) => {
    const {href, name, target, Icon = Component, isActive = false, status = 'running', children} = props;

    const statusBadge = {
        running: <></>,
        soon: <span className="badge badge-xs bg-scordi-light-200">준비중</span>,
        new: <span className="badge badge-xs bg-scordi-light-200">New</span>,
    }[status];

    return (
        <li>
            <LinkTo
                href={href || '#'}
                className={`py-2.5 text-sm flex items-center justify-between no-selectable ${
                    isActive ? 'text-scordi' : status === 'soon' ? '' : 'hover:text-scordi'
                } ${status === 'soon' ? 'text-gray-500' : 'cursor-pointer'}`}
                onClick={status === 'soon' ? () => alert('준비중인 메뉴입니다.\n열심히 만들고 있어요!') : undefined}
                target={target}
            >
                {children || (
                    <span className="flex items-center gap-2">
                        <Icon /> <span>{name}</span>
                    </span>
                )}
                <span>{statusBadge}</span>
            </LinkTo>
        </li>
    );
});
MenuItem.displayName = 'MenuItem';
