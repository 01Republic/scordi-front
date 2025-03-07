import {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {ProductAvatarImg} from '^v3/share/ProductAvatar';
import {Avatar} from '^components/Avatar';
import {CheckCircle} from 'lucide-react';

interface ProductStatusProps {
    product: ProductDto;
    current: boolean;
    onClick: (product: ProductDto) => any;
    finished?: boolean;
}

export const ProductStatus = memo((props: ProductStatusProps) => {
    const {product, current = false, onClick, finished = false} = props;

    return (
        <div
            className={`-mx-3 -my-2 py-2 px-3 rounded-box flex items-center gap-4 group ${
                finished ? 'cursor-not-allowed' : 'cursor-pointer'
            } ${finished ? '' : current ? 'bg-scordi-100' : 'hover:bg-gray-100'} transition-all`}
            onClick={() => !finished && onClick(product)}
        >
            <div>
                <div
                    className={`flex items-center justify-center rounded-full w-9 bg-white border-2 ${
                        finished ? 'border-scordi' : 'border-slate-300'
                    } p-[2px] transition-all`}
                >
                    {finished ? (
                        <Avatar className="w-full">
                            <CheckCircle className="text-scordi" fontSize={28} />
                        </Avatar>
                    ) : (
                        <ProductAvatarImg
                            product={product}
                            className={`w-full ${
                                current ? 'opacity-100' : 'opacity-30 group-hover:opacity-100'
                            } transition-all`}
                        />
                    )}
                </div>
            </div>
            <div
                className={`${
                    finished ? 'text-scordi' : current ? 'text-black' : 'text-gray-400 group-hover:text-gray-600'
                } transition-all`}
            >
                <h3 className="text-16">{product.name()}</h3>
            </div>
        </div>
    );
});
ProductStatus.displayName = 'ProductStatus';

// export const ProductStatus = memo((props: ProductStatusProps) => {
//     const {product, current = false, onClick, finished = false} = props;
//     console.log('finished', finished, product);
//
//     return (
//         <div
//             className={`-mx-3 -my-2 py-2 px-3 rounded-box flex items-start gap-4 group cursor-pointer ${
//                 current ? 'bg-scordi-100' : 'hover:bg-gray-100'
//             } transition-all`}
//             onClick={() => onClick(product)}
//         >
//             <div>
//                 <div className="flex items-center justify-center rounded-full w-7 bg-white border-2 border-slate-300 p-[2px] transition-all">
//                     <ProductAvatarImg
//                         product={product}
//                         className={`w-full ${
//                             current ? 'opacity-100' : ' opacity-30 group-hover:opacity-100'
//                         } transition-all`}
//                     />
//                 </div>
//             </div>
//             <div className={`${current ? 'text-scordi' : 'text-gray-500 group-hover:text-black'} transition-all`}>
//                 <h3 className="text-14 mb-1">{product.name()}</h3>
//
//                 {/* 크롤러 지원 안됨(수동등록) / 입력상태: 대기중 */}
//                 {current ? <p className="text-13">입력 중...</p> : <p className="text-13">입력 대기중</p>}
//             </div>
//         </div>
//     );
// });
