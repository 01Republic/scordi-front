import React, {useEffect, useState} from 'react';
import {CreateProductRequestDto as CreateDto, UpdateProductRequestDto as UpdateDto} from '^models/Product/type';
import {UseFormReturn} from 'react-hook-form';
import {TagDto} from '^types/tag.type';
import {MultiSelect} from '^components/util/react-select/MultiSelect';
import {ContentPanelInput} from '^layouts/ContentLayout';
import {useProductTags, useTagMultiSelect} from '^hooks/useTags';

interface PrototypeTagMultiSelectProps {
    tags: TagDto[];
    form: UseFormReturn<CreateDto> | UseFormReturn<UpdateDto>;
}

export const ProductTagMultiSelect = (props: PrototypeTagMultiSelectProps) => {
    const {tags, form} = props;
    const [selectedTags, setSelectedTags] = useState<TagDto[]>([]);

    // set loaded product's tag data on form & tag state
    useEffect(() => {
        const ids = tags.map((tag) => tag.id);

        setSelectedTags(tags);
        form.setValue('tagIds', ids);
    }, [tags]);

    const addTag = (tag: TagDto) => {
        const oldIds = form.getValues().tagIds ?? [];

        form.setValue('tagIds', [...oldIds, tag.id]);
        setSelectedTags((old) => [...old, tag]);
    };

    const removeTag = (tag: TagDto) => {
        const oldIds = form.getValues().tagIds ?? [];
        const filteredIds = oldIds.filter((id) => id !== tag.id);

        form.setValue('tagIds', filteredIds);
        setSelectedTags((oldTags) => oldTags.filter((oldTag) => oldTag.id !== tag.id));
    };

    const resetTag = () => {
        form.setValue('tagIds', []);
        setSelectedTags([]);
    };

    const {loadOptions, onChange, style, mapper} = useTagMultiSelect({
        componentControl: {
            add: addTag,
            remove: removeTag,
            reset: resetTag,
        },
        hooks: useProductTags(),
    });

    return (
        <ContentPanelInput title="Category" required={true}>
            <MultiSelect
                value={selectedTags.map(mapper)}
                loadOptions={loadOptions}
                onChange={onChange}
                style={style}
                //
            />
        </ContentPanelInput>
    );
};
