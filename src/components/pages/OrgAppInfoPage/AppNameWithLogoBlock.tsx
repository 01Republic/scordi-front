import React, {memo} from 'react';
import {ImageV2} from '^components/v2/ui/Image';
import {ProductDto, safeImageSrc} from '^models/Product/type';
import {TitleSection} from '^components/v2/TitleSection';

type AppNameWithLogoBlockProps = {
    product: ProductDto;
};

export const AppNameWithLogoBlock = memo((props: AppNameWithLogoBlockProps) => {
    const {product} = props;

    return (
        <TitleSection.Title size="xl" className="flex items-center">
            <ImageV2 width={30} src={safeImageSrc(product, 30, 30)} alt={`${product.nameEn} logo`} />
            <span className="mx-2">{product.nameEn}</span>
        </TitleSection.Title>
    );
});
