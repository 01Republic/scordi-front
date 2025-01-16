import React, {memo} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import {Avatar} from '^components/Avatar';

interface ListItemLayoutProps {
    url: string;
    message: string;
    ProfileContent: React.ElementType;
    className?: string;
}

export const DashboardAssetsSectionItem = memo((props: ListItemLayoutProps) => {
    const {url, message, ProfileContent, className = ''} = props;

    return (
        <li className={`first:border-t-0 last:border-b-0 border-t-[0.5px] border-b-[0.5px] px-4 ${className}`}>
            <Link href={url}>
                <div className="flex items-center justify-between">
                    <ProfileContent />
                    <p className="font-medium text-16 text-gray-900">{message}</p>
                </div>
            </Link>
        </li>
    );
});
