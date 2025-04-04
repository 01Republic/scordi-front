import React from 'react';
import {Avatar} from './Avatar';

interface Item {
    src: string;
    name: string;
}

interface ServiceCardProps {
    item: Item;
    onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({item, onClick}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <Avatar src={item.src} className="w-10 h-10" />
                <p>{item.name}</p>
            </div>
            <button className="bg-gray-100 btn btn-sm rounded-full text-black font-normal px-3" onClick={onClick}>
                선택하기
            </button>
        </div>
    );
};
