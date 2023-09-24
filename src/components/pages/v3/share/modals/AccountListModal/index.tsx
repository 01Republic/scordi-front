import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {ModalLikeTopbar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeTopbar';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {MobileSection} from '../../sections/MobileSection';
import {accountListModal, subjectProductOfAccountsInModalState} from './atom';
import {AccountList} from './AccountList';
import {AccountCreateModal, accountCreateModalShowAtom} from './AccountCreateModal';
import {ProductSelector} from './ProductSelector';
import {ProductChangeModal} from './ProductChangeModal';
import {useAccounts} from '^hooks/useAccounts';
import {ProductDto} from '^types/product.type';
import {AccountEditModal} from '^v3/share/modals/AccountListModal/AccountEditModal';

export const AccountListModal = memo(() => {
    const {isShow, Modal, close} = useModal(accountListModal);
    const {open: openCreateModal} = useModal({isShowAtom: accountCreateModalShowAtom});
    const {result: pagedAccounts, search} = useAccounts();
    const product = useRecoilValue(subjectProductOfAccountsInModalState);
    const [originProduct, setOriginProduct] = useState<ProductDto | null>(null);

    const onBack = () => {
        const productId = originProduct?.id;
        search({where: {productId}, itemsPerPage: 0}, true).finally(() => close());
    };

    useEffect(() => {
        setOriginProduct(product);
    }, []);

    useEffect(() => {
        if (!product) return;

        search({where: {productId: product.id}, itemsPerPage: 0});
    }, [product]);

    return (
        <>
            <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] flex flex-col">
                {isShow && <ChannelTalkHideStyle />}
                <ModalLikeTopbar backBtnOnClick={onBack} topbarPosition="sticky" />

                <MobileSection.List className="flex-1">
                    <MobileSection.Item className="sticky top-[50px] bg-white z-10">
                        <MobileSection.Padding>
                            <div className="flex items-center space-x-2 mb-2">
                                <h3 className="h2 flex-1">보관중인 계정</h3>

                                {/*{pagedAccounts.subscription && (*/}
                                {/*    <ProductSelector product={pagedAccounts.subscription.product} />*/}
                                {/*)}*/}
                            </div>
                            <div className="flex pt-6">{product && <ProductSelector product={product} />}</div>
                        </MobileSection.Padding>
                    </MobileSection.Item>

                    <MobileSection.Item className="border-none">
                        <AccountList accounts={pagedAccounts.items} />
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
            <ProductChangeModal />
        </>
    );
});
