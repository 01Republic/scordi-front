import {useRecoilState} from 'recoil';
import {tagAtom, tagSearchParams, tagSearchResultsState} from '^models/Tag/atom';
import {FindAllTagQueryDto, TagDto, TagGroup} from '^models/Tag/type';
import {tagApi} from '^models/Tag/api';
import {Option} from '^components/util/react-select/Option';
import {Paginated} from '^types/utils/paginated.dto';
import {useMultiSelect} from '^hooks/useMultiSelect';

interface TagMultiSelectParams {
    componentControl: {
        add: (tag: TagDto) => void;
        remove: (tag: TagDto) => void;
        reset: () => void;
    };
    hooks: {
        search: (params: FindAllTagQueryDto) => Promise<Paginated<TagDto>>;
        createByName: (name: string) => Promise<TagDto>;
        result: Paginated<TagDto>;
        query: FindAllTagQueryDto;
    };
}

export const useTag = () => {
    const [tag, setTag] = useRecoilState(tagAtom);

    const getTag = async (id: number) => {
        tagApi
            .show(id)
            .then((res) => res.data)
            .then((data) => setTag(data));
    };

    return {tag, getTag};
};

export const useTags = (group: TagGroup) => {
    const [result, setResult] = useRecoilState(tagSearchResultsState);
    const [query, setQuery] = useRecoilState(tagSearchParams);

    const search = async (params: FindAllTagQueryDto) => {
        params.where ||= {};
        params.where.group ||= group;

        if (JSON.stringify(query) === JSON.stringify(params)) return result;

        const data = await tagApi.index({...params}).then((res) => res.data);

        setResult(data);
        setQuery(params);

        return data;
    };

    const createByName = (name: string, organizationId?: number) =>
        tagApi.create({name, group, organizationId}).then((res) => {
            // 새로 생긴 tag를 reload
            tagApi.index(query).then((res) => setResult(res.data));
            return res.data;
        });

    return {result, query, search, createByName};
};

export const useProductTags = () => useTags(TagGroup.Product);
export const usePayingTypeTags = () => useTags(TagGroup.RecurringType);
export const useBillingCycleTags = () => useTags(TagGroup.BillingCycle);

export const useTagMultiSelect = (params: TagMultiSelectParams) => {
    const {componentControl, hooks} = params;
    const {add, remove, reset} = componentControl;
    const {search, createByName, result} = hooks;

    const mapper = (tag: TagDto): Option => ({label: tag.name, value: tag.name});
    const defaultLoader = () => search({}).then((data) => data.items);
    const loader = (input: string) => search({where: {name: input}}).then((data) => data.items);
    const filter = (option: Option, input: string) => option.value.toLowerCase().includes(input);

    const onCreate = async (option: Option) => {
        const newTag = await createByName(option.value);
        add(newTag);
    };

    const onSelect = (option: Option) => {
        const tag = result.items.find((tag) => tag.name === option.value);
        if (!tag) return;
        add(tag);
    };

    const onRemove = (option: Option) => {
        const tag = result.items.find((tag) => tag.name === option.value);
        if (!tag) return;
        remove(tag);
    };

    const onClear = () => reset();

    return useMultiSelect({
        mapper,
        filter,
        defaultLoader,
        loader,
        onChangeCallbacks: {onCreate, onSelect, onRemove, onClear},
    });
};
