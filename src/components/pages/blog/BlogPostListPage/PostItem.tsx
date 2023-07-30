import {memo} from 'react';
import {PostDto} from '^types/post.type';
import {PostDetailPageRoute} from '^pages/posts/[id]';
import {dateIsBeforeThen, yyyy_mm_dd} from '^utils/dateTime';

interface PostItemProps {
    post: PostDto;
}

export const PostItem = memo((props: PostItemProps) => {
    const {post} = props;

    const link = PostDetailPageRoute.path(post.id);
    const isPublished = !!post.publishAt && dateIsBeforeThen(new Date(post.publishAt), new Date());

    return (
        <li id={`post-${post.id}`} className={`blog-post-item w-full ${isPublished ? 'published' : 'not-published'}`}>
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
                                        <img
                                            src={post.thumbnailUrl}
                                            alt=""
                                            draggable={false}
                                            sizes="100vw"
                                            decoding="async"
                                            data-nimg="fill"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
});