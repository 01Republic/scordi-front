import {ProductDetailPageRoute} from '^pages/products/[id]';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {toast} from 'react-toastify';
import {usePrototypePostContent} from '^hooks/useApplicationPrototypes';

interface ProductPostListContentPanelItemProps {
    prototype: ApplicationPrototypeDto;
}

export const ProductListContentPanelItem = (props: ProductPostListContentPanelItemProps) => {
    const {prototype} = props;

    if (!prototype) return <></>;
    const [post] = prototype.posts;

    const aTagOption = {
        ...(post ? {href: ProductDetailPageRoute.path(prototype.id)} : {onClick: () => toast.info('준비 중입니다.')}),
    };
    const {makeContent} = usePrototypePostContent();

    const {thumbnailUrl, logoImgUrl, title, subTitle, tagNames} = makeContent(prototype);

    return (
        <a {...aTagOption}>
            <div className="card cursor-pointer">
                <figure className="blog-post-item-img-hover-container overflow-hidden rounded-box border border-gray-300 w-full">
                    <img src={thumbnailUrl} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body px-0 pt-4 relative">
                    <div className="avatar absolute right-6" style={{top: 'calc((3.5rem - 24px) / -2)'}}>
                        <div
                            className="rounded-full ring-1 ring-gray-300 ring-offset-base-100 ring-offset-2 bg-white"
                            style={{width: 'calc(3.5rem - 24px)'}}
                        >
                            <img src={logoImgUrl} alt={`logo image of ${title}`} loading="lazy" draggable={false} />
                        </div>
                    </div>
                    <h2 className="card-title">{title}</h2>
                    <p className="overflow-hidden" style={{maxHeight: 'calc(1.375rem * 3)'}}>
                        {subTitle}
                    </p>

                    <p className="flex items-center gap-1.5 overflow-hidden">
                        {tagNames &&
                            tagNames.map((tagName, i) => (
                                <span key={i} className="badge mb-2 bg-gray-200 whitespace-nowrap">
                                    {tagName}
                                </span>
                            ))}
                    </p>
                </div>
            </div>
        </a>
    );
};
