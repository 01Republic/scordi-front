import {memo, useEffect} from 'react';
import {ProductPostListContentPanelTitle} from './ProductPostListContentPanelTitle';
import {ProductPostListContentPanelSearchInput} from './ProductPostListContentPanelSearchInput';
import {ProductPostListContentPanelItem} from './ProductPostListContentPanelItem';
import {useRecoilValue} from 'recoil';
import {getPostListResultAtom} from '^atoms/posts.atom';
import {currentProductPostCategoryAtom} from '^components/pages/products/ProductPostListPage/ProductPostListSidePanel';
import {useTags} from '^hooks/useTags';
import {TagGroup} from '^types/tag.type';
import {useProductPosts} from '^hooks/usePosts';

export const ProductPostListContentPanel = memo(() => {
    const {search: searchTags} = useTags(TagGroup.Application);
    const {search: searchPosts} = useProductPosts();

    const currentCategory = useRecoilValue(currentProductPostCategoryAtom);
    const postResult = useRecoilValue(getPostListResultAtom);

    useEffect(() => {
        const [emoji, ...nameStrings] = currentCategory.split(' ');
        const name = nameStrings.join(' ');
        if (name === 'All') {
            searchPosts({});
        } else {
            searchTags({where: {name}}).then((tags) => {
                const tagIds = tags.map((tag) => tag.id);
                searchPosts({tagIds});
            });
        }
    }, [currentCategory]);

    return (
        <div>
            <div className="flex justify-between items-center mb-[60px]">
                <ProductPostListContentPanelTitle title={currentCategory} />
                <ProductPostListContentPanelSearchInput />
            </div>

            <div className="grid grid-cols-3 gap-3">
                {postResult.items.map((post) => (
                    <ProductPostListContentPanelItem post={post} />
                ))}
            </div>

            <div>
                <p className="text-2xl text-center text-gray-500">All-in-one SaaS for SaaS 🧑‍💻</p>
            </div>
        </div>
    );
});
