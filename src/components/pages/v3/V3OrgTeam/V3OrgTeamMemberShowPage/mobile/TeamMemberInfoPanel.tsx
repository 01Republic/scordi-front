import React, {memo} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {UseFormReturn} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^models/TeamMember/type';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {EditTriggeredInput, MobileTeamMemberInfoInput} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/input';
import {Avatar} from '^components/Avatar';
import {useRecoilValue} from 'recoil';
import {ApprovalStatus, c_ApprovalStatus, t_ApprovalStatus} from '^models/Membership/types';
import {getDate} from '^components/util/date';

import {currentTeamMemberState} from '^models/TeamMember/atom';
import {t_SubscriptionStatus} from '^models/Subscription/types';

interface TeamMemberInfoPanelProps {
    form: UseFormReturn<UpdateTeamMemberDto, any>;
}

/**
 * 첫 수정 시 완료 버튼을 두 번 클릭해야 submit 되는 현상이 있습니다.
 */
export const TeamMemberInfoPanel = memo((props: TeamMemberInfoPanelProps) => {
    const currentMember = useRecoilValue(currentTeamMemberState);
    const {form} = props;

    if (!currentMember) return <></>;

    const profileImgUrl = currentMember?.makeTeamMemberProfile().profileImgUrl;
    const approvalStatus = currentMember.membership?.approvalStatus;
    const {name, jobName, phone, email} = currentMember;

    const approvalDate =
        approvalStatus === ApprovalStatus.PENDING
            ? getDate(currentMember.createdAt)
            : getDate(currentMember.membership?.updatedAt || currentMember.createdAt);

    return (
        <form>
            <MobileSection.Item>
                <MobileSection.Padding>
                    <div className="flex justify-between mb-2">
                        <div className="flex-1">
                            <EditTriggeredInput
                                className="font-bold text-2xl w-full py-2"
                                required={true}
                                defaultValue={name}
                                {...form.register('name')}
                            />
                            <EditTriggeredInput
                                className="font-medium text-xl w-full"
                                required={true}
                                defaultValue={jobName || ''}
                                {...form.register('jobName')}
                            />
                        </div>
                        <Avatar src={profileImgUrl} className="w-10 h-10" />
                    </div>
                    {/*유저 가입 상태*/}
                    <div className="flex justify-between py-2">
                        <span className="text-base self-center">가입 상태</span>
                        <span className={`badge p-3 font-bold ${approvalStatus && c_ApprovalStatus(approvalStatus)}`}>
                            {approvalStatus && t_ApprovalStatus(approvalStatus)}
                        </span>
                    </div>

                    {/*초대날짜 / 가입날짜*/}
                    <div className="flex justify-between py-2">
                        <span className="self-center text-base">
                            {approvalStatus === ApprovalStatus.PENDING ? '초대 날짜' : '가입 날짜'}
                        </span>
                        <p className="text-gray-500">{approvalDate}</p>
                    </div>
                </MobileSection.Padding>
            </MobileSection.Item>

            <MobileSection.Item>
                <MobileSection.Padding>
                    <p className="font-bold text-xl pb-3">연락처</p>
                    <MobileInfoList>
                        <MobileTeamMemberInfoInput
                            label="휴대폰"
                            required={true}
                            defaultValue={phone || ''}
                            {...form.register('phone')}
                        />
                        <MobileTeamMemberInfoInput
                            label="이메일"
                            required={true}
                            defaultValue={email || ''}
                            {...form.register('email')}
                        />
                    </MobileInfoList>
                </MobileSection.Padding>
            </MobileSection.Item>
        </form>
    );
});
