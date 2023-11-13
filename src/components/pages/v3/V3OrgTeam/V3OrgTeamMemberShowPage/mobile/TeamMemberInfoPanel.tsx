import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {makeTeamMemberProfile, useCurrentTeamMember} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';
import {UseFormReturn} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^models/TeamMember/types/team-member.type';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {
    EditTriggeredInput,
    isTeamMemberInfoEditableAtom,
    MobileTeamMemberInfoInput,
} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/input';
import {Avatar} from '^components/Avatar';
import {useRecoilValue} from 'recoil';

interface TeamMemberInfoPanelProps {
    form: UseFormReturn<UpdateTeamMemberDto>;
    onSubmit: (data: UpdateTeamMemberDto) => void;
}

/**
 * 첫 수정 시 완료 버튼을 두 번 클릭해야 submit 되는 현상이 있습니다.
 */
export const TeamMemberInfoPanel = memo((props: TeamMemberInfoPanelProps) => {
    const {form, onSubmit} = props;
    const {currentTeamMember: member, isLoading} = useCurrentTeamMember();
    const {profileImgUrl} = makeTeamMemberProfile(member);
    const isEditable = useRecoilValue(isTeamMemberInfoEditableAtom);

    useEffect(() => {
        const touchedFields = Object.values(form.formState.touchedFields);
        if (touchedFields.length > 0 && !isEditable) onSubmit(form.getValues());
    }, [isEditable, form.formState.touchedFields]);

    if (!member) return <></>;

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
