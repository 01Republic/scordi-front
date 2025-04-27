import {ProductAvatarImg} from '^components/pages/v3/share/ProductAvatar';
import {ProductDto} from '^models/Product/type';
import {Check} from 'lucide-react';
import {memo} from 'react';

interface SelectableSubscriptionItemProps {
    product: ProductDto;
    isSelected: boolean;
    onClick: () => void;
}

export const SelectableSubscriptionItem = memo(({product, isSelected, onClick}: SelectableSubscriptionItemProps) => {
    return (
        <button
            className="w-full p-4 rounded-lg hover:bg-scordi-50 flex items-center justify-between"
            onClick={onClick}
        >
            <div className="flex items-center gap-2">
                <ProductAvatarImg product={product} className="w-8 h-8" />
                <span className="text-sm">{product.name()}</span>
            </div>
            {isSelected && <Check className="w-5 h-5 text-scordi-500" />}
        </button>
    );
});

SelectableSubscriptionItem.displayName = 'SelectableSubscriptionItem';
