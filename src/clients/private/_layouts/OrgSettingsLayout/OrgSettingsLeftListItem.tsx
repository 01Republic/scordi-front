import {IconType} from '@react-icons/all-files';
import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';

interface OrgSettingLeftListItemProps {
    Icon: IconType;
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
            className={`flex items-center px-4 py-3 mb-1 rounded-2xl hover:bg-gray-50 cursor-pointer ${
                isActive ? `bg-gray-50` : ``
            }`}
        >
            <Icon className={`mr-3 ${isActive ? `text-scordi` : ``}`} />
            <span className={`${isActive ? `text-scordi` : ``}`}>{name}</span>
        </LinkTo>
    );
});
