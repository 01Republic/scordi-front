import React, {memo, useEffect, useRef, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {CreateTeamMemberDto, TeamMemberDto} from '^models/TeamMember';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {createNewTeamMemberAtom, isOpenNewTeamMemberModalAtom} from './atom';
import {FormControl, RequiredFormControl} from '^components/util/form-control';
import {TeamSelect} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/TeamMemberEditPanel/TeamSelect';
import {CTAButton} from '^v3/share/modals/NewTeamMemberModal/CreateTeamMemberModal/CTAButton';
import {ModalTitle} from '^v3/share/modals/ModalTitle';
import {FormControlGroup} from '^components/util/form-control/FormControlGroup';

interface NewTeamMemberModalProps {
    onSubmit?: () => any;
}

export const CreateTeamMemberModal = memo((props: NewTeamMemberModalProps) => {
    const {close, Modal, isShow} = useModal({isShowAtom: isOpenNewTeamMemberModalAtom});

    const setFormData = useSetRecoilState(createNewTeamMemberAtom);
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const {onSubmit: _onSubmit} = props;

    useEffect(() => {
        setFormData({} as CreateTeamMemberDto);
    }, [isShow]);

    const backBtnOnClick = () => {
        close();
    };

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-20">
                <ModalTopbar backBtnOnClick={backBtnOnClick} topbarPosition="sticky" />

                <MobileSection.Padding>
                    <ModalTitle title={'새로운 멤버를\n등록합니다.'} />
                </MobileSection.Padding>
                <MobileSection.Padding>
                    <FormControlGroup>
                        <RequiredFormControl topLeftLabel="이름">
                            <input
                                ref={nameInputRef}
                                type="text"
                                required
                                className="input input-bordered"
                                placeholder="ex. 김규리"
                                onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}))}
                            />
                        </RequiredFormControl>

                        <RequiredFormControl topLeftLabel="이메일">
                            <input
                                ref={emailInputRef}
                                type="email"
                                required
                                className="input input-bordered"
                                placeholder="ex. diana@01republic.io"
                                onChange={(e) => setFormData((prev) => ({...prev, email: e.target.value}))}
                            />
                        </RequiredFormControl>

                        <FormControl topLeftLabel="소속 팀">
                            <TeamSelect
                                onSelect={(selectedTeam) => {
                                    const teamIds = selectedTeam ? [selectedTeam.id] : [];
                                    setFormData((prev) => ({...prev, teamIds: teamIds}));
                                }}
                            />
                        </FormControl>
                    </FormControlGroup>
                </MobileSection.Padding>

                <ModalLikeBottomBar>
                    <CTAButton nameInputRef={nameInputRef} emailInputRef={emailInputRef} onSubmit={_onSubmit} />
                </ModalLikeBottomBar>
            </Modal>
        </form>
    );
});
