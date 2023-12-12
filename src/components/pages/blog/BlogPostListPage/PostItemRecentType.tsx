import {memo} from 'react';
import {PostDto} from '^models/Post/type';
import {PostDetailPageRoute} from '^pages/posts/[id]';
import {dateIsBeforeThen, yyyy_mm_dd} from '^utils/dateTime';
import {ThumbnailImg} from '^components/pages/blog/BlogPostListPage/ThumbnailImg';

interface PostItemProps {
    post: PostDto;
}

export const PostItemRecentType = memo((props: PostItemProps) => {
    const {post} = props;

    const link = PostDetailPageRoute.path(post.id);
    const isPublished = !!post.publishAt && dateIsBeforeThen(new Date(post.publishAt), new Date());

    return (
        <div id={`post-${post.id}`} className={`blog-post-item w-full ${isPublished ? 'published' : 'not-published'}`}>
            <a href={link} className="w-full grid grid-cols-2 gap-8 items-center justify-between">
                <div className="">
                    {post.thumbnailUrl ? (
                        <ThumbnailImg src={post.thumbnailUrl} alt={`${post.title}'s thumbnail`} />
                    ) : (
                        <span className="text-gray-500 italic">unset</span>
                    )}
                </div>

                <div className="flex flex-col items-start justify-start w-full h-full mr-[20px] sm:mr-0">
                    {/* Tags */}
                    <p className="flex items-center gap-2 pt-3">
                        {post.tags.map((tag, i) => (
                            <span key={i} className="badge mb-2 sm:mb-4 sm:badge-lg bg-gray-200">
                                {tag.name}
                            </span>
                        ))}
                    </p>

                    {/* Title */}
                    <h4 className="blog-post-item-title text-max-line max-h-[2.8em] mb-[10px] text-[16px] font-semibold sm:text-[32px] sm:font-bold">
                        {post.title}
                    </h4>

                    {/* Seo Desc */}
                    <p className="blog-post-item-subtitle hidden sm:block text-gray-500 flex-1">
                        <span className="block overflow-hidden" style={{maxHeight: 'calc(1.4em * 4)'}}>
                            {post.seoDescription}
                        </span>
                    </p>

                    {/* Published At */}
                    <time className="text-[13px] sm:text-[15px] text-gray-400">
                        {isPublished ? (
                            yyyy_mm_dd(new Date(post.publishAt!))
                        ) : (
                            <span className="btn btn-xs btn-error text-white">아직 발행되지 않은 게시글입니다.</span>
                        )}
                    </time>
                </div>
            </a>
        </div>
    );
});
