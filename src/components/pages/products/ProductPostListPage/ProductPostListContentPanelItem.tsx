import {memo} from 'react';
import {PostDto} from '^types/post.type';
import {ProductPostDetailPageRoute} from '^pages/products/[id]';

interface ProductPostListContentPanelItemProps {
    post: PostDto;
}

// @ts-ignore
export const ProductPostListContentPanelItem = memo((props: ProductPostListContentPanelItemProps) => {
    const {post} = props;

    if (!post) return;

    const link = ProductPostDetailPageRoute.path(post.id);
    const thumbnailUrl = post.prototype?.ogImageUrl ?? post.thumbnailUrl ?? 'https://placehold.co/600x400';
    const title = post.prototype?.name ?? post.title;
    const subTitle = post.prototype?.tagline ?? post.seoDescription;
    const tags = post.prototype?.tags ?? post.tags;

    return (
        <a href={link}>
            <div className="card cursor-pointer">
                <figure className="blog-post-item-img-hover-container overflow-hidden rounded-box">
                    <img src={thumbnailUrl} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body px-0 pt-4">
                    <h2 className="card-title">{title}</h2>
                    <p>{subTitle}</p>

                    <p className="flex items-center gap-1.5">
                        {tags &&
                            tags.map((tag, i) => (
                                <span key={i} className="badge mb-2 bg-gray-200">
                                    {tag.name}
                                </span>
                            ))}
                    </p>
                </div>
            </div>
        </a>
    );
});
