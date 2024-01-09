import {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/router';
import {WithChildren} from '^types/global.type';
import {
    BillingStatus,
    ConnectStatus,
    MemberStatus,
    SelectedSettingsItem,
    WorkspaceStatus,
} from '^v3/V3OrgSettingsPage/desktop/atom';

interface MenuListProps extends WithChildren {
    title: string;
}

export const MenuList = (props: MenuListProps) => {
    const {title, children} = props;

    return (
        <section className="text-sm">
            <ul>
                <li className="font-semibold px-5 py-1.5">{title}</li>

                {children}
            </ul>
        </section>
    );
};

interface MenuItemProps {
    status: WorkspaceStatus | BillingStatus | MemberStatus | ConnectStatus;
    href: string;
    onClick?: () => void;
}

export const MenuItem = (props: MenuItemProps) => {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useRecoilState(SelectedSettingsItem);
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const {status, href} = props;

    useEffect(() => {
        selectedItem === status && setIsSelected(true);
        selectedItem !== status && setIsSelected(false);
    }, [selectedItem]);
    const onClick = () => {
        if (!href || !status) return;

        router.push(href);
        setSelectedItem(status);
    };

    return (
        <li
            onClick={() => onClick()}
            className={`${
                isSelected ? 'border-scordi border-l-4 text-black' : 'text-gray-400'
            } font-semibold px-5 py-1.5 cursor-pointer`}
        >
            {isSelected ? <span className="ml-[-4px]">{status}</span> : status}
        </li>
    );
};
