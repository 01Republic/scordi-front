import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {SelectTeam} from '^clients/private/orgs/team/team-members/OrgTeamMemberNewPage/SelectTeam';
import React, {memo, useState} from 'react';
import {useForm} from 'react-hook-form';

type updateSubscriptionBasicInfo = {
    name: string;
    team: string;
    man: string;
    text: string;
};

export const SubscriptionBasicInfoSection = memo(() => {
    const form = useForm<updateSubscriptionBasicInfo>();
    const [isEditMode, setIsEditMode] = useState(false);

    const onSubmit = (dto: updateSubscriptionBasicInfo) => {
        console.log(dto);
    };

    return (
        <section>
            <div className="card card-bordered bg-white rounded-md relative">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                        <a className="link text-14" onClick={() => setIsEditMode((v) => !v)}>
                            {isEditMode ? '취소' : '수정'}
                        </a>

                        {isEditMode && <button className="btn btn-sm btn-scordi">저장</button>}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md flex flex-col gap-4">
                            <h2 className="leading-none text-xl font-semibold pb-4">기본 정보</h2>

                            <FormControl label="워크스페이스명" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('name')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        Notion
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="소속(팀)">
                                {isEditMode ? (
                                    <SelectTeam
                                        defaultTeams={[]}
                                        onChange={(teams) => {
                                            const teamIds = teams.map((t) => t.id);
                                            form.setValue('team', '');
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center gap-1" style={{height: '49.5px'}}>
                                        <i className="text-gray-400">미설정</i>
                                        {/*{teams.length > 0 ? (*/}
                                        {/*    teams.map((team, i) => <TeamTag id={team.id} name={team.name} key={i} />)*/}
                                        {/*) : (*/}
                                        {/*    <i className="text-gray-400">미설정</i>*/}
                                        {/*)}*/}
                                    </div>
                                )}
                            </FormControl>

                            <FormControl label="담당자" required={isEditMode}>
                                {isEditMode ? (
                                    <SelectTeam
                                        defaultTeams={[]}
                                        onChange={(teams) => {
                                            const teamIds = teams.map((t) => t.id);
                                            form.setValue('team', '');
                                        }}
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        김규리
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="비고" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        type="tel"
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('text')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        비고비고
                                    </div>
                                )}
                                <span />
                            </FormControl>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
});
