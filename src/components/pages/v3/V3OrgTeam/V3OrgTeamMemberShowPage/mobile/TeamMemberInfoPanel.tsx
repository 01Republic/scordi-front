import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {UseFormReturn} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^models/TeamMember/type';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {
    EditTriggeredInput,
    isTeamMemberInfoEditableAtom,
    MobileTeamMemberInfoInput,
} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/input';
import {Avatar} from '^components/Avatar';
import {useRecoilValue} from 'recoil';
import {subjectTeamMemberAtom} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/desktop/modals/atom';
import {ApprovalStatus} from '^models/Membership/types';
import {getDate} from '^components/util/date';

interface TeamMemberInfoPanelProps {
    form: UseFormReturn<UpdateTeamMemberDto>;
    onSubmit: (data: UpdateTeamMemberDto) => void;
}

/**
 * 첫 수정 시 완료 버튼을 두 번 클릭해야 submit 되는 현상이 있습니다.
 */
export const TeamMemberInfoPanel = memo((props: TeamMemberInfoPanelProps) => {
    const {form, onSubmit} = props;
    const member = useRecoilValue(subjectTeamMemberAtom);
    const profileImgUrl = member?.makeTeamMemberProfile().profileImgUrl;
    const isEditable = useRecoilValue(isTeamMemberInfoEditableAtom);
    const approvalStatus = member?.getApprovalStatusOption();

    if (!member) return <></>;

    useEffect(() => {
        const touchedFields = Object.values(form.formState.touchedFields);
        if (touchedFields.length > 0 && !isEditable) onSubmit(form.getValues());

        const {name, jobName, phone, email} = member;

        form.setValue('name', name);
        form.setValue('jobName', jobName);
        form.setValue('phone', phone);
        form.setValue('email', email);
    }, [isEditable, form.formState.touchedFields, member]);

    const approvalDate =
        approvalStatus?.status === ApprovalStatus.PENDING
            ? getDate(member.createdAt)
            : getDate(member.membership?.updatedAt || member.createdAt);

    return (
        <form>
            <MobileSection.Item>
                <MobileSection.Padding>
                    <div className="flex justify-between mb-2">
                        <div className="flex-1">
                            <EditTriggeredInput
                                inputClassName="font-bold text-2xl w-full py-2"
                                required={true}
                                {...form.register('name')}
                            />
                            <EditTriggeredInput
                                inputClassName="font-medium text-xl w-full"
                                required={true}
                                {...form.register('jobName')}
                            />
                        </div>
                        <Avatar src={profileImgUrl} className="w-10 h-10" />
                    </div>
                    {/*유저 가입 상태*/}
                    <div className="flex justify-between py-2">
                        <span className="text-base self-center">가입 상태</span>
                        <span className={`badge p-3 font-bold ${approvalStatus?.className}`}>
                            {approvalStatus?.label}
                        </span>
                    </div>

                    {/*초대날짜 / 가입날짜*/}
                    <div className="flex justify-between py-2">
                        <span className="self-center text-base">
                            {approvalStatus?.status === ApprovalStatus.PENDING ? '초대 날짜' : '가입 날짜'}
                        </span>
                        <p className="text-gray-500">{approvalDate}</p>
                    </div>
                </MobileSection.Padding>
            </MobileSection.Item>

            <MobileSection.Item>
                <MobileSection.Padding>
                    <p className="font-bold text-xl pb-3">연락처</p>
                    <MobileInfoList>
                        <MobileTeamMemberInfoInput label="휴대폰" required={true} {...form.register('phone')} />
                        <MobileTeamMemberInfoInput label="이메일" required={true} {...form.register('email')} />
                    </MobileInfoList>
                </MobileSection.Padding>
            </MobileSection.Item>
        </form>
    );
});
