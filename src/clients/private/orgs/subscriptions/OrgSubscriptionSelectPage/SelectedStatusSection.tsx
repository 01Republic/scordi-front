import {memo, useState} from 'react';
import {useSelectProducts} from '^models/Product/hook';
import {FaBroom} from 'react-icons/fa6';

export const SelectedStatusSection = memo(function SelectedStatusSection() {
    const {selectedProducts, clearSelects} = useSelectProducts();

    const size = selectedProducts.length;
    const sizeText = size.toLocaleString();

    const onReset = () => {
        if (confirm(`${sizeText}개의 선택이 초기화 됩니다.\n그대로 실행 할까요?`)) clearSelects();
    };

    if (size === 0) return <></>;

    return (
        <div className="w-full mb-4">
            <div className="flex items-center justify-center gap-3">
                <div>{sizeText}개의 앱 선택됨</div>
                <div>
                    <button
                        className="btn btn-sm btn-ghost capitalize gap-2 text-gray-500 !bg-transparent"
                        onClick={onReset}
                    >
                        <FaBroom />
                        <span>초기화</span>
                    </button>
                </div>
            </div>
            {/*<progress max={100} value={size} className="progress progress-info bg-gray-200">*/}
            {/*    {sizeText}개*/}
            {/*</progress>*/}
        </div>
    );
});
