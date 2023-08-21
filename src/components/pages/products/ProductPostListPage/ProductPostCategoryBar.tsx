import {memo, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useTags} from '^hooks/useTags';
import {TagDto, TagGroup} from '^types/tag.type';
import {useProductPosts} from '^hooks/usePosts';
import {useRecoilState} from 'recoil';
import {tagAtom} from '^atoms/tags.atom';
export const ProductPostCategoryBar = memo(() => {
    const router = useRouter();
    const {result, search: searchTags} = useTags(TagGroup.Application);
    const {search: searchPosts} = useProductPosts();
    const [currentTag, setCurrentTag] = useRecoilState(tagAtom);

    const tagItems = [{id: 'all', name: 'all'}, ...result];

    useEffect(() => {
        if (!router.isReady) return;

        searchTags({order: {id: 'DESC'}});
    }, [router.isReady]);

    return (
        <div>
            <ul className="grid-auto-rows gap-y-1.5">
                {tagItems.length > 0 &&
                    tagItems.map((tag) => (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(tag);
                                if (!tag) return;
                                if (tag.id === 'all') {
                                    searchPosts({});
                                    setCurrentTag(null);
                                } else {
                                    searchPosts({tagIds: [Number(tag.id)]});
                                    setCurrentTag(tag as TagDto);
                                }
                            }}
                        >
                            {tag.name}
                        </button>
                    ))}
            </ul>
        </div>
    );
});
