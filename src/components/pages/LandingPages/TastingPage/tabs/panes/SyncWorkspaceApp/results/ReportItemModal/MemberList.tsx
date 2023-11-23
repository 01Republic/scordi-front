import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {MdOutlineWatchLater} from 'react-icons/md';
import {Avatar} from '^components/Avatar';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {subjectReportProductItem, useReportInDemo} from '../../atom';
import {BsDashCircle} from 'react-icons/bs';
import {ReportGroupedByProductMemberDto} from '../../dto/view-types/group-by-product/report.grouped-by-product-member.dto';

export const ReportItemModalMemberList = memo(function ReportItemModalMemberList() {
    const subjectItem = useRecoilValue(subjectReportProductItem);
    const {memberHandler} = useReportInDemo();

    const removeMember = (member: ReportGroupedByProductMemberDto) => {
        if (!subjectItem) return;
        if (
            confirm(
                '진짜 서비스에서 이 멤버를 제외할까요?\n\n되돌리려면 아래의 누락된 구성원 추가를 통해\n같은 이메일을 다시 등록하면 가능해요 :)',
            )
        ) {
            memberHandler.remove(subjectItem, member.email);
        }
    };

    return (
        <>
            {(subjectItem?.members || []).map((member, i) => (
                <li key={i} className="px-4">
                    <div className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral no-selectable rounded-box">
                        <Avatar className="w-9 h-9 outline outline-offset-1 outline-slate-100" />

                        <div className="flex-1">
                            <p className="font-semibold text-sm">{member.email}</p>
                            <p className="leading-none font-light text-xs text-gray-500 flex items-center gap-1">
                                <span className="flex items-center gap-1 pt-[1px]">
                                    <MdOutlineWatchLater size={14} className="relative" />
                                    {/*<span className="">마지막 인증</span>*/}
                                </span>
                                <span>{yyyy_mm_dd_hh_mm(member.lastAuthorizedTime)}</span>
                            </p>
                        </div>

                        <div className="flex items-center" style={{alignSelf: 'stretch'}}>
                            <button
                                onClick={() => removeMember(member)}
                                className="relative top-[-2px] text-red-300 hover:text-red-500 transition-all"
                            >
                                <BsDashCircle className="" size={24} strokeWidth={0.3} />
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </>
    );
});
