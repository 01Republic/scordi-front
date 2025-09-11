import {WithChildren} from '^types/global.type';

interface MenuListProps extends WithChildren {}

export const MenuList = (props: MenuListProps) => {
    const {children} = props;

    return <div className="flex flex-col gap-1 relative p-1">{children}</div>;
};
