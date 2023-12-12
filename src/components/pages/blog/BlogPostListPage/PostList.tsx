import {memo} from 'react';
import {usePosts, useRecentPost} from '^models/Post/hook';
import {PostItem} from './PostItem';

export const PostList = memo(() => {
    const {result} = usePosts();
    const {data: recentPost} = useRecentPost();

    const items = result.items.filter((item) => {
        return recentPost ? item.id !== recentPost.id : item;
    });

    return (
        <div className="blog-post-list mb-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPost && <PostItem post={recentPost} className="sm:hidden" />}
            {items.map((post, i) => (
                <PostItem key={i} post={post} />
            ))}
        </div>
    );
});
