import { memo } from 'react';
import { Check } from 'lucide-react';
import { ProductDto } from '^models/Product/type';
import { ProductAvatarImg } from '^components/pages/v3/share/ProductAvatar';

interface SelectableSubscriptionItemProps {
    product: ProductDto;
    isSelected: boolean;
    onClick: () => void;
}

export const SelectableSubscriptionItem = memo((props: SelectableSubscriptionItemProps) => {
    const { product, isSelected, onClick } = props;

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
