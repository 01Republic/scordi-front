import React, {memo} from 'react';
import Link from 'next/link';
import cn from 'classnames';
import {Avatar} from '^components/Avatar';
import {DashboardLayout} from '^clients/private/orgs/home/OrgDashboardPage/DashboardLayout';
import {LoadableBox} from '^components/util/loading';

interface ListItemLayoutProps {
    title: string;
    Icon: React.ElementType;
}

export const EmptyTableLayout = memo((props: ListItemLayoutProps) => {
    const {title, Icon} = props;

    return (
        <article className={`w-full flex flex-col justify-start border rounded-3xl bg-white p-7`}>
            <p className="flex items-center font-semibold text-20">{title}</p>
            <section className="w-full h-full flex flex-col gap-3 items-center justify-center">
                <p className="text-sm font-normal text-neutral-500">{`등록된 ${title}이 없어요.`}</p>
                <button className="flex items-center gap-2 p-3 text-neutral-50 btn-scordi rounded-lg">
                    <Icon className="w-[10px]" />
                    <p className="text-14 font-medium">{`${title} 등록`}</p>
                </button>
            </section>
        </article>
    );
});
