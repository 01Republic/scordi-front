import React from 'react';
import {Search} from '../../../components/Search';
import {ServiceCard} from '../../../components/ServiceCard';
import {Icon} from '../../Icon';

interface SelectServiceProps {
    SetPayment: () => void;
    AddService: () => void;
    onClose: () => void;
}

const itemDummy = [
    {id: 1, src: 'https://source.unsplash.com/random', name: 'notion'},
    {id: 2, src: 'https://source.unsplash.com/random', name: 'notion'},
    {id: 3, src: 'https://source.unsplash.com/random', name: 'notion'},
    {id: 4, src: 'https://source.unsplash.com/random', name: 'notion'},
    {id: 5, src: 'https://source.unsplash.com/random', name: 'notion'},
];

export const SelectService: React.FC<SelectServiceProps> = ({SetPayment, AddService, onClose}) => {
    const item = itemDummy;
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div className="space-y-0.5">
                    <h3 className="text-xl font-semibold">서비스 선택</h3>
                    <p className="text-sm text-gray-600">등록하실 서비스를 선택해주세요.</p>
                </div>
                <Icon.X onClick={onClose} className="cursor-pointer" />
            </div>
            <Search placeholder="서비스 검색" />
            <div className="h-80 space-y-3 overflow-y-auto pb-4">
                {item.map((e, i) => (
                    <ServiceCard key={i} item={e} onClick={SetPayment} />
                ))}
                {item.length === 0 && (
                    <div className="mt-20 space-y-2 text-center">
                        <p className="text-sm text-gray-600">
                            검색 결과가 없습니다.
                            <br />
                            서비스를 수동으로 추가해보세요.
                        </p>
                        <button className="filled-brand-1 h-10 rounded-full" onClick={AddService}>
                            수동 추가하기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
