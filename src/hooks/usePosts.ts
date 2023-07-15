import {useRecoilState} from 'recoil';
import {getPostListQueryAtom, getPostListResultAtom} from '^atoms/posts.atom';
import {FindAllPostQueryDto} from '^types/post.type';
import {postApi} from '^api/post.api';

export const usePosts = () => {
    const [result, setResult] = useRecoilState(getPostListResultAtom);
    const [query, setQuery] = useRecoilState(getPostListQueryAtom);

    async function search(params: FindAllPostQueryDto) {
        console.log('search', 1);
        if (JSON.stringify(query) === JSON.stringify(params)) return;
        console.log('search', 2);

        const data = await postApi.index(params).then((res) => res.data);
        console.log('search', 3);
        setResult(data);
        setQuery(params);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};
