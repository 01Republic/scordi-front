import {memo} from 'react';
import {usePost} from '^models/Post/hook';
import {Avatar} from '^components/Avatar';
import {ShareButton} from './ShareButton';
import {OpinionButton} from './OpinionButton';
import {GoListButton} from './GoListButton';
import {AuthorCard} from '^components/pages/blog/BlogPostDetailPage/AuthorCard';

export const BlogPostDetailBody = memo(() => {
    const {post} = usePost();

    if (!post) return <></>;

    const {authors} = post;

    return (
        <div className="article-body !pb-[90px]">
            <div className="blog-article-body-styles-of-element">
                <div>
                    {post.thumbnailUrl ? (
                        <img src={post.thumbnailUrl} alt="thumbnail of this post" loading="lazy" draggable={false} />
                    ) : (
                        <span className="text-gray-500 italic">unset</span>
                    )}
                </div>

                <br />

                <div className="article-content" dangerouslySetInnerHTML={{__html: post.content}} />
            </div>

            <div className="article-share flex flex-row-reverse items-start justify-between">
                {/*<OpinionButton />*/}
                <GoListButton />
                <ShareButton />
            </div>

            <div className="py-8">
                <h2 className="text-2xl mb-4">Editor</h2>
                <div className="flex flex-col gap-4">
                    {authors.map((author, i) => (
                        <AuthorCard post={post} author={author} key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
});
