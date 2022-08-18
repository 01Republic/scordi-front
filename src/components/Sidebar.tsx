import { useRouter } from "next/router";
import { ButtonHTMLAttributes, FC, HTMLAttributes, ReactElement } from "react";

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

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
} = ({ children, className = "", ...props }) => {
  return (
    <div className={`sidebar ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface SidebarTitleProps extends HTMLAttributes<HTMLDivElement> {}

const SidebarTitle: FC<SidebarTitleProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`sidebar-title ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface SidebarMenuProps extends HTMLAttributes<HTMLDivElement> {}

const SidebarMenu: FC<SidebarMenuProps> & {
  Item: FC<SidebarMenuItemProps>;
} = ({ children, className = "", ...props }) => {
  return (
    <div className={`sidebar-menu ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface SidebarMenuItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
  selected?: boolean;
  icon?: ReactElement;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  className = "",
  text,
  to,
  icon,
  selected = false,
  onClick,
  ...props
}) => {
  const router = useRouter();
  const { pathname } = useRouter();
  let _selected = selected;
  if (to && pathname.startsWith(to)) {
    _selected = true;
  }

  return (
    <>
      <button
        className={`sidebar-menu-item flex items-center ${
          icon && "space-x-2"
        } ${
          _selected
            ? "bg-gray-100 text-black"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        } ${className}`}
        onClick={to ? () => router.push(to) : onClick}
        {...props}
      >
        {icon}
        <div>{text}</div>
      </button>
    </>
  );
};

export interface SidebarMenuSubProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  to?: string;
  selected?: boolean;
}

const SidebarMenuSub: FC<SidebarMenuSubProps> = ({
  className = "",
  text,
  to,
  selected = false,
  onClick,
  ...props
}) => {
  const router = useRouter();
  const { pathname } = useRouter();
  let _selected = selected;
  if (to && pathname.startsWith(to)) {
    _selected = true;
  }
  return (
    <>
      <button
        className={`sidebar-menu-sub ${
          _selected
            ? "bg-gray-200 font-semibold text-black"
            : "text-gray-600 hover:text-gray-900"
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

export { Sidebar };
