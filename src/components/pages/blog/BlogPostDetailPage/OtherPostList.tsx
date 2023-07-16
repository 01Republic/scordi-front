import {memo, useEffect} from 'react';
import {OtherPostItem} from './OtherPostItem';
import {usePosts} from '^hooks/usePosts';
import {useRouter} from 'next/router';

export const OtherPostList = memo(() => {
    const router = useRouter();
    const {result, search} = usePosts();

    useEffect(() => {
        if (!router.isReady) return;

        search({order: {id: 'DESC'}});
    }, [router.isReady]);

    return (
        <ul className="other-posts-grid grid grid-cols-2 md:grid-cols-3">
            {result.items.map((post, i) => (
                <OtherPostItem post={post} key={i} />
            ))}
        </ul>
    );
});
