import React, {memo} from 'react';
import {Breadcrumb} from '^clients/private/_layouts/_shared/Breadcrumb';
import {FaPlus} from 'react-icons/fa6';

export const ListPageHeader = memo(function ListPageHeader() {
    return (
        <>
            <Breadcrumb paths={['팀', {text: '구성원', active: true}]} />
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl">구성원</h1>

                <div>
                    <button className="btn btn-scordi gap-2">
                        <FaPlus />
                        <span>구성원 추가하기</span>
                    </button>
                </div>
            </div>
        </>
    );
});
