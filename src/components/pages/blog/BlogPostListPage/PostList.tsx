import {memo} from 'react';
import {usePosts} from '^hooks/usePosts';
import {PostItem} from './PostItem';

export const PostList = memo(() => {
    const {result} = usePosts();

    return (
        <div className="blog-post-list mb-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.items.map((post, i) => (
                <PostItem key={i} post={post} />
            ))}
        </div>
    );
});
