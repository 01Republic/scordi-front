import React, {memo, useEffect} from 'react';
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
import {useToast} from '^hooks/useToast';

interface NewTeamMemberModalProps {
    onSubmit: (savedTeamMember: TeamMemberDto) => any;
}

export const NewTeamMemberModal = memo((props: NewTeamMemberModalProps) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {toast} = useToast();

    const {close, Modal, isShow} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const form = useForm<CreateTeamMemberDto>();

    const {onSubmit: _onSubmit} = props;

    useEffect(() => {
        form.reset();
    }, [isShow]);

    const onSubmit = () => {
        const data = form.getValues();

        if (!data.name) {
            toast.error('이름을 입력해주세요');
            return;
        }

        if (!data.email) {
            toast.error('이메일 입력해주세요');
            return;
        }

        teamMemberApi.create(orgId, data).then((res) => {
            toast.success('추가되었습니다');
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
                            <FormControl topLeftLabel="이름">
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered"
                                    placeholder="ex. 김규리"
                                    onChange={(e) => form.setValue('name', e.target.value)}
                                />
                            </FormControl>

                            <FormControl topLeftLabel="이메일">
                                <input
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
                        onClick={onSubmit}
                    >
                        완료
                    </button>
                </ModalLikeBottomBar>
            </Modal>
        </form>
    );
});
