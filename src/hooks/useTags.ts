import {useRecoilState} from 'recoil';
import {tagAtom, tagSearchParams, tagSearchResultsState} from '^atoms/tags.atom';
import {CreateTagByAdminDto, FindAllTagQueryDto, TagDto, TagGroup} from '^types/tag.type';
import {tagApi} from '^api/tag.api';

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
        if (!params.where) params = {where: {group}};

        if (JSON.stringify(query) === JSON.stringify(params)) return result;

        const data = await tagApi
            .index({
                ...params,
                itemsPerPage: 500,
            })
            .then((res) => res.data.items);

        setResult(data);
        setQuery(params);

        return data;
    };

    const createByName = (name: string) => tagApi.create({name, group}).then((res) => res.data);

    return {result, query, search, createByName};
};
