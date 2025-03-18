import {LucideIcon} from 'lucide-react';
import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';

interface OrgSettingLeftListItemProps {
    Icon: LucideIcon;
    name: string;
    href: string;
}

export const OrgSettingLeftListItem = memo(function (props: OrgSettingLeftListItemProps) {
    const {Icon, name, href} = props;
    const router = useRouter();

    const isActive = href === router.asPath;

    return (
        <LinkTo
            href={href}
            className={`flex items-center px-4 py-3 rounded-lg hover:bg-scordi-light-50 cursor-pointer ${
                isActive ? `!bg-scordi-50` : ``
            }`}
        >
            <Icon className={`mr-3 ${isActive ? `text-scordi` : `text-gray-500`}`} />
            <span className={`${isActive ? `text-scordi` : `text-gray-500`}`}>{name}</span>
        </LinkTo>
    );
});
