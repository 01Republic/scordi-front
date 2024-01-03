import React, {memo, useEffect, useRef} from 'react';
import {useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {orgIdParamState} from '^atoms/common';
import {teamMemberApi, CreateTeamMemberDto, TeamMemberDto} from '^models/TeamMember';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {isOpenNewTeamMemberModalAtom} from './atom';
import {FormControl} from '^components/util/form-control';
import {plainToast} from '^hooks/useToast';
import {TeamSelect} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/TeamMemberEditPanel/TeamSelect';

interface NewTeamMemberModalProps {
    onSubmit: (savedTeamMember: TeamMemberDto) => any;
}

export const NewTeamMemberModal = memo((props: NewTeamMemberModalProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {close, Modal, isShow} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const form = useForm<CreateTeamMemberDto>();
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const {onSubmit: _onSubmit} = props;

    useEffect(() => {
        form.reset();
    }, [isShow]);

    const onSubmit = () => {
        const data = form.getValues();
        const duration = 4000;

        if (!data.name) {
            nameInputRef.current?.focus();
            plainToast.error('이름을 입력해주세요', {duration});
            return;
        }

        if (!data.email) {
            emailInputRef.current?.focus();
            plainToast.error('이메일을 입력해주세요', {duration});
            return;
        }

        teamMemberApi.create(orgId, data).then((res) => {
            plainToast.success('추가되었습니다', {duration});
            close();
            form.reset();
            _onSubmit(res.data);
        });
    };

    const backBtnOnClick = () => {
        close();
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-20">
                <ModalTopbar backBtnOnClick={backBtnOnClick} topbarPosition="sticky" />

                <MobileSection.Padding>
                    <div>
                        <h3 className="font-bold text-2xl pt-5 mb-10">
                            새로운 멤버를 <br /> 등록합니다.
                        </h3>

                        <div className="w-full flex flex-col gap-4">
                            <FormControl topLeftLabel="소속 팀">
                                <TeamSelect
                                    onSelect={(selectedTeam) => {
                                        const teamIds = selectedTeam ? [selectedTeam.id] : [];
                                        form.setValue('teamIds', teamIds);
                                    }}
                                />
                            </FormControl>

                            <FormControl topLeftLabel="이름">
                                <input
                                    ref={nameInputRef}
                                    type="text"
                                    required
                                    className="input input-bordered"
                                    placeholder="ex. 김규리"
                                    onChange={(e) => form.setValue('name', e.target.value)}
                                />
                            </FormControl>

                            <FormControl topLeftLabel="이메일">
                                <input
                                    ref={emailInputRef}
                                    type="email"
                                    required
                                    className="input input-bordered"
                                    placeholder="ex. diana@01republic.io"
                                    onChange={(e) => form.setValue('email', e.target.value)}
                                />
                            </FormControl>
                        </div>
                    </div>
                </MobileSection.Padding>

                <ModalLikeBottomBar>
                    <button
                        className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50"
                        type="submit"
                        onClick={() => onSubmit()}
                    >
                        완료
                    </button>
                </ModalLikeBottomBar>
            </Modal>
        </form>
    );
});
