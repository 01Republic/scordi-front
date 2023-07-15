import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {v3CommonRequires} from '^types/utils/18n.type';
import {BlogPostDetailPage} from '^components/pages/blog/BlogPostDetailPage';

export const PostDetailPageRoute = pathRoute({
    pathname: '/posts/[id]',
    path: (id: number) => pathReplace(PostDetailPageRoute.pathname, {id}),
});

export const getStaticPaths = async () => ({
    paths: [{params: {id: '0'}}],
    fallback: true,
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...v3CommonRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function PostDetailPage() {
    return <BlogPostDetailPage />;
}
