import React, {memo, useEffect, useRef} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {FormControl} from '^components/util/form-control';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {currentTeamMemberState, UpdateTeamMemberDto, useTeamMember, useTeamMembers} from '^models/TeamMember';
import {isTeamMemberEditModeAtom} from '../../atom';
import {BackButtonHijacker} from './BackButtonHijacker';
import {TeamSelect} from './TeamSelect';
import {EMAIL_REGEXP, emailValid} from '^utils/input-helper';
import {plainToast} from '^hooks/useToast';

export const TeamMemberEditPanel = memo(function TeamMemberEditPanel() {
    const [isEditMode, setIsEditMode] = useRecoilState(isTeamMemberEditModeAtom);
    const memberList = useTeamMembers();
    const {teamMember, updateMember} = useTeamMember(currentTeamMemberState);
    const form = useForm<UpdateTeamMemberDto>();
    const emailInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!teamMember || !isEditMode) return;

        if (teamMember.teams) {
            const teamIds = teamMember.validTeams.map((t) => t.id);
            form.setValue('teamIds', teamIds);
        }
        form.setValue('name', teamMember.name);
        form.setValue('notes', teamMember.notes || undefined);
        form.setValue('email', teamMember.email || undefined);
        form.setValue('phone', teamMember.phone || undefined);

        if (window) {
            const bindKeys = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setIsEditMode(false);
            };
            window.addEventListener('keydown', bindKeys);
            return () => {
                window.removeEventListener('keydown', bindKeys);
            };
        }
    }, [teamMember, isEditMode]);

    if (!teamMember) return <></>;

    const submitButtonClick = (data: UpdateTeamMemberDto) => {
        if (data.email && !emailValid(data.email)) {
            emailInputRef.current?.focus();
            plainToast.error('이메일 형식에 맞게 입력해주세요', {duration: 4000});
            return;
        }

        updateMember(data).then(() => {
            setIsEditMode(false);
            form.reset();
            if (memberList.isExist) memberList.reload();
        });
    };

    // const originalTeam = teamMember.team;
    // console.log('teamMember', teamMember);
    // console.log('originalTeam', originalTeam);

    return (
        <form>
            <BackButtonHijacker onClick={() => setIsEditMode(false)} />
            <MobileSection.Item className="border-b-0">
                <MobileSection.Padding>
                    <div className="w-full flex flex-col gap-4 mb-16">
                        <FormControl topLeftLabel="소속 팀 *">
                            <TeamSelect
                                onSelect={(selectedTeam) => {
                                    const teamIds = selectedTeam ? [selectedTeam.id] : [];
                                    form.setValue('teamIds', teamIds);
                                }}
                            />
                        </FormControl>

                        <FormControl topLeftLabel="이름 *">
                            <input type="text" required className="input input-bordered" {...form.register('name')} />
                        </FormControl>

                        <FormControl topLeftLabel="이메일">
                            <input
                                type="email"
                                className="input input-bordered"
                                {...form.register('email', {
                                    pattern: {
                                        value: EMAIL_REGEXP,
                                        message: '이메일 형식에 맞게 입력해주세요',
                                    },
                                })}
                            />
                        </FormControl>

                        <FormControl topLeftLabel="설명">
                            <input type="text" className="input input-bordered" {...form.register('notes')} />
                        </FormControl>

                        <FormControl topLeftLabel="전화번호">
                            <input type="tel" className="input input-bordered" {...form.register('phone')} />
                        </FormControl>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-2">
                        <button type="button" className="btn btn-lg rounded-box" onClick={() => setIsEditMode(false)}>
                            취소
                        </button>
                        <button
                            type="submit"
                            className="btn btn-lg btn-scordi rounded-box"
                            onClick={() => submitButtonClick(form.getValues())}
                        >
                            완료
                        </button>
                    </div>
                </MobileSection.Padding>
            </MobileSection.Item>
        </form>
    );
});
