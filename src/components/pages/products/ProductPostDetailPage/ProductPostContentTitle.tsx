import {memo} from 'react';
import {usePost} from '^hooks/usePosts';
import {GrShare} from 'react-icons/gr';

export const ProductPostContentTitle = memo(() => {
    const {post} = usePost();
    if (!post) return <></>;

    const product = post.prototype ?? null;

    const thumbnailUrl = product?.ogImageUrl ?? post.thumbnailUrl ?? 'https://placehold.co/600x400';
    const logoImgUrl = product?.image ?? 'https://placehold.co/400x400';
    const link = product?.homepageUrl;
    const title = product?.name ?? post.title;
    const subTitle = product?.tagline ?? post.seoDescription;
    const tagNames = product?.tags.map((tag) => tag.name) ?? post.tags.map((tag) => tag.name);

    return (
        <div>
            <div className="pb-5">
                <img src={thumbnailUrl} alt="thumbnail of this post" loading="lazy" draggable={false} />
            </div>
            <div className="flex justify-between">
                <div className="flex gap-6 items-center">
                    <div className="avatar hidden sm:inline-block">
                        <div className="w-16 rounded-full">
                            <img src={logoImgUrl} alt="logo image of this product" loading="lazy" draggable={false} />
                        </div>
                    </div>
                    <h2 className="text-center font-semibold text-gray-800 leading-[1.4] text-[28px] sm:text-[52px]">
                        {title}
                    </h2>
                </div>

                <div>
                    {link && (
                        <a role="button" className="btn sm:btn-lg" href={link} target="_blank">
                            <GrShare />
                        </a>
                    )}
                </div>
            </div>

            <div className="py-5 text-[16px]">
                <span>{subTitle}</span>
            </div>

            <div className="flex flex-row gap-2">
                {tagNames.map((tagName, i) => (
                    <div className="badge badge-sm sm:badge-md badge-ghost" key={i}>
                        {tagName}
                    </div>
                ))}
            </div>
        </div>
    );
});
