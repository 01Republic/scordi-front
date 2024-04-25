import {memo} from 'react';
import {usePost} from '^models/Post/hook';
import {dateIsBeforeThen, yyyy_mm_dd} from '^utils/dateTime';

export const BlogPostDetailHeader = memo(() => {
    const {post} = usePost();

    if (!post) return <></>;

    const isPublished = !!post.publishAt && dateIsBeforeThen(new Date(post.publishAt), new Date());

    return (
        <header className="blog-container blog-container--default pt-[78px] sm:pt-[158px]">
            <div className="blog-container--inner">
                <h1 className="text-center font-[600] text-gray-800 mb-3 sm:mb-8 leading-[1.4] text-[28px] sm:text-[52px]">
                    {post.title}
                </h1>

                <p className="header-written-by flex items-center justify-center">
                    <time>
                        {isPublished ? (
                            yyyy_mm_dd(new Date(post.publishAt!))
                        ) : (
                            <span className="btn btn-xs btn-error text-white">아직 발행되지 않은 게시글입니다.</span>
                        )}
                    </time>
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
