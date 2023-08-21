import {memo} from 'react';
import {PostDto} from '^types/post.type';

interface ProductPostListContentPanelItemProps {
    post?: PostDto;
}

export const ProductPostListContentPanelItem = memo((props: ProductPostListContentPanelItemProps) => {
    const {post} = props;

    return (
        <a>
            <div className="card cursor-pointer">
                <figure className="blog-post-item-img-hover-container overflow-hidden rounded-box">
                    <img src="https://placehold.co/600x400" alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body px-0 pt-4">
                    <h2 className="card-title">스코디 scordi</h2>
                    <p>클릭 한 번에 팀이 쓰는 SaaS를 모아서 관리하세요.</p>

                    <p className="flex items-center gap-1.5">
                        {post &&
                            post.tags.map((tag, i) => (
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
