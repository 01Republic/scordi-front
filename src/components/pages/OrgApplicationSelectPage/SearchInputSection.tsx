import React, {memo, useCallback} from 'react';
import {SearchInput} from '^components/SearchInput';
import {MobileSection} from '^components/v2/MobileSection';
import {useForm} from 'react-hook-form';
import {FindAllProductQuery} from '^models/Product/type';
import {useSetRecoilState} from 'recoil';
import {getProductsParamsState} from '^models/Product/atom';

type SearchSectionProps = {};

export const SearchInputSection = memo((props: SearchSectionProps) => {
    const setProductsParams = useSetRecoilState(getProductsParamsState);
    const form = useForm<FindAllProductQuery>();

    const searchHandler = useCallback((data: FindAllProductQuery) => {
        setProductsParams({keyword: data.keyword});
    }, []);

    return (
        <MobileSection data-component="SearchSection" className="mb-3">
            <form onSubmit={form.handleSubmit(searchHandler)}>
                {/*<SearchInput autoComplete={false} autoFocus={true} register={form.register('keyword')} />*/}
            </form>
        </MobileSection>
    );
});
