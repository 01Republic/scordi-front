import React, {memo, useCallback} from 'react';
import {SearchInput} from '^components/SearchInput';
import {MobileSection} from '^components/v2/MobileSection';
import {useForm} from 'react-hook-form';
import {SearchAppPrototypeForm} from '^types/applicationPrototype.type';
import {useApplicationPrototypes} from '^hooks/useApplicationPrototypes';

type SearchSectionProps = {};

export const SearchInputSection = memo((props: SearchSectionProps) => {
    const form = useForm<SearchAppPrototypeForm>();
    const {fetch: fetchApplicationPrototypes} = useApplicationPrototypes([]);

    const searchHandler = useCallback((data: SearchAppPrototypeForm) => {
        fetchApplicationPrototypes({name: data.name, isLive: true});
    }, []);

    return (
        <MobileSection data-component="SearchSection" className="mb-3">
            <form onSubmit={form.handleSubmit(searchHandler)}>
                <SearchInput autoComplete={false} autoFocus={true} register={form.register('name')} />
            </form>
        </MobileSection>
    );
});
