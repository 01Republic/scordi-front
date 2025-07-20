import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {teamMemberApi, UpdateTeamMemberDto} from '^models/TeamMember';
import {TeamTag} from '^models/Team/components/TeamTag';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {SelectTeam} from '^clients/private/orgs/team/team-members/OrgTeamMemberNewPage/SelectTeam';
import {teamMemberSubjectAtom} from '../../atom';
import {useTranslation} from 'next-i18next';

export const TeamMemberBasicInfo = memo(function TeamMemberBasicInfo() {
    const {t} = useTranslation('members');
    const [currentTeamMember, setCurrentTeamMember] = useRecoilState(teamMemberSubjectAtom);
    const form = useForm<UpdateTeamMemberDto>();
    const [isEditMode, setIsEditMode] = useState(false);

    const initForm = () => {
        if (!currentTeamMember) return;
        form.setValue('name', currentTeamMember.name);
        form.setValue('email', currentTeamMember.email || undefined);
        form.setValue('phone', currentTeamMember.phone || undefined);
        form.setValue('jobName', currentTeamMember.jobName || undefined);
        form.setValue('jobDescription', currentTeamMember.jobDescription || undefined);
        form.setValue('profileImgUrl', currentTeamMember.profileImgUrl || null);
        form.setValue('jobDescription', currentTeamMember.jobDescription || undefined);
        if (currentTeamMember.teams) {
            const teamIds = currentTeamMember.teams.map((t) => t.id);
            form.setValue('teamIds', teamIds);
        }
    };

    useEffect(() => initForm(), [currentTeamMember]);

    const onSubmit = (dto: UpdateTeamMemberDto) => {
        if (!isEditMode) return;
        if (!currentTeamMember) return;

        teamMemberApi.update(currentTeamMember.organizationId, currentTeamMember.id, dto).then((res) => {
            toast.success(t('basicInfo.messages.changeSaved') as string);
            setIsEditMode(false);
            setCurrentTeamMember(res.data);
        });
    };

    if (!currentTeamMember) return <></>;

    const teams = currentTeamMember.teams || [];

    return (
        <section className="py-8">
            <div className="card card-bordered bg-white rounded-md relative">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                        <a
                            className="link text-14"
                            onClick={() => {
                                setIsEditMode((v) => {
                                    if (v) initForm();
                                    return !v;
                                });
                            }}
                        >
                            {isEditMode
                                ? (t('basicInfo.actions.cancel') as string)
                                : (t('basicInfo.actions.edit') as string)}
                        </a>

                        {isEditMode && (
                            <button className="btn btn-sm btn-scordi">{t('basicInfo.actions.save') as string}</button>
                        )}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md flex flex-col gap-4">
                            <h2 className="leading-none text-xl font-semibold pb-4">
                                {t('basicInfo.title') as string}
                            </h2>

                            <FormControl label={t('basicInfo.form.name') as string} required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('name')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {currentTeamMember.name}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label={t('basicInfo.form.companyEmail') as string} required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        type="email"
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('email')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {currentTeamMember.email || (
                                            <i className="text-12 text-gray-400">
                                                {t('basicInfo.form.emailPlaceholder') as string}
                                            </i>
                                        )}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label={t('basicInfo.form.phone') as string}>
                                {isEditMode ? (
                                    <input
                                        type="tel"
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('phone')}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {currentTeamMember.phone || (
                                            <i className="text-12 text-gray-400">
                                                {t('basicInfo.form.phonePlaceholder') as string}
                                            </i>
                                        )}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label={t('basicInfo.form.team') as string}>
                                {isEditMode ? (
                                    <SelectTeam
                                        defaultTeams={teams}
                                        onChange={(teams) => {
                                            const teamIds = teams.map((t) => t.id);
                                            form.setValue('teamIds', teamIds);
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center gap-1" style={{height: '49.5px'}}>
                                        {teams.length > 0 ? (
                                            teams.map((team, i) => <TeamTag id={team.id} name={team.name} key={i} />)
                                        ) : (
                                            <i className="text-gray-400">{t('basicInfo.form.notSet') as string}</i>
                                        )}
                                    </div>
                                )}
                            </FormControl>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
});
