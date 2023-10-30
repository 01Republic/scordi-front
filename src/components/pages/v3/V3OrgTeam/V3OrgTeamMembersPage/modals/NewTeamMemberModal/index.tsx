import React, {memo} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {isOpenNewTeamMemberModalAtom} from '^components/pages/v3/V3OrgTeam/V3OrgTeamMembersPage/modals/NewTeamMemberModal/atom';
import {CreateTeamMemberDto} from '^types/team-member.type';
import {useForm} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {teamMemberApi} from '^api/team-member.api';
import {useRecoilValue} from 'recoil';
import {useRouter} from 'next/router';
import {orgIdParamState} from '^atoms/common';
import {V3OrgTeamMemberShowPageRoute} from '^pages/v3/orgs/[orgId]/teams/members/[memberId]';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {V3OrgTeamMembersPageRoute} from '^pages/v3/orgs/[orgId]/teams/members';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';

export const NewTeamMemberModal = memo(() => {
    const router = useRouter();
    const orgId = useRecoilValue(orgIdParamState);

    const {close, Modal} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});
    const form = useForm<CreateTeamMemberDto>();

    const onSubmit = (data: CreateTeamMemberDto) => {
        teamMemberApi
            .create(orgId, data)
            .then((res) => {
                const newMember = res.data;
                router.push(V3OrgTeamMemberShowPageRoute.path(orgId, newMember.id));
            })
            .finally(() => close());
    };

    const backBtnOnClick = () => {
        close();
        router.push(V3OrgTeamMembersPageRoute.path(orgId));
    };

    return (
        <form>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-20">
                <ModalTopbar
                    backBtnOnClick={backBtnOnClick}
                    // title={'멤버 등록}
                    topbarPosition="sticky"
                />
                <MobileSection.List>
                    <MobileSection.Item className="border-none">
                        <MobileSection.Padding>
                            <div className="h-full py-32">
                                <h3 className="font-bold text-2xl py-5">
                                    멤버를 <br /> 등록해보세요.
                                </h3>

                                <div className="py-5">
                                    <TextInput
                                        label={'이름'}
                                        inputClass="bg-white border-b-2"
                                        {...form.register('name', {required: true})}
                                    />
                                </div>
                                <div className="py-5">
                                    <TextInput label={'직급'} {...form.register('jobName', {required: true})} />
                                </div>
                            </div>
                        </MobileSection.Padding>
                    </MobileSection.Item>
                </MobileSection.List>
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
