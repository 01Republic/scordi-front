import React, {memo} from 'react';
import {ProductDto} from '^models/Product/type';
import {Avatar} from '^components/Avatar';
import {FaQuestion} from 'react-icons/fa6';
import {useModal} from '^v3/share/modals/useModal';
import {appShowPageModal} from '^v3/V3OrgAppShowPage/modals';
import {useSetRecoilState} from 'recoil';
import {appIdState} from '^v3/V3OrgAppShowPage/atom';

interface ProductProfileProps {
    product: ProductDto;
    subscriptionId: number;
}

export const ProductProfile = memo((props: ProductProfileProps) => {
    const {product, subscriptionId} = props;
    const {open} = useModal(appShowPageModal);
    const setAppId = useSetRecoilState(appIdState);

    const onClick = () => {
        open();
        setAppId(subscriptionId);
    };

    return (
        <div className="group cursor-pointer" onClick={onClick}>
            <div className="flex items-center gap-2">
                <Avatar className="w-8" src={product.image} alt={product.name()} draggable={false} loading="lazy">
                    <FaQuestion size={24} className="text-gray-300 h-full w-full p-[6px]" />
                </Avatar>
                <div className="flex-1 h-full group-hover:text-scordi transition-all">
                    <p className="">{product.name()}</p>
                </div>
            </div>
        </div>
    );
});
ProductProfile.displayName = 'ProductProfile';
