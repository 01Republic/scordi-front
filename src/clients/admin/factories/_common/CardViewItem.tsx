import React, {memo, ReactNode} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {ago} from '^utils/dateTime';
import Tippy from '@tippyjs/react';
import {ProductDto} from '^models/Product/type';
import {ProductAvatar} from '^v3/share/ProductAvatar';
import {LinkTo} from '^components/util/LinkTo';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';

interface CardViewItemProps {
    id: number;
    name: ReactNode;
    tooltip?: ReactNode;
    product?: ProductDto;
    updatedAt: Date;
    isActive: boolean;
    reload?: () => any;
    versionLength?: number;
}

export const CardViewItem = memo((props: CardViewItemProps) => {
    const {id, name, tooltip, product, updatedAt, isActive, versionLength = 0} = props;

    return (
        <div className="card card-compact shadow-xl card-bordered cursor-pointer transition-all text-gray-500 bg-base-100 hover:shadow-2xl">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <div className="flex-auto overflow-hidden space-y-1">
                        <div className="text-16 flex items-center gap-2">
                            <div className="badge badge-xs">#{id}</div>
                            <Tippy content={tooltip || name} className="!text-12">
                                <div className="text-14 w-full whitespace-nowrap text-ellipsis overflow-hidden">
                                    {name}
                                </div>
                            </Tippy>
                        </div>

                        <div className="flex items-center gap-0.5">
                            <div className="text-12 text-gray-400">수정: {ago(updatedAt)}</div>
                            <div className="text-12 text-gray-400">&middot;</div>
                            <div className="text-12 text-gray-400">
                                {versionLength > 0 ? (
                                    <span>버전: {versionLength.toLocaleString()}개</span>
                                ) : (
                                    <span>단독버전</span>
                                )}
                            </div>
                        </div>

                        <ProductInCardView product={product} />
                    </div>

                    <div className="">
                        {isActive ? (
                            <TagUI className="bg-green-200">활성</TagUI>
                        ) : (
                            <TagUI className="bg-gray-200">비활성</TagUI>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
CardViewItem.displayName = 'CardViewItem';

const ProductInCardView = ({product}: {product?: ProductDto}) => {
    return (
        <div className="flex items-center h-[20px]">
            {product ? (
                <Tippy
                    content="앱 열기"
                    className="!text-10 !bg-transparent !text-gray-500 !p-0"
                    arrow={false}
                    placement="right"
                    offset={[0, 0]}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                    >
                        <LinkTo
                            href={AdminProductPageRoute.path(product.id)}
                            className="flex items-center h-[20px] gap-1.5 py-0.5 px-1 bg-gray-100 rounded-sm hover:shadow-lg transition-all"
                            displayLoading={false}
                        >
                            <ProductAvatar size={4} product={product} displayName={false} displayOutline={false} />
                            {/*<span className="badge badge-xs">#{product.id}</span>*/}
                            <span className="text-12 font-medium cursor-pointer transition-all">{product.name()}</span>
                        </LinkTo>
                    </div>
                </Tippy>
            ) : (
                <div className="flex items-center h-[20px] gap-1.5 py-0.5 px-1">
                    <span className="text-gray-400">비어있음</span>
                </div>
            )}
        </div>
    );
};
