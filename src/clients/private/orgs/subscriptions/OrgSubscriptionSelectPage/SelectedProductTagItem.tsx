import {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {X} from 'lucide-react';

interface SelectedProductTagItemProps {
    product: ProductDto;
    unSelect: (product: ProductDto) => any;
}

export const SelectedProductTagItem = memo((props: SelectedProductTagItemProps) => {
    const {product, unSelect} = props;
    const color = getColor(product.id, palette.notionColors);

    return (
        <TagUI
            className={`${color} !text-16 !p-4 !flex gap-1 !items-center group hover:shadow transition-all`}
            onClick={() => unSelect(product)}
        >
            <span>{product.name()}</span>
            <X size={14} className="opacity-40 group-hover:opacity-60" />
        </TagUI>
    );
});
SelectedProductTagItem.displayName = 'SelectedProductTagItem';
