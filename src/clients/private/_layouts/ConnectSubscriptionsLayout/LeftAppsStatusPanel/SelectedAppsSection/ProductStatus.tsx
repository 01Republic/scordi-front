import {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';

interface ProductStatusProps {
    product: ProductDto;
}

export const ProductStatus = memo((props: ProductStatusProps) => {
    const {product} = props;

    return (
        <div className="-mx-3 -my-2 py-2 px-3 rounded-box flex items-start gap-4 group cursor-pointer hover:bg-gray-100 transition-all">
            <div>
                <div className="flex items-center justify-center rounded-full w-7 bg-white border-2 border-slate-300 p-[2px] transition-all">
                    <ProductAvatarImg
                        product={product}
                        className={`w-full opacity-30 group-hover:opacity-100 transition-all`}
                    />
                </div>
            </div>
            <div className={`text-gray-500 group-hover:text-black transition-all`}>
                <h3 className="text-14 mb-1">{product.name()}</h3>

                {/* 크롤러 지원 안됨(수동등록) / 입력상태: 대기중 */}
                <p className="text-13">입력 대기중</p>
            </div>
        </div>
    );
});
ProductStatus.displayName = 'ProductStatus';