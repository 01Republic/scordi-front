import React, {memo} from 'react';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {AiOutlineCaretDown} from 'react-icons/ai';
import {ProductDto} from '^types/product.type';
import {accountProductChangeModal} from '^v3/share/modals/AccountListModal/ProductChangeModal';
import {useModal} from '^v3/share/modals/useModal';

interface ProductSelectorProps {
    product: ProductDto;
}

export const ProductSelector = memo((props: ProductSelectorProps) => {
    const {product} = props;
    const {open: openProductChangeModal} = useModal({isShowAtom: accountProductChangeModal.isShowAtom});

    const onClick = () => {
        openProductChangeModal();
    };

    return (
        <div className="flex items-center gap-4 cursor-pointer" onClick={onClick}>
            <ProductAvatar product={product} />
            <div>
                <AiOutlineCaretDown />
            </div>
        </div>
    );
});
