import React, {memo, useState} from 'react';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {useAltForm} from '^hooks/useAltForm';
import {toast} from 'react-hot-toast';
import {CreateTeamMemberDto, teamMemberApi} from '^models/TeamMember';
import {FormContainer} from '^clients/private/_components/containers';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {TeamBeforeSaveModal} from './TeamBeforeSaveModal';
import {TeamMemberTeamSelect} from './TeamMemberTeamSelect';

export const OrgTeamMemberNewPage = memo(function OrgTeamMemberNewPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {formData, setFormValue, handleSubmitPlain} = useAltForm<CreateTeamMemberDto>({} as CreateTeamMemberDto);
    const [isModalOpened, setModalOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const openModalWithData = (dto: CreateTeamMemberDto) => {
        const {teamIds = '[]', ...data} = dto as any;
        setFormValue({
            ...data,
            teamIds: JSON.parse(teamIds || '[]'),
        });
        setModalOpened(true);
    };

    const onSubmit = (dto: CreateTeamMemberDto) => {
        teamMemberApi.isExist(orgId, {email: dto.email}).then((existTeam) => {
            existTeam ? toast.error('이미 존재하는 멤버입니다.') : openModalWithData(dto);
        });
    };

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        '팀',
                        {text: '구성원', active: false, href: OrgTeamMemberListPageRoute.path(orgId)},
                        {text: '구성원 추가', active: true},
                    ]}
                />

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl mb-1">구성원 추가</h1>
                        <p className="text-14 text-gray-500">
                            구성원을 스코디에 추가하기 위한 필수/선택 정보를 입력해주세요.
                        </p>
                    </div>
                </div>

                <FormContainer onSubmit={handleSubmitPlain(onSubmit)} isLoading={isLoading}>
                    <div className="px-4 py-8 border-b">
                        <div className="max-w-md mx-auto flex flex-col gap-8 mb-16">
                            <h2 className="leading-none text-xl font-semibold">필수정보</h2>
                            <FormControl label="이름" required>
                                <input
                                    className="input input-underline !bg-slate-100 w-full"
                                    name="name"
                                    defaultValue={formData.name}
                                    required
                                />
                                <span />
                            </FormControl>

                            <FormControl label="회사메일" required>
                                <input
                                    type="email"
                                    className="input input-underline !bg-slate-100 w-full"
                                    name="email"
                                    defaultValue={formData.email}
                                    required
                                />
                                <span />
                            </FormControl>
                            <FormControl label="전화번호" required>
                                <input
                                    type="tel"
                                    className="input input-underline !bg-slate-100 w-full"
                                    name="phone"
                                    defaultValue={formData.phone}
                                    required
                                />
                                <span />
                            </FormControl>
                        </div>

                        <div className="max-w-md mx-auto flex flex-col gap-8">
                            <h2 className="leading-none text-xl font-semibold">선택정보</h2>
                            <TeamMemberTeamSelect defaultValue={formData.teamIds} />
                        </div>
                    </div>
                </FormContainer>

                <TeamBeforeSaveModal
                    isOpened={isModalOpened}
                    onClose={() => setModalOpened(false)}
                    dto={formData}
                    setIsLoading={setIsLoading}
                />
            </MainContainer>
        </MainLayout>
    );
});
