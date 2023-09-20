import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {isOpenNewTeamMemberModalAtom} from '^v3/V3OrgTeam/V3OrgTeamMembersPage/NewTeamMemberModal/atom';
import {CreateTeamMemberDto} from '^types/team-member.type';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {ContentPanelInput} from '^layouts/ContentLayout';
import {teamMemberApi} from '^api/team-member.api';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {V3OrgTeamMemberShowPageRoute} from '^pages/v3/orgs/[orgId]/teams/members/[memberId]';

export const NewTeamMemberModal = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    const {Modal} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const form = useForm<CreateTeamMemberDto>();

    const onSubmit = (data: CreateTeamMemberDto) => {
        teamMemberApi.create(orgId, data).then((res) => {
            const newMember = res.data;
            router.push(V3OrgTeamMemberShowPageRoute.path(orgId, newMember.id));
        });
    };

    return (
        <Modal className="py-12">
            <div className="flex items-center justify-center gap-3 mb-10">
                <h3 className="font-bold text-2xl">멤버를 등록해보세요.</h3>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <ContentPanelInput title={'이름'}>
                        <TextInput required={true} placeholder="스코디" {...form.register('name', {required: true})} />
                    </ContentPanelInput>
                    <ContentPanelInput title={'직급'}>
                        <TextInput
                            required={true}
                            placeholder="스코디"
                            {...form.register('jobName', {required: true})}
                        />
                    </ContentPanelInput>

                    <button type={'submit'}>완료</button>
                </form>
            </div>
            <div className="text-center"></div>
        </Modal>
    );
});
