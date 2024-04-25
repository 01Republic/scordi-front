import {memo} from 'react';
import {PostDto} from '^models/Post/type';
import {PostDetailPageRoute} from '^pages/posts/[id]';
import {dateIsBeforeThen, yyyy_mm_dd} from '^utils/dateTime';

interface PostItemProps {
    post: PostDto;
    className?: string;
}

export const PostItem = memo((props: PostItemProps) => {
    const {post, className = ''} = props;
    const link = PostDetailPageRoute.path(post.id);
    const isPublished = !!post.publishAt && dateIsBeforeThen(new Date(post.publishAt), new Date());

    return (
        <a href={link} className={className}>
            <div className="card card-compact card-bordered h-full hover:shadow">
                <div className="">
                    <div className="w-full relative h-0 pt-[67.5%]">
                        <div className="absolute w-full h-full top-0 left-0">
                            <div className="blog-post-item-img-hover-container w-full h-full overflow-hidden rounded-t-box">
                                <div className="w-full h-full object-cover" style={{transform: 'translateZ(0)'}}>
                                    <span className="blog-post-item-img-wrapper">
                                        {post.thumbnailUrl ? (
                                            <img
                                                src={post.thumbnailUrl}
                                                alt=""
                                                draggable={false}
                                                sizes="100vw"
                                                decoding="async"
                                                data-nimg="fill"
                                            />
                                        ) : (
                                            <span className="text-gray-500 italic">unset</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body gap-0">
                    <p className="flex items-center gap-1.5">
                        {post.tags.map((tag, i) => (
                            <span key={i} className="badge mb-2 bg-gray-200 whitespace-nowrap">
                                {tag.name}
                            </span>
                        ))}
                    </p>

                    <h2 className="blog-post-item-title blog-post-item-text-wrap">{post.title}</h2>

                    <p className="blog-post-item-subtitle blog-post-item-text-wrap">{post.seoDescription}</p>

                    <div className="card-actions mt-[12px]">
                        <time className="text-[13px] text-gray-400">
                            {isPublished ? (
                                yyyy_mm_dd(new Date(post.publishAt!))
                            ) : (
                                <span className="btn btn-xs btn-error text-white">
                                    아직 발행되지 않은 게시글입니다.
                                </span>
                            )}
                        </time>
                    </div>
                </div>
            </div>
        </a>
    );
});

export const PostItemOld = memo((props: PostItemProps) => {
    const {post} = props;

    const link = PostDetailPageRoute.path(post.id);
    const isPublished = !!post.publishAt && dateIsBeforeThen(new Date(post.publishAt), new Date());
    const defaultThumbnailUrl = 'https://scordi.io/logo-560.png';

    return (
        <div id={`post-${post.id}`} className={`blog-post-item w-full ${isPublished ? 'published' : 'not-published'}`}>
            <a href={link} className="w-full flex items-center justify-between">
                <div className="flex flex-col items-start justify-start w-full mr-[20px] sm:mr-0">
                    <span></span>
                    <h4 className="blog-post-item-title mb-[10px] text-[16px] font-semibold sm:text-[24px] sm:font-bold">
                        {post.title}
                    </h4>
                    <p className="blog-post-item-subtitle hidden sm:block text-gray-500">{post.seoDescription}</p>
                    <time className="text-[13px] sm:text-[15px] text-gray-400">
                        {isPublished ? (
                            yyyy_mm_dd(new Date(post.publishAt!))
                        ) : (
                            <span className="btn btn-xs btn-error text-white">아직 발행되지 않은 게시글입니다.</span>
                        )}
                    </time>
                </div>

                <div className="min-w-[100px] sm:min-w-[270px]">
                    <div className="w-full relative h-0 pt-[67.5%]">
                        <div className="absolute w-full h-full top-0 left-0">
                            <div className="blog-post-item-img-hover-container w-full h-full overflow-hidden border rounded-[12px] sm:rounded-box">
                                <div className="w-full h-full object-cover" style={{transform: 'translateZ(0)'}}>
                                    <span className="blog-post-item-img-wrapper">
                                        {post.thumbnailUrl ? (
                                            <img
                                                src={post.thumbnailUrl}
                                                alt=""
                                                draggable={false}
                                                sizes="100vw"
                                                decoding="async"
                                                data-nimg="fill"
                                            />
                                        ) : (
                                            <span className="text-gray-500 italic">unset</span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
});
