import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';
import {Plus} from 'lucide-react';

interface DashboardLayoutProps extends WithChildren {
    Top?: () => JSX.Element;
    title: React.ReactNode;
    className?: string;
    subTitle?: string;
    isLoading?: boolean;
    Buttons?: () => JSX.Element;
    plusButtonClick?: () => any;
}

export const DashboardSectionLayout = memo((props: DashboardLayoutProps) => {
    const {Top, title, className = '', subTitle, Buttons, plusButtonClick, isLoading = false, children} = props;

    return (
        <section
            className={`w-full flex flex-col justify-start gap-3 md:gap-4 lg:gap-5 border rounded-sm sm:rounded-3xl bg-white py-6 px-4 sm:px-7 overflow-hidden ${className}`}
        >
            {Top && <Top />}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h6 className="font-semibold text-20">{title}</h6>

                    {plusButtonClick && (
                        <button
                            onClick={plusButtonClick}
                            className="btn btn-ghost btn-square btn-xs text-gray-400 hover:text-black"
                        >
                            <Plus />
                        </button>
                    )}
                </div>
                {subTitle && <p className="font-semibold text-[22px]">{subTitle}</p>}
                {Buttons && <Buttons />}
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerPos="center">
                <div
                    className="max-h-[826px] overflow-hidden  overflow-y-scroll"
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
