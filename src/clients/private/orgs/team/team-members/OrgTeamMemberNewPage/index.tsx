import React, {memo, useState} from 'react';
import {MainContainer, MainLayout} from '^clients/private/_layouts/MainLayout';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {useOrgIdParam} from '^atoms/common';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {useAltForm} from '^hooks/useAltForm';
import {toast} from 'react-hot-toast';
import {CreateTeamMemberDto, teamMemberApi} from '^models/TeamMember';
import {FormContainer} from '^clients/private/_components/containers';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {TeamBeforeSaveModal} from './TeamBeforeSaveModal';
import {TeamMemberTeamSelect} from './TeamMemberTeamSelect';
import {useTranslation} from 'next-i18next';

export const OrgTeamMemberNewPage = memo(function OrgTeamMemberNewPage() {
    const {t} = useTranslation('members');
    const orgId = useOrgIdParam();
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
            existTeam ? toast.error(t('new.validation.memberExists') as string) : openModalWithData(dto);
        });
    };

    return (
        <MainLayout>
            <MainContainer>
                <Breadcrumb
                    paths={[
                        t('new.breadcrumb.team') as string,
                        {
                            text: t('new.breadcrumb.members') as string,
                            active: false,
                            href: OrgTeamMemberListPageRoute.path(orgId),
                        },
                        {text: t('new.breadcrumb.addMember') as string, active: true},
                    ]}
                />

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl mb-1">{t('new.title') as string}</h1>
                        <p className="text-14 text-gray-500">{t('new.description') as string}</p>
                    </div>
                </div>

                <FormContainer onSubmit={handleSubmitPlain(onSubmit)} isLoading={isLoading}>
                    <div className="px-4 py-8 border-b">
                        <div className="max-w-md mx-auto flex flex-col gap-8 mb-16">
                            <h2 className="leading-none text-xl font-semibold">{t('new.requiredInfo') as string}</h2>
                            <FormControl label={t('new.form.name') as string} required>
                                <input
                                    className="input input-underline !bg-slate-100 w-full"
                                    name="name"
                                    defaultValue={formData.name}
                                    required
                                />
                                <span />
                            </FormControl>

                            <FormControl label={t('new.form.companyEmail') as string} required>
                                <input
                                    type="email"
                                    className="input input-underline !bg-slate-100 w-full"
                                    name="email"
                                    defaultValue={formData.email}
                                    required
                                />
                                <span />
                            </FormControl>
                        </div>

                        <div className="max-w-md mx-auto flex flex-col gap-8">
                            <h2 className="leading-none text-xl font-semibold">{t('new.optionalInfo') as string}</h2>
                            <FormControl label={t('new.form.phone') as string}>
                                <input
                                    type="tel"
                                    className="input input-underline !bg-slate-100 w-full"
                                    name="phone"
                                    defaultValue={formData.phone}
                                />
                                <span />
                            </FormControl>
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
