import {useRecoilState} from 'recoil';
import {getPostListQueryAtom, getPostListResultAtom, postAtom} from '^atoms/posts.atom';
import {FindAllPostQueryDto} from '^types/post.type';
import {postApi} from '^api/post.api';

export const usePosts = () => {
    const [result, setResult] = useRecoilState(getPostListResultAtom);
    const [query, setQuery] = useRecoilState(getPostListQueryAtom);

    async function search(params: FindAllPostQueryDto) {
        if (JSON.stringify(query) === JSON.stringify(params)) return;

        const data = await postApi.index(params).then((res) => res.data);
        setResult(data);
        setQuery(params);
    }

    const movePage = (page: number) => search({...query, page});

    return {query, result, search, movePage};
};

export const usePost = () => {
    const [post, setPost] = useRecoilState(postAtom);

    const getPost = async (id: number) => {
        postApi
            .show(id)
            .then((res) => res.data)
            .then((data) => {
                setPost(data);
            });
    };

    return {post, getPost};
};
