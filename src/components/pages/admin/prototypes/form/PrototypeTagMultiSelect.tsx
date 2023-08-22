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
import {useTags} from '^hooks/useTags';

interface PrototypeTagMultiSelectProps {
    tags: TagDto[];
    form: UseFormReturn<CreateDto> | UseFormReturn<UpdateDto>;
}

export const PrototypeTagMultiSelect = (props: PrototypeTagMultiSelectProps) => {
    const {tags, form} = props;
    const {search, result: allTags, createByName} = useTags(TagGroup.Application);
    const [defaultOptions, setDefaultOptions] = useState<Option[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagDto[]>([]);

    const selectOptionMapper = (tag: TagDto): Option => {
        return {label: tag.name, value: tag.name};
    };

    const initOptions = useCallback(() => {
        return setDefaultOptions(allTags.map(selectOptionMapper));
    }, [allTags]);

    // set loaded prototype's tag data on form & tag state
    useEffect(() => {
        const ids = tags.map((tag) => tag.id);

        setSelectedTags(tags);
        form.setValue('tagIds', ids);

        search({});
        initOptions();
    }, [tags]);

    const loadOptions = (input: string) => {
        const filterOptions = (input: string) => {
            return defaultOptions.filter((option) => option.value.toLowerCase().includes(input));
        };

        return new Promise<Option[]>((resolve) => resolve(filterOptions(input)));
    };

    const onChange = async (options: MultiValue<Option>, actionType?: ActionMeta<Option>) => {
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

        switch (actionType?.action) {
            case 'create-option':
                const newOption = actionType.option;
                if (!newOption.__isNew__) return;

                const newTag = await createByName(newOption.value);

                addTag(newTag);
                break;

            case 'select-option':
                const selectedOption = actionType.option;
                if (!selectedOption) return;

                const tag = allTags.find((tag) => tag.name === selectedOption.value);
                if (!tag) return;

                addTag(tag);
                break;

            case 'remove-value':
                const {removedValue} = actionType;
                if (!removedValue) return;

                const targetTag = tags.find((tag) => tag.name === removedValue.value);
                if (!targetTag) return;
                removeTag(targetTag);
                break;

            case 'clear':
                const {removedValues} = actionType;
                if (removedValues.length > 0) {
                    form.setValue('tagIds', []);
                    setSelectedTags([]);
                }
                break;

            default:
                break;
        }
    };

    const multiSelectStyle: StylesConfig<Option> = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'rgb(248 250 252 / 1)',
            borderColor: 'rgb(241 245 249 / 1)',
            height: '3rem',
            borderWidth: '1px',
        }),
    };

    return (
        <ContentPanelInput title="Category" required={true}>
            <MultiSelect
                value={selectedTags.map(selectOptionMapper)}
                defaultOptions={defaultOptions}
                loadOptions={loadOptions}
                onChange={onChange}
                style={multiSelectStyle}
            />
        </ContentPanelInput>
    );
};
