import React, {memo, useCallback} from 'react';
import {SearchInput} from '^components/SearchInput';
import {MobileSection} from '^components/v2/MobileSection';
import {useForm} from 'react-hook-form';
import {FindAllAppPrototypeQuery} from '^types/applicationPrototype.type';
import {useSetRecoilState} from 'recoil';
import {getPrototypesParamsState} from '^atoms/applicationPrototypes.atom';

type SearchSectionProps = {};

export const SearchInputSection = memo((props: SearchSectionProps) => {
    const setPrototypesParams = useSetRecoilState(getPrototypesParamsState);
    const form = useForm<FindAllAppPrototypeQuery>();

    const searchHandler = useCallback((data: FindAllAppPrototypeQuery) => {
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
