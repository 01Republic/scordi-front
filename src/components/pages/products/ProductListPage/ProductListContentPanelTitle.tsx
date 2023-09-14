import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {currentProductCategoryAtom} from '^components/pages/products/ProductListPage/ProductListSidePanel';

interface TitleProps {}

export const ProductListContentPanelTitle = memo((props: TitleProps) => {
    const currentCategory = useRecoilValue(currentProductCategoryAtom);

    return (
        <div className="hidden sm:block">
            <h2 className="text-5xl">{currentCategory}</h2>
        </div>
    );
});
