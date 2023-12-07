import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {teamMemberApi, useTeamMembers, CreateTeamMemberDto} from '^models/TeamMember';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {isOpenNewTeamMemberModalAtom} from './atom';
import {FormControl} from '^components/util/form-control';

export const NewTeamMemberModal = memo(() => {
    const router = useRouter();
    const list = useTeamMembers();
    const orgId = useRecoilValue(orgIdParamState);

    const {close, Modal} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const form = useForm<CreateTeamMemberDto>();

    const onSubmit = (data: CreateTeamMemberDto) => {
        teamMemberApi
            .create(orgId, data)
            .then(() => close())
            .then(() => {
                if (list.isExist) list.reload();
            });
    };

    const backBtnOnClick = () => {
        close();
        router.back();
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-20">
                <ModalTopbar backBtnOnClick={backBtnOnClick} topbarPosition="sticky" />

                <MobileSection.Padding>
                    <div>
                        <h3 className="font-bold text-2xl py-5">
                            멤버를 <br /> 등록해보세요.
                        </h3>

                        <div className="py-5">
                            <FormControl topLeftLabel="이름">
                                <input
                                    type="text"
                                    required
                                    className="input input-bordered"
                                    {...form.register('name', {required: true})}
                                    placeholder="ex. 김규리"
                                />
                            </FormControl>
                        </div>
                    </div>
                </MobileSection.Padding>

                <ModalLikeBottomBar>
                    <button
                        className="btn btn-lg btn-block btn-scordi font-medium font-white text-xl bg-slate-50"
                        type="button"
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        완료
                    </button>
                </ModalLikeBottomBar>
            </Modal>
        </form>
    );
});
