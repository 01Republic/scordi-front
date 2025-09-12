import {WithChildren} from '^types/global.type';
import {cn} from '^public/lib/utils';

interface MenuListProps extends WithChildren {
    className?: string;
}

export const MenuList = (props: MenuListProps) => {
    const {className = '', children} = props;

    return <div className={cn(`flex flex-col gap-1 relative p-1`, className)}>{children}</div>;
};
