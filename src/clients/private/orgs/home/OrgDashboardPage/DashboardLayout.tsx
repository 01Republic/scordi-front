import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface DashboardLayoutProps extends WithChildren {
    title: string;
}

export const DashboardLayout = memo((props: DashboardLayoutProps) => {
    const {title, children} = props;

    return (
        <article className="w-full flex flex-col justify-start gap-5 border rounded-3xl bg-white p-7">
            <h6 className="font-semibold text-20">{title}</h6>
            <div>{children}</div>
        </article>
    );
});
