import {memo, useEffect} from 'react';
import {BsSearch} from 'react-icons/bs';
import {useForm} from 'react-hook-form';
import {useProductSearch, useProductsV2} from '^models/Product/hook';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {currentProductCategoryAtom} from '^components/pages/products/ProductListPage/ProductListSidePanel';
import {FindAllProductQuery} from '^models/Product/type';

export const ProductListContentPanelSearchInput = memo(() => {
    // const {search} = useProductSearch();
    const {search} = useProductsV2();
    const form = useForm<FindAllProductQuery>();
    const [currentCategory, setCurrentCategory] = useRecoilState(currentProductCategoryAtom);
    const onSubmit = (query: FindAllProductQuery) => {
        const name = query.name;
        if (name) {
            query.order = {id: 'DESC'};
            search(query);
            setCurrentCategory(`Search: ${query.name}`);
        } else {
            search({
                isLive: true,
                itemsPerPage: 0,
                order: {id: 'DESC'},
            });
            setCurrentCategory(`☁️ All`);
        }
    };

    // 사이드패널에서 카테고리 클릭시, 인풋을 클리어해줍니다.
    useEffect(() => {
        // 카테고리가 변경될 때 마다,

        // 카테고리가 'Search: ' 로 시작하면, 검색으로 인한 변동이르모, 인풋을 비우지 않도록 합니다.
        if (currentCategory.startsWith('Search: ')) return;

        form.resetField('name');
    }, [currentCategory]);

    return (
        <div className="relative flex-1 sm:flex-none">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <input
                    type="text"
                    className="input input-bordered min-w-[300px] w-full pl-[48px]"
                    placeholder="Search ..."
                    {...form.register('name')}
                />
                <div className="absolute top-0 bottom-0 m-auto w-[48px] h-[48px] flex items-center justify-center text-gray-400">
                    <BsSearch />
                </div>
            </form>
        </div>
    );
});
