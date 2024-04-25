import {memo} from 'react';
import {PostDto} from '^models/Post/type';
import {PostDetailPageRoute} from '^pages/posts/[id]';
import {dateIsBeforeThen, yyyy_mm_dd} from '^utils/dateTime';

interface OtherPostItemProps {
    post?: PostDto;
}

export const OtherPostItem = memo((props: OtherPostItemProps) => {
    const {post} = props;

    if (!post) return <></>;

    const link = PostDetailPageRoute.path(post.id);
    const isPublished = !!post.publishAt && dateIsBeforeThen(new Date(post.publishAt), new Date());
    const defaultThumbnailUrl = 'https://scordi.io/logo-560.png';

    return (
        <li>
            <a className="card w-full cursor-pointer" href={link}>
                <div className="w-full relative h-0 pt-[67.5%] mb-[8px] sm:mb-[18px]">
                    <div className="absolute w-full h-full top-0 left-0">
                        <div className="blog-post-item-img-hover-container w-full h-full rounded-box">
                            <div className="w-full h-full object-cover" style={{transform: 'translateZ(0)'}}>
                                <figure className="blog-post-item-img-wrapper rounded-box">
                                    {post.thumbnailUrl ? (
                                        <img
                                            src={post.thumbnailUrl}
                                            alt=""
                                            loading="lazy"
                                            draggable={false}
                                            sizes="100vw"
                                            decoding="async"
                                            data-nimg="fill"
                                        />
                                    ) : (
                                        <span className="text-gray-500 italic">unset</span>
                                    )}
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body p-0 items-start text-left">
                    <h4 className="blog-post-item-title card-title leading-[1.4]">{post.title}</h4>
                    <time className="text-[13px] sm:text-[15px] text-gray-400">
                        {isPublished ? (
                            yyyy_mm_dd(new Date(post.publishAt!))
                        ) : (
                            <span className="btn btn-xs btn-error text-white">아직 발행되지 않은 게시글입니다.</span>
                        )}
                    </time>
                </div>
            </a>
        </li>
    );
});
