import {
    ApplicationPrototypeDto,
    CreateApplicationPrototypeRequestDto as CreateDto,
    UpdateApplicationPrototypeRequestDto as UpdateDto,
    PrototypeConnectMethod,
} from '^types/applicationPrototype.type';
import {UseFormReturn} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import React, {useEffect, useState} from 'react';
import {ContentForm, ContentPanel, ContentPanelInput, ContentPanelList} from '^layouts/ContentLayout';
import {PrototypeDeletePanel} from '^components/pages/admin/prototypes/form/panels/PrototypeDeletePanel';
import {MultiSelect, Option, Option as SelectOption} from '^components/util/select/MultiSelect';
import {useTagSearch} from '^hooks/useTags';
import {TagDto, TagGroup} from '^types/tag.type';
import {MultiValue, ActionMeta, StylesConfig} from 'react-select';
import {PrototypePlanCyclePanel} from '^components/pages/admin/prototypes/form/panels/PrototypePlanCyclePanel';
import {
    faviconUrlAtom,
    LogoImageFormPanel,
    logoUrlAtom,
} from '^components/pages/admin/prototypes/form/panels/PrototypeLogoImageFormPanel';
import {OgImageFormPanel, ogImgUrlAtom} from '^components/pages/admin/prototypes/form/panels/PrototypeOgImageFormPanel';
import {getOpenGraphData} from '^api/utils.api/open-graph.api';
import {useSetRecoilState} from 'recoil';

interface CreatePrototypeFormProps {
    form: UseFormReturn<CreateDto>;
    onSubmit: (data: CreateDto) => any;
}

interface UpdatePrototypeFormProps {
    form: UseFormReturn<UpdateDto>;
    onSubmit: (data: UpdateDto) => any;
    prototype: ApplicationPrototypeDto | null;
}

/**
 * TODO (리팩토링)
 * 1. 해당 form component에서 Tag State 관리를 분리하기
 * 2. Tag state와 Multi Select가 종속적, 이 둘을 분리하거나 아예 하나의 모듈로 합쳐서 다루기
 */

