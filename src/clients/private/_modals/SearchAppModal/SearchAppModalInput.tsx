import React, {memo, useEffect} from 'react';
import {FaSearch} from 'react-icons/fa';
import {useProductSearchResult} from '^models/Product/hook';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {debounce} from 'lodash';
import {searchResultModeAtom} from './SearchResultSection';
import {WithChildren} from '^types/global.type';

export const SearchAppModalInput = memo(function SearchAppModalInput(props: WithChildren) {
    const {children} = props;
    const organizationId = useRecoilValue(orgIdParamState);
    const setSearchResultMode = useSetRecoilState(searchResultModeAtom);
    const {search} = useProductSearchResult();

    const searchProduct = (keyword?: string) => {
        // 키워드가 있으면 검색결과, 없으면 인기순
        setSearchResultMode(keyword ? 'search' : 'popular');

        return search({
            relations: ['subscriptions', 'subscriptions.product'],
            keyword,
            itemsPerPage: 10,
            order: {connectedOrgCount: 'DESC'},
        });
    };

    useEffect(() => {
        searchProduct();
    }, []);

    if (!organizationId || isNaN(organizationId)) return <></>;

    const onChange = debounce(searchProduct, 500);

    return (
        <div className="sticky top-0 w-full bg-white z-[1]">
            <div className="absolute top-0 bottom-0 w-[50px] flex items-center justify-center">
                <FaSearch size={16} className="text-gray-500 opacity-50" />
            </div>

            <input
                type="text"
                className="input input-md pl-[50px] w-full text-16 focus:outline-0 transition-all"
                autoComplete="off"
                spellCheck="false"
                placeholder="앱 이름을 검색하고 구독을 등록해보세요"
                onChange={(e) => onChange(e.target.value)}
            />

            {children}

            <div className="px-4">
                <hr />
            </div>
        </div>
    );
});
