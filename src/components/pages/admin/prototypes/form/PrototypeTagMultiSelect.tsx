import React, {useCallback, useEffect, useState} from 'react';
import {
    CreateApplicationPrototypeRequestDto as CreateDto,
    UpdateApplicationPrototypeRequestDto as UpdateDto,
} from '^types/applicationPrototype.type';
import {UseFormReturn} from 'react-hook-form';
import {TagDto, TagGroup} from '^types/tag.type';
import {MultiSelect, Option} from '^components/util/select/MultiSelect';
import {ContentPanelInput} from '^layouts/ContentLayout';
import {ActionMeta, MultiValue, StylesConfig} from 'react-select';
import {useTagMultiSelect, useTags} from '^hooks/useTags';
import {useMultiSelect} from '^hooks/useMultiSelect';

interface PrototypeTagMultiSelectProps {
    tags: TagDto[];
    form: UseFormReturn<CreateDto> | UseFormReturn<UpdateDto>;
}

export const PrototypeTagMultiSelect = (props: PrototypeTagMultiSelectProps) => {
    const {tags, form} = props;
    const [selectedTags, setSelectedTags] = useState<TagDto[]>([]);

    // set loaded prototype's tag data on form & tag state
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
        hooks: useTags(TagGroup.Application),
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