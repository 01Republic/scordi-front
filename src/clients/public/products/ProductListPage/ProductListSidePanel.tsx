import {memo} from 'react';
import {PiCaretDownBold} from 'react-icons/pi';
import {ProductListSidePanelItem} from './ProductListSidePanelItem';
import {ProductsOnTagPageRoute} from '^pages/products/tags/[tagName]';
import {useProductCategoryFeature} from '^clients/public/products/ProductListPage/useProductCategoryFeature';
import {ProductListPageRoute} from '^pages/products';

export const ProductListSidePanel = memo(() => {
    const {categoryTextList, currentCategory, setCurrentCategoryName, toParam} = useProductCategoryFeature();
    const isActive = (category: string) => category === currentCategory;

    const clickCategory = (text: string) => {
        const cateName = toParam(text);
        const url = cateName === 'all' ? ProductListPageRoute.path() : ProductsOnTagPageRoute.path(cateName);
        history.pushState('', '', url);
        setCurrentCategoryName(cateName);
        const elem = document.activeElement as HTMLElement | null;
        if (elem) elem.blur();
    };

    return (
        <>
            <div className="sm:hidden dropdown dropdown-bottom dropdown-end w-full mb-[2rem]">
                <label tabIndex={0} className="btn btn-block rounded-full normal-case justify-between text-[1rem]">
                    <span className="flex gap-3">
                        <span>{currentCategory.split(' ')[0]}</span>
                        <span>{currentCategory.split(' ').slice(1).join(' ')}</span>
                    </span>

                    <span>
                        <PiCaretDownBold />
                    </span>
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full overflow-y-auto max-h-[46vh] block"
                >
                    {categoryTextList.map((text, i) => (
                        <ProductListSidePanelItem
                            key={i}
                            text={text}
                            isActive={isActive}
                            onClick={() => clickCategory(text)}
                        />
                    ))}
                </ul>
            </div>

            <ul className="hidden sm:flex menu bg-base-100 py-0">
                {categoryTextList.map((text, i) => (
                    <ProductListSidePanelItem
                        key={i}
                        text={text}
                        isActive={isActive}
                        onClick={() => clickCategory(text)}
                    />
                ))}
            </ul>
        </>
    );
});
