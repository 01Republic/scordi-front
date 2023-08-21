import {memo} from 'react';
import {usePost} from '^hooks/usePosts';

export const ProductPostContentTitle = memo(() => {
    const {post} = usePost();
    if (!post) return <></>;

    const product = post.prototype ?? null;

    const thumbnailUrl = product?.ogImageUrl ?? post.thumbnailUrl;
    const logoImgUrl = product?.image ?? null;
    const link = product?.homepageUrl;
    const title = product?.name ?? post.title;
    const subTitle = product?.tagline ?? post.seoDescription;
    const tagNames = product?.tags.map((tag) => tag.name) ?? post.tags.map((tag) => tag.name);

    return (
        <div>
            <div>
                {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt="thumbnail of this post" loading="lazy" draggable={false} />
                ) : (
                    <span className="text-gray-500 italic">unset</span>
                )}
            </div>
            <div className="grid grid-cols-8">
                <div className="col-span-1">
                    {logoImgUrl ? (
                        <img src={logoImgUrl} alt="logo image of this product" loading="lazy" draggable={false} />
                    ) : (
                        <span className="text-gray-500 italic">unset</span>
                    )}
                </div>
                <div className="col-span-6">
                    <h2 className="text-center font-[500] text-gray-800 mb-3 leading-[1.4] text-[28px] sm:text-[52px]">
                        {title}
                    </h2>
                </div>
                <div className="col-span-1">
                    {link && (
                        <button className="btn w-full h-full">
                            <a role="button" href={link} />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-box-arrow-up-right"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
                                />
                                <path
                                    fill-rule="evenodd"
                                    d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            <div className="py-5">
                <span>{subTitle}</span>
            </div>
            <div className="flex flex-row">
                {tagNames.map((tagName) => (
                    <div className="badge badge-ghost">{tagName}</div>
                ))}
            </div>
        </div>
    );
});
