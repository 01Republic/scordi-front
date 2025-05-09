import {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {useProductPostContent} from '^models/Product/hook';
import {Share} from 'lucide-react';

export const ProductPostContentTitle = memo((props: {product: ProductDto}) => {
    const {product} = props;
    const [post] = product.posts;
    if (!post) return <></>;

    const {makeContent} = useProductPostContent();
    const {thumbnailUrl, logoImgUrl, homePageUrl, subTitle, tagNames} = makeContent(product);
    const title = product.nameEn;

    return (
        <div>
            <div className="pb-5 border-none">
                <img src={thumbnailUrl} alt="thumbnail of this post" loading="lazy" draggable={false} />
            </div>
            <div className="flex justify-between">
                <div className="flex gap-4 sm:gap-6 items-center">
                    <div className="avatar ring-1 ring-gray-300 ring-offset-2 bg-white">
                        <div className="w-[40px] sm:w-16 rounded-full">
                            <img src={logoImgUrl} alt="logo image of this product" loading="lazy" draggable={false} />
                        </div>
                    </div>
                    <h2 className="text-center font-semibold text-gray-800 leading-[1.4] text-[28px] sm:text-[52px]">
                        {title}
                    </h2>
                </div>

                <div>
                    {homePageUrl && (
                        <a role="button" className="btn sm:btn-lg" href={homePageUrl} target="_blank">
                            <Share />
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
