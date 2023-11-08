import {Avatar} from '^components/Avatar';
import {ProductDto} from '^types/product.type';
import React, {memo} from 'react';
import {IoClose} from 'react-icons/io5';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {productIdsAtom, selectedAppsAtom} from '^v3/V3OrgCardListPage/modals/SelectAppModal/atom';

interface CardAppItemProps {
    item: ProductDto;
}

export const CardAppItem = memo((props: CardAppItemProps) => {
    const {item} = props;
    const setProductIds = useSetRecoilState(productIdsAtom);
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);

    if (!item) return <></>;

    const deleteApp = (itemId: number) => {
        const remainProducts = selectedApps.filter((app) => {
            return app.id !== itemId;
        });

        setSelectedApps(remainProducts);
        setProductIds(remainProducts.map((product) => product.id));
    };

    return (
        <div className="w-full gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
            <Avatar src={item.image} className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <p className="leading-none text-[18px] font-semibold">{item.nameEn}</p>

            <button onClick={() => deleteApp(item.id)}>
                <IoClose size={13} />
            </button>
        </div>
    );
});
