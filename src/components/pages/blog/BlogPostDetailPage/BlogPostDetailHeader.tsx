import {memo} from 'react';
import {usePost} from '^hooks/usePosts';
import {dateIsBeforeThen, yyyy_mm_dd} from '^utils/dateTime';

export const BlogPostDetailHeader = memo(() => {
    const {post} = usePost();

    if (!post) return <></>;

    const isPublished = !!post.publishAt && dateIsBeforeThen(new Date(post.publishAt), new Date());

    return (
        <header>
            <div className="header-inner">
                <div className="w-full h-full">
                    <div className="img-content">
                        <span className="img-wrapper">
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
                <div className="mask-top"></div>
                <div className="mask-bottom"></div>
            </div>
            <div className="header-content">
                <h1 className="header-title">{post.title}</h1>
                <p className="header-written-by">
                    <time>
                        {isPublished ? (
                            yyyy_mm_dd(new Date(post.publishAt!))
                        ) : (
                            <span className="btn btn-xs btn-error text-white">아직 발행되지 않은 게시글입니다.</span>
                        )}
                    </time>
                    <span>ㆍ by {'Scordi'}</span>
                </p>
                <button className="header-button">
                    <span className="header-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="line-icon">
                            <path
                                d="M6.6 9.8c0-.2.1-.5.3-.6.4-.4.9-.4 1.3 0L12 13l3.9-3.9c.4-.4.9-.4 1.3 0s.4.9 0 1.3l-4.5 4.5c-.4.4-.9.4-1.3 0l-4.5-4.5c-.2-.2-.3-.4-.3-.6"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                fill="#b0b8c1"
                            ></path>
                        </svg>
                    </span>
                </button>
            </div>
        </header>
    );
});
