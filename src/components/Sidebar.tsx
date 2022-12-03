import {useRouter} from 'next/router';
import {ButtonHTMLAttributes, FC, HTMLAttributes, ReactElement} from 'react';

export type SidebarProps = HTMLAttributes<HTMLDivElement>;

/**
 * @example
 * <Sidebar>
 *   <Sidebar.Title>Admin</Sidebar.Title>
 *   <Sidebar.Menu>
 *     <Sidebar.Menu.Item text="Users" to="/admin/users" />
 *   </Sidebar.Menu>
 * </Sidebar>
 */
const Sidebar: FC<SidebarProps> & {
    Title: FC<SidebarTitleProps>;
    Menu: FC<SidebarMenuProps> & {
        Item: FC<SidebarMenuItemProps>;
    };
} = ({children, className = '', ...props}) => {
    return (
        <div className={`sidebar ${className}`} {...props}>
            {children}
        </div>
    );
};

export type SidebarTitleProps = HTMLAttributes<HTMLDivElement>;

const SidebarTitle: FC<SidebarTitleProps> = ({children, className = '', ...props}) => {
    return (
        <div className={`sidebar-title ${className}`} {...props}>
            {children}
        </div>
    );
};

export type SidebarMenuProps = HTMLAttributes<HTMLDivElement>;

const SidebarMenu: FC<SidebarMenuProps> & {
    Item: FC<SidebarMenuItemProps>;
} = ({children, className = '', ...props}) => {
    return (
        <div className={`sidebar-menu ${className}`} {...props}>
            {children}
        </div>
    );
};

export interface SidebarMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    to?: string;
    blankTo?: string;
    selected?: boolean;
    icon?: any;
    iconTransform?: boolean;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
    className = '',
    text,
    to,
    blankTo,
    icon,
    iconTransform = true,
    selected = false,
    onClick,
    ...props
}) => {
    const router = useRouter();
    const {pathname} = useRouter();
    let _selected = selected;
    if (to && pathname.startsWith(to)) {
        _selected = true;
    }
    const Icon = icon as any;

    return (
        <>
            <button
                className={`sidebar-menu-item flex items-center ${icon && 'space-x-2'} ${
                    _selected ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                } ${className}`}
                onClick={blankTo ? () => window.open(blankTo, '_blank') : to ? () => router.push(to) : onClick}
                {...props}
            >
                {typeof Icon === 'function' && (
                    <Icon className={_selected && iconTransform ? 'fill-current text-gray-900' : ''} />
                )}
                <div>{text}</div>
            </button>
        </>
    );
};

export interface SidebarMenuSubProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    to?: string;
    selected?: boolean;
}

const SidebarMenuSub: FC<SidebarMenuSubProps> = ({className = '', text, to, selected = false, onClick, ...props}) => {
    const router = useRouter();
    const {pathname} = useRouter();
    let _selected = selected;
    if (to && pathname.startsWith(to)) {
        _selected = true;
    }
    return (
        <>
            <button
                className={`sidebar-menu-sub ${
                    _selected ? 'bg-gray-200 font-semibold text-black' : 'text-gray-600 hover:text-gray-900'
                } ${className}`}
                onClick={to ? () => router.push(to) : onClick}
                {...props}
            >
                {text}
            </button>
        </>
    );
};

Sidebar.Title = SidebarTitle;
Sidebar.Menu = SidebarMenu;
SidebarMenu.Item = SidebarMenuItem;

export {Sidebar};
