import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {Avatar} from '^components/Avatar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {subjectReportProductItem, useReportInDemo} from '../../atom';

export const ReportItemModalHeader = memo(function ReportItemModalHeader() {
    const subjectItem = useRecoilValue(subjectReportProductItem);
    const {productHandler} = useReportInDemo();

    const removeProduct = () => {
        if (!subjectItem) return;
        if (confirm('진짜 이 서비스를 제외할까요?\n\n되돌리려면 새로고침 후\n처음부터 다시 연동해야 해요')) {
            productHandler.remove(subjectItem);
        }
    };

    const setEditMode = () => {
        alert('준비중인 기능입니다!\n열심히 만들고 있어요!');
    };

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
                    <button className="btn btn-lg btn-block rounded-box" onClick={removeProduct}>
                        <span className="inline sm:hidden">제외하기</span>
                        <span className="hidden sm:inline">서비스 제외하기</span>
                    </button>
                    <button className="btn btn-lg btn-block rounded-box" onClick={setEditMode}>
                        <span className="inline sm:hidden">유료/무료</span>
                        <span className="hidden sm:inline">유/무료 선택하기</span>
                        {/*<span className="hidden sm:inline">유료로 쓰는중</span>*/}
                    </button>
                </div>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
