import {memo} from 'react';
import {useProductCategoryFeature} from './useProductCategoryFeature';

interface TitleProps {}

export const ProductListContentPanelTitle = memo((props: TitleProps) => {
    const {currentCategoryName, currentCategory} = useProductCategoryFeature();

    return (
        <div className="hidden sm:block">
            <h2 className="text-5xl">
                {currentCategoryName.startsWith('Search') ? currentCategoryName : currentCategory}
            </h2>
        </div>
    );
});
