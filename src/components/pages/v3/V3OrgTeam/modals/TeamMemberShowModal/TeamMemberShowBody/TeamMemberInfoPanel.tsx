import React, {memo} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useRecoilValue} from 'recoil';
import {FaQuestion} from 'react-icons/fa6';
import {Avatar} from '^components/Avatar';
import {getDate} from '^components/util/date';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {useToast} from '^hooks/useToast';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {MobileInfoListItem} from '^v3/share/MobileInfoList/Item';
import {ApprovalStatus} from '^models/Membership/types';
import {currentTeamMemberState} from '^models/TeamMember';
import {TeamMemberAvatar} from '^v3/share/TeamMemberAvatar';

/**
 * 첫 수정 시 완료 버튼을 두 번 클릭해야 submit 되는 현상이 있습니다.
 */
export const TeamMemberInfoPanel = memo(() => {
    const teamMember = useRecoilValue(currentTeamMemberState);
    const {toast} = useToast();

    if (!teamMember) return <></>;

    const profileImgUrl = teamMember?.makeTeamMemberProfile().profileImgUrl;
    const approvalStatus = teamMember.membership?.approvalStatus;
    const {name, jobName, phone, email} = teamMember;

    return (
        <MobileSection.Item className="border-b-0">
            <MobileSection.Padding>
                <div className="flex justify-between mb-10">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold w-full py-2">{name}</h3>
                        <p className="text-sm">{email}</p>
                    </div>
                    <div>
                        <TeamMemberAvatar teamMember={teamMember} className="w-16 h-16 text-[32px]" />
                    </div>
                </div>

                <MobileInfoList>
                    <MobileInfoListItem label="휴대폰" value={phone || <i>-</i>} />

                    {/*유저 가입 상태*/}
                    <MobileInfoListItem
                        label={
                            approvalStatus
                                ? approvalStatus === ApprovalStatus.PENDING
                                    ? '초대 발송일'
                                    : '가입일'
                                : '등록일'
                        }
                        value={
                            approvalStatus
                                ? approvalStatus === ApprovalStatus.PENDING
                                    ? getDate(teamMember.membership?.createdAt!)
                                    : getDate(teamMember.createdAt)
                                : yyyy_mm_dd_hh_mm(teamMember.createdAt)
                        }
                    />
                </MobileInfoList>

                <br />
                <br />

                <button
                    type="button"
                    className="btn btn-lg btn-block btn-scordi rounded-box"
                    onClick={() => toast.info('준비중입니다.')}
                >
                    이 멤버 초대하기
                </button>
            </MobileSection.Padding>
        </MobileSection.Item>
    );
});
