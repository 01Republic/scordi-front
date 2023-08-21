import {memo} from 'react';
import {useProductPosts} from '^hooks/usePosts';
import {ProductPostItem} from '^components/pages/products/ProductPostListPage/ProductPostItem';
import {tagAtom} from '^atoms/tags.atom';
import {useRecoilValue} from 'recoil';

export const ProductPostItems = memo(() => {
    const {result} = useProductPosts();
    const tag = useRecoilValue(tagAtom);

    return (
        <div>
            <div className="blog-container blog-container--inner">
                <span className="col-span-2">
                    <h3>{tag?.name ?? 'All'}</h3>
                </span>
                <div className="col-span-1">
                    <input></input>
                </div>
            </div>
            <div className="grid grid-cols-3 grid-auto-rows gap-2">
                {result.items.map((post) => (
                    <div className="col-span-1">
                        <ProductPostItem post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
});
