import {pathReplace, pathRoute} from '^types/pageRoute.type';
import {PostDto} from '^types/post.type';
import {useRouter} from 'next/router';
import {useSetRecoilState} from 'recoil';
import React, {useEffect} from 'react';
import {NextPageContext} from 'next';
import {postApi} from '^api/post.api';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {v3CommonRequires} from '^types/utils/18n.type';
import {isPageLoadedAtom} from '^pages/posts/[id]';
import {ProductPostDetailPage} from '^components/pages/products/ProductPostDetailPage';

export const ProductPostDetailPageRoute = pathRoute({
    pathname: '/products/[id]',
    path: (id: number) => pathReplace(ProductPostDetailPageRoute.pathname, {id}),
});

export default function ProductPage({post}: {post: PostDto}) {
    const router = useRouter();
    const setIsLoaded = useSetRecoilState(isPageLoadedAtom);

    useEffect(() => {
        if (!router.isReady) return;
        setIsLoaded(true);
    }, [router.isReady]);

    return <ProductPostDetailPage post={post} />;
}

// SSR 파트
export const getServerSideProps = async function ({req, query, locale}: NextPageContext) {
    const id = Number(query.id); // postId

    // 데이터 load api를 호출하여 post data load
    const post = await postApi.show(id).then((res) => res.data);

    return {
        props: {
            post,
            // Will be passed to the page component as props
            ...(await serverSideTranslations(locale!, [
                ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
            ])),
        },
    };
};
