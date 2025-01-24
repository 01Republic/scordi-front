import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';
import {FaPlus} from 'react-icons/fa6';

interface DashboardLayoutProps extends WithChildren {
    title: React.ReactNode;
    className?: string;
    subTitle?: string;
    isLoading?: boolean;
    Buttons?: () => JSX.Element;
    plusButtonClick?: () => any;
}

export const DashboardSectionLayout = memo((props: DashboardLayoutProps) => {
    const {title, className = '', subTitle, Buttons, plusButtonClick, isLoading = true, children} = props;

    return (
        <section
            className={`w-full flex flex-col justify-start gap-5 border rounded-3xl bg-white p-6 px-7 overflow-hidden ${className}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h6 className="font-semibold text-20">{title}</h6>

                    {plusButtonClick && (
                        <button
                            onClick={plusButtonClick}
                            className="btn btn-ghost btn-square btn-xs text-gray-400 hover:text-black"
                        >
                            <FaPlus />
                        </button>
                    )}
                </div>
                {subTitle && <p className="font-semibold text-[22px]">{subTitle}</p>}
                {Buttons && <Buttons />}
            </div>

            <LoadableBox isLoading={true} loadingType={2} noPadding spinnerPos="center">
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
