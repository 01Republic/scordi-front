import React, {memo} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import {Avatar} from '^components/Avatar';

interface ListItemLayoutProps {
    url: string;
    message: string;
    src?: string;
    ProfileContent?: React.ElementType;
    Icon?: React.ElementType;
    avatarClassName?: string;
    title?: string;
    subTitle?: string;
}

export const DashboardAssetsSectionItem = memo((props: ListItemLayoutProps) => {
    const {url, src, avatarClassName, title, subTitle, message, Icon, ProfileContent} = props;

    return (
        <li className="first:border-t-0 last:border-b-0 border-t-[0.5px] border-b-[0.5px] p-4">
            <Link href={url}>
                <div className="flex items-center justify-between">
                    {ProfileContent ? (
                        <ProfileContent />
                    ) : (
                        <div className="flex items-center gap-2">
                            {Icon ? (
                                <div className="w-7 h-7 rounded-full text-scordi flex items-center justify-center border border-scordi-light">
                                    <Icon />
                                </div>
                            ) : (
                                <>
                                    {src ? (
                                        <Avatar
                                            src={src}
                                            className={avatarClassName}
                                            draggable={false}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Avatar className={avatarClassName} draggable={false} loading="lazy" />
                                    )}
                                </>
                            )}

                            <div className="flex-col">
                                <p className="font-normal text-14 text-gray-800">{title}</p>
                                <p className="font-normal text-12 text-gray-400">{subTitle}</p>
                            </div>
                        </div>
                    )}
                    <p className="font-medium text-16 text-gray-900">{message}</p>
                </div>
            </Link>
        </li>
    );
});
