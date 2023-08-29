import React, {memo, useCallback} from 'react';
import {SearchInput} from '^components/SearchInput';
import {MobileSection} from '^components/v2/MobileSection';
import {useForm} from 'react-hook-form';
import {FindAllProductQuery} from '^types/product.type';
import {useSetRecoilState} from 'recoil';
import {getProductsParamsState} from '^atoms/products.atom';

type SearchSectionProps = {};

export const SearchInputSection = memo((props: SearchSectionProps) => {
    const setPrototypesParams = useSetRecoilState(getProductsParamsState);
    const form = useForm<FindAllProductQuery>();

    const searchHandler = useCallback((data: FindAllProductQuery) => {
        setPrototypesParams({name: data.name});
    }, []);

    return (
        <MobileSection data-component="SearchSection" className="mb-3">
            <form onSubmit={form.handleSubmit(searchHandler)}>
                <SearchInput autoComplete={false} autoFocus={true} register={form.register('name')} />
            </form>
        </MobileSection>
    );
});
