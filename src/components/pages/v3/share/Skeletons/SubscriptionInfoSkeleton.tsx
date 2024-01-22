import React from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoList} from '^v3/share/MobileInfoList';

export const SubscriptionInfoSkeleton = () => {
    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="w-full h-[40px] animate-pulse" />
                <div className="flex w-60 gap-2 items-center mb-2">
                    <div className="skeleton !w-6 !h-6 !rounded-full shrink-0"></div>
                    <div className="skeleton" />
                </div>
                <div className="skeleton !w-20 !h-10 mb-16" />
                <MobileInfoList>
                    <li className="flex justify-between gap-20 items-center text-[16px] min-h-[50px] no-selectable">
                        <div className="skeleton !w-20 !h-4" />
                        <div className="!w-52 text-right transition-all skeleton !h-4" />
                    </li>
                </MobileInfoList>
                <hr />
                <MobileInfoList>
                    <li className="flex justify-between gap-20 items-center text-[16px] min-h-[50px] no-selectable">
                        <div className="skeleton !w-32 !h-4" />
                        <div className="!w-24 text-right transition-all skeleton !h-4" />
                    </li>
                </MobileInfoList>
                <MobileInfoList>
                    <li className="flex justify-between gap-20 items-center text-[16px] min-h-[50px] no-selectable">
                        <div className="skeleton !w-32 !h-4" />
                        <div className="!w-24 text-right transition-all skeleton !h-4" />
                    </li>
                </MobileInfoList>
                <hr />
                <MobileInfoList>
                    <li className="flex justify-between gap-20 items-center text-[16px] min-h-[50px] no-selectable">
                        <div className="skeleton !w-20 !h-4" />
                        <div className="max-w-[70%] text-right transition-all skeleton !h-4" />
                    </li>
                </MobileInfoList>
                <MobileInfoList>
                    <li className="flex justify-between gap-20 items-center text-[16px] min-h-[50px] no-selectable">
                        <div className="skeleton !w-40 !h-4" />
                        <div className="!w-24 text-right transition-all skeleton !h-4" />
                    </li>
                </MobileInfoList>
                <MobileInfoList>
                    <li className="flex justify-between gap-20 items-center text-[16px] min-h-[50px] no-selectable">
                        <div className="skeleton !w-40 !h-4" />
                        <div className="!w-24 text-right transition-all skeleton !h-4" />
                    </li>
                </MobileInfoList>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
};
