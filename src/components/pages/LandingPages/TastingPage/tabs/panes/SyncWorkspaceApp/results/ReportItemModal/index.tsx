import React, {memo} from 'react';
import {MobileSection} from '^components/pages/v3/share/sections/MobileSection';
import {useModal} from '^v3/share/modals/useModal';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {reportItemModalIsShow} from '../../atom';
import {ReportItemModalHeader} from './Header';
import {ReportItemModalMemberListTitle} from './MemberListTitle';
import {ReportItemModalMemberList} from './MemberList';
import {AddNewMemberService} from './AddNewMemberService';

export const ReportItemModal = memo(function ReportItemModal() {
    const {Modal, close} = useModal({isShowAtom: reportItemModalIsShow});

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.List>
                <ReportItemModalHeader />

                <MobileSection.Item className="border-none">
                    <MobileSection.Padding>
                        <ReportItemModalMemberListTitle />

                        <hr />

                        <ul
                            className="menu menu-compact lg:menu-normal bg-base-100 block -mx-4"
                            style={{
                                maxHeight: '50vh',
                                overflowY: 'auto',
                            }}
                        >
                            <ReportItemModalMemberList />
                            <AddNewMemberService />
                        </ul>
                    </MobileSection.Padding>
                </MobileSection.Item>

                <ModalLikeBottomBar>
                    <button className="btn btn-lg btn-block rounded-box btn-scordi-light-200 !text-gray-600">
                        스코디로 관리 시작하기
                    </button>
                </ModalLikeBottomBar>
            </MobileSection.List>
        </Modal>
    );
});
