import React, {memo} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import {Avatar} from '^components/Avatar';
import {DashboardSectionLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardSectionLayout';
import {LoadableBox} from '^components/util/loading';
import {useTranslation} from 'next-i18next';

interface ListItemLayoutProps {
    title: string;
    Icon: React.ElementType;
    className?: string;
    onClick?: () => void;
    url?: string;
}

export const EmptyTableLayout = memo((props: ListItemLayoutProps) => {
    const {title, Icon, className = '', onClick, url} = props;
    const {t} = useTranslation('dashboard');

    return (
        <article className={`w-full flex flex-col justify-start border rounded-3xl bg-white p-7 ${className}`}>
            <p className="flex items-center font-semibold text-20">{title}</p>
            <section className=" h-full flex flex-col gap-3 items-center justify-center my-20 ">
                <p className="text-sm font-normal text-gray-500">{t('emptyTable.noRegistered', {title})}</p>
                {url ? (
                    <Link
                        href={url ? url : '#'}
                        className="flex items-center gap-2 p-3 text-gray-50 btn-scordi rounded-lg"
                    >
                        <Icon className="w-[10px]" />
                        <p className="text-14 font-medium">{t('emptyTable.register', {title})}</p>
                    </Link>
                ) : (
                    <button
                        onClick={onClick}
                        className="flex items-center gap-2 p-3 text-gray-50 btn-scordi rounded-lg"
                    >
                        <Icon className="w-[10px]" />
                        <p className="text-14 font-medium">{t('emptyTable.register', {title})}</p>
                    </button>
                )}
            </section>
        </article>
    );
});
