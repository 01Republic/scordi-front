import {memo} from 'react';
import {usePosts} from '^hooks/usePosts';
import {PostItem} from './PostItem';

export const PostList = memo(() => {
    const {result} = usePosts();

    return (
        <ul className="blog-post-list">
            {result.items.map((post, i) => (
                <PostItem key={i} post={post} />
            ))}
        </ul>
    );
});
