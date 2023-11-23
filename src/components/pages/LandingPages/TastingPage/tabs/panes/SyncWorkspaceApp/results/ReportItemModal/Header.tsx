import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {Avatar} from '^components/Avatar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {subjectReportProductItem} from '../../atom';

export const ReportItemModalHeader = memo(function ReportItemModalHeader() {
    const subjectItem = useRecoilValue(subjectReportProductItem);

    return (
        <MobileSection.Item>
            <MobileSection.Padding>
                <div className="flex items-center gap-3 mb-[3rem]">
                    <Avatar
                        src={subjectItem?.product?.image}
                        className="w-9 h-9 outline outline-offset-1 outline-slate-100"
                    />
                    <h3>{subjectItem?.appName}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button className="btn btn-lg btn-block rounded-box">
                        <span className="inline sm:hidden">제외하기</span>
                        <span className="hidden sm:inline">이 서비스 제외하기</span>
                    </button>
                    <button className="btn btn-lg btn-block rounded-box">
                        <span className="inline sm:hidden">홈 방문</span>
                        <span className="hidden sm:inline">홈에서 확인하기</span>
                    </button>
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
