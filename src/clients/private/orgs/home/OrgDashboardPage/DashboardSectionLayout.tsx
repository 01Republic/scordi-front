import React, {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';
import {Plus} from 'lucide-react';

interface DashboardLayoutProps extends WithChildren {
    Top?: () => JSX.Element;
    Middle?: () => JSX.Element;
    title: React.ReactNode;
    className?: string;
    subTitle?: string;
    isLoading?: boolean;
    Buttons?: () => JSX.Element;
    plusButtonClick?: () => any;
    showMoreTeam?: boolean;
    setShowMoreTeam?: (val: boolean) => void;
}

export const DashboardSectionLayout = memo((props: DashboardLayoutProps) => {
    const {
        Top,
        Middle,
        title,
        className = '',
        subTitle,
        Buttons,
        plusButtonClick,
        isLoading = false,
        children,
        showMoreTeam,
        setShowMoreTeam,
    } = props;

    return (
        <section
            className={`w-full flex flex-col justify-start gap-3 md:gap-4 lg:gap-5 border rounded-sm sm:rounded-3xl bg-white py-6 px-4 sm:px-7 overflow-hidden ${className}`}
        >
            {Top && <Top />}
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 w-full">
                    <div className="w-full flex items-center justify-between">
                        <h6 className="font-semibold text-20">{title}</h6>
                        {setShowMoreTeam && (
                            <button onClick={() => setShowMoreTeam(!showMoreTeam)} className="text-12 link ">
                                {showMoreTeam ? '접기' : '펼처보기'}
                            </button>
                        )}
                    </div>

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
                {Middle && <Middle />}
                <div
                    className="max-h-[630px] overflow-hidden  overflow-y-scroll"
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
