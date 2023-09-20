import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {ModalLikeTopbar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeTopbar';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {MobileSection} from '../../sections/MobileSection';
import {accountListModal, accountPagedInModalState} from './atom';
import {AccountList} from './AccountList';
import {AccountCreateModal, accountCreateModalShowAtom} from './AccountCreateModal';

export const AccountListModal = memo(() => {
    const {isShow, Modal, close} = useModal(accountListModal);
    const {open: openCreateModal} = useModal({isShowAtom: accountCreateModalShowAtom});
    const pagedAccounts = useRecoilValue(accountPagedInModalState);

    const onBack = () => close();

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
                {isShow && <ChannelTalkHideStyle />}
                <ModalLikeTopbar backBtnOnClick={onBack} topbarPosition="sticky" />

                <MobileSection.List>
                    <MobileSection.Item>
                        <MobileSection.Padding>
                            <div className="w-full h-[20px]" />
                            <div className="flex items-center space-x-2 mb-2">
                                <h3 className="h2">보관중인 계정</h3>
                            </div>
                        </MobileSection.Padding>
                    </MobileSection.Item>

                    <MobileSection.Item className="border-none">
                        <AccountList accounts={pagedAccounts.pagedData.items} />
                    </MobileSection.Item>
                </MobileSection.List>

                <ModalLikeBottomBar>
                    <button onClick={openCreateModal} className="btn btn-lg btn-block btn-scordi capitalize">
                        새 계정 등록하기
                    </button>
                </ModalLikeBottomBar>
            </Modal>
            <AccountCreateModal />
        </>
    );
});
