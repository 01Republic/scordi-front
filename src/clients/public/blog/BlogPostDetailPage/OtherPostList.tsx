import {memo, useEffect} from 'react';
import {OtherPostItem} from './OtherPostItem';
import {usePosts} from '^models/Post/hook';
import {useRouter} from 'next/router';
import {PostItem} from '../_share/PostItem';

export const OtherPostList = memo(() => {
    const router = useRouter();
    const {result, search} = usePosts();

    useEffect(() => {
        if (!router.isReady) return;

        search({order: {id: 'DESC'}});
    }, [router.isReady]);

    return (
        <ul className="other-posts-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {result.items.map((post, i) => (
                <PostItem post={post} key={i} />
            ))}
        </ul>
    );
});
