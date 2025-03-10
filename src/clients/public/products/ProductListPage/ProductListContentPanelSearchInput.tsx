import {memo, useEffect} from 'react';
import {useProductsInSaaSCollection} from '^models/Product/hook';
import {debounce} from 'lodash';
import {useProductCategoryFeature} from './useProductCategoryFeature';
import {ProductListPageRoute} from '^pages/products';
import {Search} from 'lucide-react';

export const ProductListContentPanelSearchInput = memo(() => {
    const {search} = useProductsInSaaSCollection();
    const {currentCategory, setCurrentCategoryName} = useProductCategoryFeature();

    const onChange = debounce((keyword?: string) => {
        // history.pushState('', '', ProductListPageRoute.path());
        if (keyword) {
            search({
                keyword,
                itemsPerPage: 0,
            });
            setCurrentCategoryName(`Search: ${keyword}`);
        } else {
            search();
            setCurrentCategoryName(`☁️ All`);
        }
    }, 500);

    // 사이드패널에서 카테고리 클릭시, 인풋을 클리어해줍니다.
    useEffect(() => {
        // 카테고리가 변경될 때 마다,

        // 카테고리가 'Search: ' 로 시작하면, 검색으로 인한 변동이르모, 인풋을 비우지 않도록 합니다.
        if (currentCategory.startsWith('Search: ')) return;

        // form.setValue('name', '');
    }, [currentCategory]);

    return (
        <div className="relative flex-1 sm:flex-none">
            <label>
                <input
                    type="text"
                    className="input input-bordered min-w-[300px] w-full pl-[48px]"
                    placeholder="Search ..."
                    onChange={(e) => onChange(e.target.value.trim())}
                />
                <div className="absolute top-0 bottom-0 m-auto w-[48px] h-[48px] flex items-center justify-center text-gray-400">
                    <Search />
                </div>
            </label>
        </div>
    );
});
