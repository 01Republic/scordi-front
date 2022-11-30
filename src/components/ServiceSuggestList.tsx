import React from 'react';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';
import {ApplicationDto} from '^types/application.type';
import {AppIconButton} from '^components/AppIconButton';

export interface ServiceSuggestListProps {
    title: string;
    serviceList: ApplicationPrototypeDto[];
    myApps: ApplicationDto[];
    onClick: (item: ApplicationPrototypeDto) => void;
}

export const ServiceSuggestList: React.FC<ServiceSuggestListProps> = ({title, serviceList, myApps, onClick}) => {
    return (
        <div className={'bs-container'}>
            <div className="bs-row">
                <p>{title}</p>
            </div>
            <div className={'py-[20px] bs-row'}>
                {serviceList.map((item, index) => {
                    const myApp = myApps.find((app) => app.prototypeId === item.id);
                    return (
                        <div
                            className={'bs-col-6 xs:bs-col-4 sm:bs-col-3 md:bs-col-2 xl:bs-col text-center'}
                            key={index}
                        >
                            <AppIconButton
                                name={item.name + `${myApp ? ' (등록됨)' : ''}`}
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
