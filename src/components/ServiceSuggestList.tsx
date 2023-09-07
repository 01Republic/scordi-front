import React from 'react';
import {ProductDto} from '^types/product.type';
import {SubscriptionDto} from '^types/subscription.type';
import {AppIconButton} from '^components/AppIconButton';

export interface ServiceSuggestListProps {
    title: string;
    serviceList: ProductDto[];
    myApps: SubscriptionDto[];
    onClick: (item: ProductDto) => void;
}

export const ServiceSuggestList: React.FC<ServiceSuggestListProps> = ({title, serviceList, myApps, onClick}) => {
    return (
        <div className={'bs-container'}>
            <div className="bs-row">
                <p>{title}</p>
            </div>
            <div className={'py-[20px] bs-row'}>
                {serviceList.map((item, index) => {
                    const myApp = myApps.find((app) => app.productId === item.id);
                    return (
                        <div
                            className={'bs-col-6 xs:bs-col-4 sm:bs-col-3 md:bs-col-2 xl:bs-col text-center'}
                            key={index}
                        >
                            <AppIconButton
                                name={item.nameEn + `${myApp ? ' (연동됨)' : ''}`}
                                icon={item.image}
                                onClick={() => onClick(item)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
