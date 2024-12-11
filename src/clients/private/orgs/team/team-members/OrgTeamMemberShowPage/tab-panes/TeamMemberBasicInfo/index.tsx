import React, {memo, useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {toast} from 'react-hot-toast';
import {teamMemberApi, UpdateTeamMemberDto} from '^models/TeamMember';
import {TeamTag} from '^models/Team/components/TeamTag';
import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {SelectTeam} from '^clients/private/orgs/team/team-members/OrgTeamMemberNewPage/SelectTeam';
import {teamMemberSubjectAtom} from '../../atom';

export const TeamMemberBasicInfo = memo(function TeamMemberBasicInfo() {
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
            toast.success('변경사항을 저장했어요.');
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
                            {isEditMode ? '취소' : '수정'}
                        </a>

                        {isEditMode && <button className="btn btn-sm btn-scordi">저장</button>}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md flex flex-col gap-4">
                            <h2 className="leading-none text-xl font-semibold pb-4">기본 정보</h2>

                            <FormControl label="이름" required={isEditMode}>
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

                            <FormControl label="회사메일" required={isEditMode}>
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
                                            <i className="text-12 text-gray-400">이메일을 등록해주세요</i>
                                        )}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="전화번호" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        type="tel"
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('phone')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        {currentTeamMember.phone || (
                                            <i className="text-12 text-gray-400">전화번호를 등록해주세요</i>
                                        )}
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="소속(팀)">
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
                                            <i className="text-gray-400">미설정</i>
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
