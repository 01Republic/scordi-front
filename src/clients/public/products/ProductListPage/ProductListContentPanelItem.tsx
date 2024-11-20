import Image from 'next/image';
import {ProductDetailPageRoute} from '^pages/products/[id]';
import {ProductDto} from '^models/Product/type';
import {toast} from 'react-toastify';
import {ResponsiveFigureImg} from '^components/ResponsiveFigureImg';
import {useProductPostContent} from '^models/Product/hook';
import {LinkTo} from '^components/util/LinkTo';

export const ProductListContentPanelItem = (props: {product: ProductDto}) => {
    const {product} = props;
    const {makeContent} = useProductPostContent();

    if (!product) return <></>;

    const [post] = product.posts;
    const {thumbnailUrl, logoImgUrl, title, subTitle, tagNames} = makeContent(product);

    return (
        <LinkTo
            href={post ? ProductDetailPageRoute.path(product.id) : product.pricingPageUrl}
            target={post ? '_self' : '_blank'}
        >
            <div className="card cursor-pointer">
                {/* Thumbnail */}
                <ResponsiveFigureImg
                    src={thumbnailUrl}
                    alt={title}
                    responsiveHeight="calc(100% * 630 / 1200)"
                    className="blog-post-item-img-hover-container rounded-box border border-gray-300"
                />

                <div className="card-body px-0 pt-4 relative">
                    {/* Logo */}
                    <div className="avatar absolute right-6" style={{top: 'calc((3.5rem - 24px) / -2)'}}>
                        <div
                            className="rounded-full ring-1 ring-gray-300 ring-offset-base-100 ring-offset-2 bg-white relative"
                            style={{width: 'calc(3.5rem - 24px)'}}
                        >
                            <Image
                                className="absolute"
                                src={logoImgUrl}
                                alt={`logo image of ${title}`}
                                loading="lazy"
                                draggable={false}
                                layout="fill"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="card-title">{title}</h2>

                    {/* Subtitle */}
                    <p className="overflow-hidden" style={{maxHeight: 'calc(1.375rem * 3)'}}>
                        {subTitle}
                    </p>

                    {/* Tags */}
                    <p className="flex items-center gap-1.5 overflow-hidden">
                        {tagNames &&
                            tagNames.map((tagName, i) => (
                                <span key={i} className="badge mb-2 bg-gray-200 whitespace-nowrap text-xs font-light">
                                    {tagName}
                                </span>
                            ))}
                    </p>
                </div>
            </div>
        </LinkTo>
    );
};
