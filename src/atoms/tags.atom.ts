import {atom, selector} from 'recoil';
import {FindAllTagQueryDto, TagDto} from '^types/tag.type';
import {tagApi} from '^api/tag.api';
import {errorNotify} from '^utils/toast-notify';
import {tagIdParamState} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';

export const tagSearchResultsState = atom<Paginated<TagDto>>({
    key: 'tagSearchResultsState',
    default: {
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 1,
            currentPage: 1,
            itemsPerPage: 30,
        },
    },
});

export const tagSearchParams = atom<FindAllTagQueryDto>({
    key: 'tagSearchParams',
    default: {},
});

export const tagAtom = atom<TagDto | null>({
    key: 'tagAtom',
    default: null,
});

export const getTagsParamsState = atom<FindAllTagQueryDto>({
    key: 'getTagsParamsState',
    default: {},
});

export const getTagsQuery = selector({
    key: 'getTagsQuery',
    get: async ({get}) => {
        const params = get(getTagsParamsState);

        try {
            const res = await tagApi.index(params);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

export const getTagQueryTrigger = atom({
    key: 'getTagQueryTrigger',
    default: 0,
});

export const getTagQuery = selector({
    key: 'getTagQuery',
    get: async ({get}) => {
        get(getTagQueryTrigger);
        const id = get(tagIdParamState);
        if (isNaN(id)) return;

        try {
            const res = await tagApi.show(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({set}) => {
        set(getTagQueryTrigger, (v) => v + 1);
    },
});
