import React, {memo} from 'react';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa6';
import {LinkTo} from '^components/util/LinkTo';
import {useSelectProducts} from '^models/Product/hook';
import {useRouter} from 'next/router';

export const ActionButtons = memo(function ActionButtons() {
    const router = useRouter();
    const {selectedProducts} = useSelectProducts();
    const size = selectedProducts.length;

    return (
        <div className="flex items-center justify-between">
            <button className="btn gap-1 items-center" onClick={() => router.back()}>
                <FaChevronLeft />
                <span>돌아가기</span>
            </button>

            <LinkTo
                className={`btn btn-scordi gap-1 items-center ${
                    size === 0 ? 'btn-disabled !bg-scordi !text-white opacity-40' : ''
                }`}
            >
                <span>등록하기</span>
                <FaChevronRight />
            </LinkTo>
        </div>
    );
});
