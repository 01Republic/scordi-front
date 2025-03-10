import React, {memo} from 'react';
import {useProductSearchResult} from '^models/Product/hook';
import {LoadableBox} from '^components/util/loading';
import {SearchResultItem} from './SearchResultItem';
import {atom, useRecoilValue} from 'recoil';
import {New_SaaS_Request_Form_Url} from '^config/constants';
import {LinkTo} from '^components/util/LinkTo';
import {Bell, HelpCircle} from 'lucide-react';

export const searchResultModeAtom = atom<'search' | 'popular'>({
    key: 'searchResultModeAtom',
    default: 'popular',
});

export const SearchResultSection = memo(() => {
    const searchResultMode = useRecoilValue(searchResultModeAtom);
    const {isLoading, result} = useProductSearchResult();

    const {items, pagination} = result;

    return (
        <div className="p-4 min-h-[70px]">
            <div className="flex items-center justify-between mb-2">
                {searchResultMode === 'popular' && (
                    <h4 className="text-12 text-gray-500 font-medium">가장 많이 등록한 앱 Top10</h4>
                )}
                {searchResultMode === 'search' && (
                    <h4 className="text-12 text-gray-500 font-medium">
                        {pagination.totalItemCount.toLocaleString()}개의 검색결과
                    </h4>
                )}

                <div className="hidden">
                    <span className="text-11 text-gray-500 hover:text-gray-800 transition-all cursor-pointer">
                        초기화
                    </span>
                </div>
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                {pagination.totalItemCount === 0 && (
                    <div className="p-1.5 text-13 w-full">
                        <div>검색 결과가 없습니다 :(</div>

                        <div className="flex items-center justify-between gap-2 p-4 my-2 bg-slate-100 rounded-btn">
                            <div className="flex items-center gap-2 text-scordi-400">
                                <HelpCircle fontSize={22} />
                                <p className="text-14">찾으시는 앱이 없나요?</p>
                            </div>

                            <LinkTo
                                className="btn btn-xs btn-scordi gap-2"
                                href={New_SaaS_Request_Form_Url}
                                displayLoading={false}
                                target="_blank"
                            >
                                <Bell />
                                <span>미등록 서비스 제보하기</span>
                            </LinkTo>
                        </div>
                    </div>
                )}

                {items.map((product, i) => (
                    <SearchResultItem key={i} product={product} />
                ))}
            </LoadableBox>
        </div>
    );
});
SearchResultSection.displayName = 'SearchResultSection';
