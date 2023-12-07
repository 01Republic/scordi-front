import React, {memo, useEffect} from 'react';
import {useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {FormControl} from '^components/util/form-control';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {currentTeamMemberState, UpdateTeamMemberDto, useTeamMember, useTeamMembers} from '^models/TeamMember';
import {isTeamMemberEditModeAtom} from '../../atom';

export const TeamMemberEditPanel = memo(function TeamMemberEditPanel() {
    const setIsEditMode = useSetRecoilState(isTeamMemberEditModeAtom);
    const memberList = useTeamMembers();
    const {teamMember, updateMember} = useTeamMember(currentTeamMemberState);
    const form = useForm<UpdateTeamMemberDto>();

    useEffect(() => {
        if (!teamMember) return;

        form.setValue('name', teamMember.name);
        form.setValue('profileImgUrl', teamMember.profileImgUrl);
        form.setValue('notes', teamMember.notes);
        form.setValue('email', teamMember.email);
        form.setValue('phone', teamMember.phone);

        if (window) {
            const bindKeys = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setIsEditMode(false);
            };
            window.addEventListener('keydown', bindKeys);
            return () => {
                window.removeEventListener('keydown', bindKeys);
            };
        }
    }, [teamMember]);

    if (!teamMember) return <></>;

    const submitButtonClick = (data: UpdateTeamMemberDto) => {
        updateMember(data).then(() => {
            setIsEditMode(false);
            form.reset();
            if (memberList.isExist) memberList.reload();
        });
    };

    return (
        <form>
            <MobileSection.Item>
                <MobileSection.Padding>
                    <div className="w-full flex flex-col gap-4 mb-16">
                        <FormControl topLeftLabel="이름 *">
                            <input type="text" required className="input input-bordered" {...form.register('name')} />
                        </FormControl>

                        <FormControl topLeftLabel="프로필 이미지 (주소)">
                            <input type="text" className="input input-bordered" {...form.register('profileImgUrl')} />
                        </FormControl>

                        <FormControl topLeftLabel="설명">
                            <input type="text" className="input input-bordered" {...form.register('notes')} />
                        </FormControl>

                        <FormControl topLeftLabel="이메일">
                            <input type="email" className="input input-bordered" {...form.register('email')} />
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
