import React, {memo} from 'react';
import {Check} from 'lucide-react';
import {ProductDto} from '^models/Product/type';
import {ProductAvatarImg} from '^components/pages/v3/share/ProductAvatar';

interface SelectableSubscriptionItemProps {
    product: ProductDto;
    isSelected: boolean;
    onClick: () => void;
}

export const SelectableSubscriptionItem = memo((props: SelectableSubscriptionItemProps) => {
    const {product, isSelected, onClick} = props;

    return (
        <div
            className="w-full cursor-pointer py-2 rounded-lg no-selectable hover:bg-scordi-light-50   group"
            onClick={onClick}
        >
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 ">
                    <ProductAvatarImg product={product} className="w-8 h-8" />
                    <span className="text-sm group-hover:text-indigo-500">{product.name()}</span>
                </div>
                <button className="relative">
                    <Check
                        strokeWidth={3}
                        className={`text-20 ${
                            isSelected ? `text-indigo-500` : 'text-transparent group-hover:text-indigo-200'
                        }`}
                    />
                </button>
            </div>
        </div>
    );
});

SelectableSubscriptionItem.displayName = 'SelectableSubscriptionItem';
