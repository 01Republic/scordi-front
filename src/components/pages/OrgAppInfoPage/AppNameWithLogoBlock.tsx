import React, {memo} from 'react';
import {ImageV2} from '^components/v2/ui/Image';
import {ProductDto, safeImageSrc} from '^types/product.type';
import {TitleSection} from '^components/v2/TitleSection';

type AppNameWithLogoBlockProps = {
    product: ProductDto;
};

export const AppNameWithLogoBlock = memo((props: AppNameWithLogoBlockProps) => {
    const {product} = props;

    return (
        <TitleSection.Title size="xl" className="flex items-center">
            <ImageV2 width={30} src={safeImageSrc(product, 30, 30)} alt={`${product.name} logo`} />
            <span className="mx-2">{product.name}</span>
        </TitleSection.Title>
    );
});
