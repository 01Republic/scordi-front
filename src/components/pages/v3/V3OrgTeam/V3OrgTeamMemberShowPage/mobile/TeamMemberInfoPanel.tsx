import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {makeTeamMemberProfile, useCurrentTeamMember} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';
import {useForm, UseFormReturn} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^types/team-member.type';
import {teamMemberApi} from '^api/team-member.api';
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

export const TeamMemberInfoPanel = memo((props: TeamMemberInfoPanelProps) => {
    const {form, onSubmit} = props;
    const {currentTeamMember: member, isLoading} = useCurrentTeamMember();
    const {profileImgUrl} = makeTeamMemberProfile(member);
    const isEditable = useRecoilValue(isTeamMemberInfoEditableAtom);

    useEffect(() => {
        if (!isEditable) onSubmit(form.getValues());
    }, [isEditable]);

    if (!member) return <></>;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
