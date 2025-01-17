import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';

interface DashboardLayoutProps extends WithChildren {
    title: string;
    className?: string;
    subTitle?: string;
    isLoading?: boolean;
    Buttons?: () => JSX.Element;
}

export const DashboardSectionLayout = memo((props: DashboardLayoutProps) => {
    const {title, className = '', subTitle, Buttons, isLoading = false, children} = props;

    return (
        <section
            className={`w-full flex flex-col justify-start gap-5 border rounded-3xl bg-white p-6 px-7 overflow-hidden ${className}`}
        >
            <div className="flex items-center justify-between">
                <h6 className="font-semibold text-20">{title}</h6>
                {subTitle && <p className="font-semibold text-[22px]">{subTitle}</p>}
                {Buttons && <Buttons />}
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                <div
                    className="max-h-[800px] overflow-hidden  overflow-y-scroll"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {children}
                </div>
            </LoadableBox>
        </section>
    );
});
