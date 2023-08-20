import {useRecoilState} from 'recoil';
import {getPostListQueryAtom, getPostListResultAtom, postAtom, recentPostAtom} from '^atoms/posts.atom';
import {FindAllPostQueryDto, PostDto} from '^types/post.type';
import {postApi} from '^api/post.api';
import {useEffect} from 'react';

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

export const useRecentPost = () => {
    const [post, setPost] = useRecoilState(recentPostAtom);

    async function load() {
        postApi.recent().then((data) => setPost(data));
    }

    return {data: post, load};
};

export const usePost = (postData?: PostDto) => {
    const [post, setPost] = useRecoilState(postAtom);

    if (postData) setPost(postData);

    const getPost = async (id: number) => {
        postApi
            .show(id)
            .then((res) => res.data)
            .then((data) => {
                setPost(data);
            });
    };

    return {post, getPost, setPost};
};
