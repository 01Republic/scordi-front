import React, {memo, useEffect, useState} from 'react';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {ChannelTalkHideStyle} from '^components/ExternalCDNScripts/channel-talk/ChannelTalkHideStyle';
import {ProductDto} from '^types/product.type';
import {orgIdParamState} from '^atoms/common';
import {getSubscriptions} from '^api/subscription.api';
import {SubscriptionManager} from '^models/Subscription';
import {ProductManager} from '^models/Product/manager';
import {ProductItem} from '^v3/share/modals/AccountListModal/ProductChangeModal/ProductItem';
import {accountApi} from '^api/account.api';
import {AccountManager} from '^models/Account/manager';
import {useAccounts} from '^hooks/useAccounts';
import {subjectProductOfAccountsInModalState} from '^v3/share/modals/AccountListModal/atom';

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
    const orgId = useRecoilValue(orgIdParamState);
    const {isShow, Modal, CloseButton, close, hasAllOption} = useAccountProductChangeModal();
    const [selectedProduct, setSelectedProduct] = useRecoilState(subjectProductOfAccountsInModalState);
    const {result: pagedAccounts, search} = useAccounts();
    const [Product, setProductManager] = useState<ProductManager>();
    const [Account, setAccountManager] = useState<AccountManager>();

    // Load page
    useEffect(() => {
        if (!isShow) return;
        if (!orgId || isNaN(orgId)) return;

        accountApi.index(orgId, {itemsPerPage: 0}).then((res) => {
            setAccountManager(AccountManager.init(res.data.items));
        });

        getSubscriptions({
            where: {organizationId: orgId},
            order: {productId: 'ASC'},
            itemsPerPage: 0,
        }).then((res) => {
            const products = SubscriptionManager.init(res.data.items).products();
            setProductManager(products.sortBy({id: 'ASC'}));
        });
    }, [isShow, orgId]);

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
