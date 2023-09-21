import React, {memo, useEffect} from 'react';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {makeTeamMemberProfile, useCurrentTeamMember} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/atom';
import {useForm} from 'react-hook-form';
import {UpdateTeamMemberDto} from '^types/team-member.type';
import {teamMemberApi} from '^api/team-member.api';
import {MobileInfoList} from '^v3/share/MobileInfoList';
import {OnClickEditInput, MobileInfoInputList} from '^v3/V3OrgTeam/V3OrgTeamMemberShowPage/mobile/input';
import {Avatar} from '^components/Avatar';

export const TeamMemberInfoPanel = memo(() => {
    const {currentTeamMember: member, isLoading} = useCurrentTeamMember();
    const form = useForm<UpdateTeamMemberDto>();
    const {name, jobName, profileImgUrl, phone, email} = makeTeamMemberProfile(member);

    useEffect(() => {
        if (!member) return;

        form.setValue('name', name);
        form.setValue('jobName', jobName);
        form.setValue('profileImgUrl', profileImgUrl);
        form.setValue('phone', phone);
        form.setValue('email', email);
    }, [member]);

    if (!member) return <></>;
    const onSubmit = (data: UpdateTeamMemberDto) => {
        teamMemberApi.update(member.organizationId, member.id, data).then(({data}) => {
            console.log('update success');
            console.log(data);
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <MobileSection.Item>
                <MobileSection.Padding>
                    <div className="flex items-center space-x-2 mb-2">
                        <div>
                            <OnClickEditInput
                                className="font-bold text-2xl"
                                required={true}
                                {...form.register('name')}
                            />
                            <OnClickEditInput
                                className="font-medium text-xl"
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
                    <h4 className="pb-1">연락처</h4>
                    <MobileInfoList>
                        <MobileInfoInputList label="휴대폰" required={true} {...form.register('phone')} />
                        <MobileInfoInputList label="이메일" required={true} {...form.register('email')} />
                    </MobileInfoList>
                </MobileSection.Padding>
            </MobileSection.Item>
        </form>
    );
});
