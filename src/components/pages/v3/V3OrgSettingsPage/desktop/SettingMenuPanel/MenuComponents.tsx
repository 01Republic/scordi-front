import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {WithChildren} from '^types/global.type';
import {BillingStatus, ConnectStatus, MemberStatus, WorkspaceStatus} from '^v3/V3OrgSettingsPage/desktop/atom';
import {PiSpinnerGapThin} from 'react-icons/pi';
import {CgSpinner} from 'react-icons/cg';

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
    status?: WorkspaceStatus | BillingStatus | MemberStatus | ConnectStatus;
    href: string;
    query?: {menu: WorkspaceStatus | BillingStatus | MemberStatus | ConnectStatus};
}

export const MenuItem = (props: MenuItemProps) => {
    const router = useRouter();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {status, href, query} = props;

    const urlQuery = router.query.menu?.toString();

    useEffect(() => {
        if (!urlQuery) return setIsSelected(status === WorkspaceStatus.GeneralInfo);

        setIsSelected(urlQuery === status);
    }, [urlQuery]);

    const onClick = () => {
        if (!href || !status || isLoading) return;

        setIsLoading(true);
        router.push({pathname: href, query: query}).then(() => setIsLoading(false));
    };

    return (
        <li
            onClick={() => onClick()}
            className={`${
                isSelected ? 'border-scordi border-l-4 text-black' : 'text-gray-400'
            }  font-semibold px-5 py-1.5 cursor-pointer flex gap-2 items-center`}
        >
            {isSelected ? <span className="ml-[-4px]">{status}</span> : status}
            {isLoading && <CgSpinner size={16} className="animate-spin" />}
        </li>
    );
};
