import {Avatar} from '^components/Avatar';
import {ProductDto} from '^types/product.type';
import React, {memo} from 'react';
import {IoClose} from 'react-icons/io5';
import {useRecoilState} from 'recoil';
import {selectedAppsAtom} from '../../atom';
import {FieldValues, UseFieldArrayReturn, UseFormReturn} from 'react-hook-form';

interface CardAppItemProps {
    item: ProductDto;
    form: UseFormReturn<FieldValues, any>;
    fieldArray: UseFieldArrayReturn<FieldValues, 'productIds', 'id'>;
}

export const CardAppItem = memo((props: CardAppItemProps) => {
    const {item, fieldArray} = props;
    const [selectedApps, setSelectedApps] = useRecoilState(selectedAppsAtom);

    if (!item) return <></>;

    const deleteApp = (id: number) => {
        const remainProducts = selectedApps.filter((app) => {
            return app.id !== id;
        });

        setSelectedApps(remainProducts);
        fieldArray.remove(id);
    };

    return (
        <div className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
            <Avatar src={item.image} className="w-9 h-9 outline outline-offset-1 outline-slate-100" />
            <p className="leading-none text-[18px] font-semibold">{item.nameEn}</p>

            <button onClick={() => deleteApp(item.id)}>
                <IoClose size={13} />
            </button>
        </div>
    );
});
