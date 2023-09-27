import {memo, useEffect} from 'react';
import {Avatar} from '^components/Avatar';
import {ProductDto} from '^types/product.type';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {AccountManager} from '^models/Account/manager';

interface ItemProps {
    product?: ProductDto | null;
    onClick: () => any;
    accountManager: AccountManager;
}

export const ProductItem = memo((props: ItemProps) => {
    const {product = null, onClick, accountManager} = props;

    const accountLength = !product
        ? accountManager.length
        : accountManager.filter((account) => account.productId === product.id).length;

    return (
        <div
            className="!w-auto flex items-center gap-6 btn-like py-4 px-4 -mx-4 hover:bg-scordi-light-100 no-selectable"
            onClick={onClick}
        >
            <div>
                <Avatar src={product?.image} draggable={false} className="w-6 ring ring-offset-2" loading="lazy" />
            </div>
            <div className="flex-1">
                <p className="leading-none text-[18px] font-semibold mb-1">{product?.name() || '전체'}</p>
                {/*<p className="leading-none text-[14px] text-gray-500">{product.id}</p>*/}
            </div>
            <div>
                {accountLength ? (
                    <p className="text-[18px] text-gray-500">{accountLength}개</p>
                ) : (
                    <p className="text-[18px] text-gray-500" />
                )}
            </div>
        </div>
    );
});
