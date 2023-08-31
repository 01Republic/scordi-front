import React, {memo, ReactNode} from 'react';
import {TitleSection} from '^components/v2/TitleSection';
import {ProductDto} from '^types/product.type';

type SelectStatusSectionProps = {
    product: ProductDto;
    text?: ReactNode | undefined;
};

export const SelectedStatusSection = memo((props: SelectStatusSectionProps) => {
    const {product, text} = props;

    if (product === null) return <></>;

    return (
        <TitleSection.Simple>
            <div className="px-0 bs-col-7">
                <TitleSection.Title text={product.name} size="2xl" />
            </div>
            {text && (
                <div className="px-0 bs-col-5 text-right">
                    <p className="text-xl" style={{wordBreak: 'keep-all'}}>
                        {text}
                    </p>
                </div>
            )}
        </TitleSection.Simple>
    );
});