export const PrototypeForm = (props: CreatePrototypeFormProps | UpdatePrototypeFormProps) => {
    const {form, onSubmit} = props;
    const prototype = 'prototype' in props ? props.prototype : null;
    const [tags, setTags] = useState<TagDto[]>([]);
    const [tagSearchResult, setTagSearchResult] = useState<TagDto[]>([]);
    const {search, createByName} = useTagSearch(TagGroup.Application);
    const setFaviconUrl = useSetRecoilState(faviconUrlAtom);
    const setLogoUrl = useSetRecoilState(logoUrlAtom);
    const setOgImgUrl = useSetRecoilState(ogImgUrlAtom);

    // set loaded prototype data on form
    useEffect(() => {
        if (!prototype) {
            form.setValue('desc', '');
            return;
        }
        // 수정과 생성 모두에서 사용하는 인풋
        form.setValue('name', prototype.name); // 서비스명
        form.setValue('tagline', prototype.tagline); // Tagline
        form.setValue('homepageUrl', prototype.homepageUrl); // Homepage url
        form.setValue('image', prototype.image); // 이미지 url
        form.setValue('ogImageUrl', prototype.ogImageUrl ?? ''); // og image url
        form.setValue('pricingPageUrl', prototype.pricingPageUrl); // Pricing Page url
        form.setValue('companyName', prototype.companyName); // 운영사명

        // 아래는 수정 폼에서만 노출되는 인풋
        form.setValue('searchText', prototype.searchText); // 검색키워드
        form.setValue('connectMethod', prototype.connectMethod as PrototypeConnectMethod); // 연동방법
        form.setValue('isAutoTrackable', prototype.isAutoTrackable); // API 지원 여부
        form.setValue('isFreeTierAvailable', prototype.isFreeTierAvailable); // 프리티어 지원 여부
        form.setValue('desc', prototype.desc); // 비고
    }, [prototype]);

    // set loaded prototype's tag data on form & tag state
    useEffect(() => {
        if (!prototype) return;
        if (prototype?.tags?.length === 0) return;

        const ids = prototype.tags.map((tag) => tag.id);

        setTags(prototype.tags);
        form.setValue('tagIds', ids);
    }, [prototype?.tags]);

    const selectOptionMapper = (tag: TagDto): SelectOption => {
        return {label: tag.name, value: tag.name};
    };

    const searchTagOptions = async (input: string) => {
        const params = input ? {where: {name: input}} : {};
        const tags = await search(params);

        setTagSearchResult(tags);

        return tags.map(selectOptionMapper);
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

    const onSelectTag = async (options: MultiValue<Option>, actionType?: ActionMeta<Option>) => {
        const addTag = (tag: TagDto) => {
            const oldIds = form.getValues().tagIds ?? [];
            form.setValue('tagIds', [...oldIds, tag.id]);
            setTags((old) => [...old, tag]);
        };

        const removeTag = (tag: TagDto) => {
            const oldIds = form.getValues().tagIds ?? [];
            const filteredIds = oldIds.filter((id) => id !== tag.id);

            form.setValue('tagIds', filteredIds);
            setTags((oldTags) => oldTags.filter((oldTag) => oldTag.id !== tag.id));
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

                const tag = tagSearchResult.find((tag) => tag.name === selectedOption.value);
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
                    setTags([]);
                }
                break;

            default:
                break;
        }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const formSubmit = form.handleSubmit(onSubmit);

    const onPrompt = async () => {
        const url = prompt('웹사이트 주소를 넣어주세요.');
        if (url) {
            const openGraphData = await getOpenGraphData(url);
            console.log(openGraphData);
            form.setValue('name', openGraphData.hybridGraph.site_name);
            form.setValue('tagline', openGraphData.htmlInferred.description);
            form.setValue('homepageUrl', openGraphData.htmlInferred.url);

            // favicon
            setFaviconUrl(openGraphData.htmlInferred.favicon);
            setLogoUrl(openGraphData.htmlInferred.favicon);
            form.setValue('image', openGraphData.htmlInferred.favicon);

            // thumbnail
            setOgImgUrl(openGraphData.htmlInferred.image);
            form.setValue('ogImageUrl', openGraphData.htmlInferred.image);
        }
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button className="btn btn-scordi-light btn-sm" onClick={onPrompt}>
                    사이트에서 불러오기
                </button>
            </div>

            <ContentForm onSubmit={formSubmit}>
                <ContentPanel title="기본정보">
                    <ContentPanelList>
                        <ContentPanelInput title="App name" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. Github"
                                {...form.register('name', {required: true})}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Category" required={true}>
                            <MultiSelect
                                value={tags.map(selectOptionMapper)}
                                loadOptions={searchTagOptions}
                                onChange={onSelectTag}
                                style={multiSelectStyle}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Summary" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. Github"
                                {...form.register('tagline', {required: true})}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Website URL" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. https://www.github.com"
                                {...form.register('homepageUrl', {required: true})}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Pricing URL" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. https://www.github.com"
                                {...form.register('pricingPageUrl', {required: true})}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Company Name" required={true}>
                            <TextInput
                                required={true}
                                placeholder="ex. Github, Inc"
                                {...form.register('companyName', {required: true})}
                            />
                        </ContentPanelInput>
                    </ContentPanelList>
                </ContentPanel>

                <LogoImageFormPanel form={form} proto={prototype ?? null} />
                <OgImageFormPanel form={form} proto={prototype ?? null} />

                <ContentPanel title="세부정보">
                    <ContentPanelList>
                        <ContentPanelInput
                            title="Keyword"
                            text="앱 이름과 함께 검색어로 등록할 키워드들을 쉼표(,) 로 구분하여 입력해주세요."
                        >
                            <TextInput placeholder="ex. Github,깃헙,깃허브,git" {...form.register('searchText')} />
                        </ContentPanelInput>

                        <ContentPanelInput title="Note" text="프로모션과 같이 메모할 정보들을 입력해주세요.">
                            <TextInput
                                placeholder="ex. 첫 6개월 구독 시 50% 할인 정보 공유할 것"
                                {...form.register('desc')}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="API Supported?" text="API 지원 여부">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                {...form.register('isAutoTrackable')}
                            />
                        </ContentPanelInput>

                        <ContentPanelInput title="Free-Tier Included?" text="프리티어 지원 여부">
                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                {...form.register('isFreeTierAvailable')}
                            />
                        </ContentPanelInput>
                    </ContentPanelList>
                </ContentPanel>
            </ContentForm>
            {prototype && <PrototypePlanCyclePanel prototype={prototype} />}
            {prototype && <PrototypeDeletePanel prototype={prototype} />}
        </div>
    );
};
