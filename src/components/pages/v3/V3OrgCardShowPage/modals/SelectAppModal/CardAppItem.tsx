import {Avatar} from '^components/Avatar';
import {ProductDto} from '^types/product.type';
import React, {Dispatch, memo} from 'react';
import {IoClose} from 'react-icons/io5';

interface CardAppItemProps {
    app: ProductDto;
    setSelectedApps: Dispatch<React.SetStateAction<ProductDto[]>>;
}

export const CardAppItem = memo((props: CardAppItemProps) => {
    const {app, setSelectedApps} = props;
    if (!app) return <></>;

    const deleteApp = (id: number) => {
        setSelectedApps((apps) => {
            const remainApps = apps.filter((app) => {
                return app.id !== id;
            });
            return [...remainApps];
        });
    };

    return (
        <div className={`!w-auto flex items-center gap-6 btn-like py-2 no-selectable my-2`}>
            <Avatar src={app.image} draggable={false} className="w-5 ring-1 ring-offset-1 top-[-1px]" loading="lazy" />
            <p className="leading-none text-[18px] font-semibold">{app.nameKo}</p>
            <button>
                <IoClose size={13} onClick={() => deleteApp(app.id)} />
            </button>
        </div>
    );
});
