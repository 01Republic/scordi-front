import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface DashboardLayoutProps extends WithChildren {
    title: string;
    className?: string;
    subTitle?: string;
    Buttons?: () => JSX.Element;
}

export const DashboardLayout = memo((props: DashboardLayoutProps) => {
    const {title, className, subTitle, Buttons, children} = props;

    return (
        <article className={`w-full flex flex-col justify-start gap-5 border rounded-3xl bg-white p-7 ${className}`}>
            <div className="flex items-center justify-between">
                <h6 className="font-semibold text-20">{title}</h6>
                {subTitle && <p className="font-semibold text-[22px]">{subTitle}</p>}
                {Buttons && <Buttons />}
            </div>
            <div>{children}</div>
        </article>
    );
});
