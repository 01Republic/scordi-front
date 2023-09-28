import React, {memo} from 'react';
import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {ProductDto} from '^types/product.type';
import {ProductItem} from '^v3/share/modals/AccountListModal/ProductChangeModal/ProductItem';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';
import {useProductsOfAccounts} from '^v3/share/modals/AccountListModal/ProductChangeModal/use-products-of-accounts';

export const accountProductChangeModal = {
    isShowAtom: atom({
        key: 'accountProductChangeModal/isShow',
        default: false,
    }),
};

const hasAllOptionAtom = atom({
    key: 'hasAllOption/AccountProductChangeModal/Atom',
    default: false,
});

export const useAccountProductChangeModal = () => {
    const {...res} = useModal(accountProductChangeModal);
    const [hasAllOption, setHasAllOption] = useRecoilState(hasAllOptionAtom);

    return {...res, hasAllOption, setHasAllOption};
};

export const ProductChangeModal = memo(() => {
    const {isShow, Modal, CloseButton, close, hasAllOption} = useAccountProductChangeModal();
    const setSelectedProduct = useSetRecoilState(subjectProductOfAccountsInModalState);
    const {Product, Account} = useProductsOfAccounts(isShow);

    const onBack = () => close();

    // Update
    const changeProduct = (product: ProductDto) => {
        setSelectedProduct(product);
        onBack();
    };

    // Clear
    const clearProduct = () => {
        setSelectedProduct(null);
        onBack();
    };

    return (
        <Modal wrapperClassName="modal-bottom" className="pt-0">
            {isShow && <ChannelTalkHideStyle />}
            <h3 className="font-bold text-xl no-selectable -mx-6 p-6 bg-white sticky top-0 z-10 flex items-center justify-between">
                <span>서비스를 선택해주세요</span>
                <CloseButton />
            </h3>

            <div className="w-full flex flex-col gap-2 items-stretch pt-2">
                {Account && hasAllOption && <ProductItem onClick={clearProduct} accountManager={Account} />}
                {Account &&
                    Product &&
                    Product.all().map((product, i) => (
                        <ProductItem
                            key={i}
                            product={product}
                            onClick={() => changeProduct(product)}
                            accountManager={Account}
                        />
                    ))}
            </div>
        </Modal>
    );
});
