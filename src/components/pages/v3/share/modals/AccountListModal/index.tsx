import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {MobileSection} from '../../sections/MobileSection';
import {accountListModal, subjectProductOfAccountsInModalState} from './atom';
import {AccountList} from './AccountList';
import {AccountCreateModal} from './AccountCreateModal';
import {ProductChangeModal, useAccountProductChangeModal} from './ProductChangeModal';
import {useAccounts} from '^hooks/useAccounts';
import {ProductDto} from '^types/product.type';
import {AccountEditModal} from './AccountEditModal';
import {useAccountCreateModal} from './AccountCreateModal/hook';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {HeaderPanel} from './HeaderPanel';
import {SelectProductModal} from './SelectProductModal';

export const AccountListModal = memo(() => {
    const {isShow, Modal, close} = useModal(accountListModal);
    const {show: openCreateModal} = useAccountCreateModal();
    const {result: pagedAccounts, fetchAllAccountsBy} = useAccounts();
    const product = useRecoilValue(subjectProductOfAccountsInModalState);
    const [originProduct, setOriginProduct] = useState<ProductDto | null>(null);
    const {setHasAllOption} = useAccountProductChangeModal();

    useEffect(() => {
        setHasAllOption(false);
    }, []);

    // 모달을 켜기 전 원래 조회하던 product 를 저장해둡니다.
    useEffect(() => {
        setOriginProduct(product);
    }, [product]);

    /**
     * product 를 변경하면, 그에 맞는 계정내역을 조회합니다.
     * ---
     * 페이지와는 달리, 모달은 구독 상세에서 진입하므로, 전체 옵션을 운영하지 않습니다.
     * 위 이유로 페이지와 공유하는 컴포넌트인 HeaderPanel 에 로직을 두지 않고
     * 대신에 껍데기 컨테이너에 해당하는 모달 컴포넌트에서 이 로직을 운영합니다.
     */
    useEffect(() => {
        if (!product) return;
        const productId = product.id;
        fetchAllAccountsBy({productId});
    }, [product]);

    // 모달을 닫으면 계정내역을 원래 조회하던 product 를 기준으로 다시 돌려둡니다.
    const onBack = () => {
        if (!originProduct) return;
        fetchAllAccountsBy({productId: originProduct.id}, true).finally(() => close());
    };

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] flex flex-col">
                {isShow && <ChannelTalkHideStyle />}
                <ModalTopbar backBtnOnClick={onBack} topbarPosition="sticky" />

                <MobileSection.List className="flex-1">
                    <HeaderPanel />

                    <MobileSection.Item className="border-none">
                        <AccountList accounts={pagedAccounts.items} hideProduct={true} />
                    </MobileSection.Item>
                </MobileSection.List>

                <ModalLikeBottomBar
                    className="sticky bottom-0"
                    style={{background: 'linear-gradient(0, white, transparent)'}}
                >
                    <button onClick={openCreateModal} className="btn btn-lg btn-block btn-scordi capitalize">
                        새 계정 등록하기
                    </button>
                </ModalLikeBottomBar>
            </Modal>

            <AccountCreateModal />
            <AccountEditModal />
            <SelectProductModal />
            <ProductChangeModal />
        </>
    );
});
