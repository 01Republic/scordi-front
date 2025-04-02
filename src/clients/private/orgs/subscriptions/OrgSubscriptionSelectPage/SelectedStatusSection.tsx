import {memo, useState} from 'react';
import {useSelectProducts} from '^models/Product/hook';
import {New_SaaS_Request_Form_Url} from '^config/constants';
import {LinkTo} from '^components/util/LinkTo';
import {ConciergeBell, Eraser} from 'lucide-react';

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
                <div className="font-semibold text-sm px-3 text-gray-500">{sizeText}개의 앱 선택됨</div>
                <div>
                    <button
                        className="btn btn-sm btn-ghost capitalize gap-1 text-gray-500 !bg-transparent"
                        onClick={onReset}
                    >
                        <Eraser className="size-4" />
                        <span>초기화</span>
                    </button>
                </div>
                <div>
                    <LinkTo
                        className="btn btn-sm btn-ghost gap-1 text-gray-500 !bg-transparent"
                        href={New_SaaS_Request_Form_Url}
                        displayLoading={false}
                        target="_blank"
                    >
                        <ConciergeBell className="size-4" />
                        <span>미등록 서비스 제보하기</span>
                    </LinkTo>
                </div>
            </div>
            {/*<progress max={100} value={size} className="progress progress-info bg-gray-200">*/}
            {/*    {sizeText}개*/}
            {/*</progress>*/}
        </div>
    );
});
