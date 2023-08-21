import {memo} from 'react';
import {PostDto} from '^types/post.type';

interface ProductPostItemProps {
    post: PostDto;
}
export const ProductPostItem = memo((props: ProductPostItemProps) => {
    const {post} = props;
    if (!post) return <></>;

    const link = post.id;
    const thumbnailUrl = post.prototype?.ogImageUrl ?? post.thumbnailUrl;
    const subTitle = post.prototype?.tagline ?? post.seoDescription;
    const tags = post.prototype?.tags ?? post.tags;

    return (
        <div>
            <a href={'https://scordi.io'}>
                <div className="card card-compact card-bordered h-full hover:shadow">
                    <div className="absolute w-full h-full top-0 left-0">
                        <div className="blog-post-item-img-hover-container w-full h-full overflow-hidden rounded-t-box">
                            <div className="w-full h-full object-cover" style={{transform: 'translateZ(0)'}}>
                                <span className="blog-post-item-img-wrapper">
                                    {thumbnailUrl ? (
                                        <img
                                            src={thumbnailUrl}
                                            alt=""
                                            draggable={false}
                                            sizes="100vw"
                                            decoding="async"
                                            data-nimg="fill"
                                        />
                                    ) : (
                                        <span className="text-gray-500 italic">unset</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card-body gap-0">
                        <h2 className="blog-post-item-title blog-post-item-text-wrap">{post.title}</h2>
                        <p className="blog-post-item-subtitle blog-post-item-text-wrap">{subTitle}</p>
                        <p className="flex items-center gap-1.5">
                            {tags.map((tag, i) => (
                                <span key={i} className="badge mb-2 bg-gray-200">
                                    {tag.name}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            </a>
        </div>
    );
});
