import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useProductSearchResult} from '^models/Product/hook';
import {debounce} from 'lodash';
import {FaSearch} from 'react-icons/fa';
import {useUnmount} from '^hooks/useUnmount';

export const SearchProductInput = memo(function SearchProductInput() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {search, reset} = useProductSearchResult();

    const searchProduct = debounce((keyword?: string) => {
        return search({
            relations: ['subscriptions', 'subscriptions.product'],
            keyword,
            order: {connectedOrgCount: 'DESC'},
        });
    }, 500);

    useEffect(() => {
        if (!organizationId || isNaN(organizationId)) return;
        searchProduct();
    }, [organizationId]);

    useUnmount(() => reset());

    if (!organizationId || isNaN(organizationId)) return <></>;

    return (
        <div className="relative mb-6">
            <div className="absolute top-0 bottom-0 w-[50px] flex items-center justify-center">
                <FaSearch size={16} className="text-gray-500 opacity-50" />
            </div>

            <input
                type="text"
                className="input input-md input-bordered shadow w-full pl-[50px]"
                autoComplete="off"
                spellCheck="false"
                placeholder="3,000 가지 이상의 앱을 검색해보세요."
                onChange={(e) => searchProduct(e.target.value)}
            />
        </div>
    );
});
