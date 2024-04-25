import React, {useEffect} from 'react';
import {atom, useSetRecoilState} from 'recoil';
import {NextPageContext} from 'next';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {publicPageRequires} from '^types/utils/18n.type';
import {PostDto} from '^models/Post/type';
import {showStaticPost} from '^models/Post/api';
import {BlogPostDetailPage} from '^clients/public/blog/BlogPostDetailPage';

export const PostDetailPageRoute = pathRoute({
    pathname: '/posts/[id]',
    path: (id: number) => pathReplace(PostDetailPageRoute.pathname, {id}),
});

// export const getStaticPaths = async () => ({
//     paths: [{params: {id: '0'}}],
//     fallback: true,
// });

// export const getStaticProps = async ({locale}: any) => ({
//     props: {
//         // Will be passed to the page component as props
//         ...(await serverSideTranslations(locale, [
//             ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
//         ])),
//     },
// });

export const isPageLoadedAtom = atom({
    key: 'blogDetailPage/isLoaded',
    default: false,
});

export default function PostDetailPage({post}: {post: PostDto}) {
    const router = useRouter();
    const setIsLoaded = useSetRecoilState(isPageLoadedAtom);

    useEffect(() => {
        if (!router.isReady) return;
        setIsLoaded(true);
    }, [router.isReady]);

    return <BlogPostDetailPage post={post} />;
}

// SSR 파트
export const getServerSideProps = async function ({req, query, locale}: NextPageContext) {
    const id = Number(query.id); // postId
    if (isNaN(id)) return;

    // 데이터 load api를 호출하여 post data load
    const post = await showStaticPost(id);
    return {
        props: {
            post,
            // Will be passed to the page component as props
            ...(await serverSideTranslations(locale!, [
                ...publicPageRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
            ])),
        },
    };
};
