import React, {memo} from 'react';
import {ImageV2} from '^components/v2/ui/Image';
import {ProductDto, safeImageSrc} from '^types/product.type';
import {TitleSection} from '^components/v2/TitleSection';

type AppNameWithLogoBlockProps = {
    prototype: ProductDto;
};

export const AppNameWithLogoBlock = memo((props: AppNameWithLogoBlockProps) => {
    const {prototype} = props;

    return (
        <TitleSection.Title size="xl" className="flex items-center">
            <ImageV2 width={30} src={safeImageSrc(prototype, 30, 30)} alt={`${prototype.name} logo`} />
            <span className="mx-2">{prototype.name}</span>
        </TitleSection.Title>
    );
});
