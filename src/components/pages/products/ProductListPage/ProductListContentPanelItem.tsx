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

    const {thumbnailUrl, title, subTitle, tagNames} = makeContent(prototype);

    return (
        <a {...aTagOption}>
            <div className="card cursor-pointer">
                <figure className="blog-post-item-img-hover-container overflow-hidden rounded-box w-[266.34px] h-[133.17px]">
                    <img src={thumbnailUrl} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body px-0 pt-4">
                    <h2 className="card-title">{title}</h2>
                    <p>{subTitle}</p>

                    <p className="flex items-center gap-1.5">
                        {tagNames &&
                            tagNames.map((tagName, i) => (
                                <span key={i} className="badge mb-2 bg-gray-200">
                                    {tagName}
                                </span>
                            ))}
                    </p>
                </div>
            </div>
        </a>
    );
};
