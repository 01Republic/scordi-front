import React, {memo, useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import {useProductSearchResult} from '^models/Product/hook';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {debounce} from 'lodash';

export const SearchAppModalInput = memo(function SearchAppModalInput() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {search} = useProductSearchResult();

    const request = (keyword?: string) => {
        return search({
            relations: ['subscriptions', 'subscriptions.product'],
            keyword,
            itemsPerPage: 10,
        });
    };

    useEffect(() => {
        request();
    }, []);

    if (!organizationId || isNaN(organizationId)) return <></>;

    const onChange = debounce(request, 500);

    return (
        <div className="relative w-full">
            <div className="absolute top-0 bottom-0 w-[50px] flex items-center justify-center">
                <FaSearch size={16} className="text-gray-500 opacity-50" />
            </div>

            <input
                type="text"
                className="input input-md pl-[50px] w-full text-16 focus:outline-0 transition-all"
                autoComplete="off"
                spellCheck="false"
                placeholder="우리 팀이 쓰는 앱을 찾아보세요"
                onChange={(e) => onChange(e.target.value)}
            />

            <div className="px-4">
                <hr />
            </div>
        </div>
    );
});
