import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {useForm} from 'react-hook-form';
import {MobileSection} from '^components/pages/v3/share/sections/MobileSection';
import {currentTeamMemberState, UpdateTeamMemberDto, useTeamMember, useTeamMembers} from '^models/TeamMember';
import {isTeamMemberEditModeAtom} from '../../atom';

export const TeamMemberEditPanel = memo(function TeamMemberEditPanel() {
    const currentMember = useRecoilValue(currentTeamMemberState);
    const setIsEditMode = useSetRecoilState(isTeamMemberEditModeAtom);
    const memberList = useTeamMembers();
    const {updateMember} = useTeamMember(currentTeamMemberState);
    const form = useForm<UpdateTeamMemberDto>();

    if (!currentMember) return <></>;

    const submitButtonClick = (data: UpdateTeamMemberDto) => {
        updateMember(data).then(() => {
            setIsEditMode(false);
            if (memberList.isExist) memberList.reload();
        });
    };

    return (
        <form>
            <MobileSection.Item>
                <MobileSection.Padding>
                    <div className="w-full flex flex-col gap-4 mb-16"></div>

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
