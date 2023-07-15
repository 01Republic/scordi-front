import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {pathRoute, pathReplace} from '^types/pageRoute.type';
import {publicPageRequires} from '^types/utils/18n.type';
import {BlogPostListPage} from '^components/pages/blog/BlogPostListPage';

export const PostListPageRoute = pathRoute({
    pathname: '/posts',
    path: () => pathReplace(PostListPageRoute.pathname, {}),
});

export const getStaticProps = async ({locale}: any) => ({
    props: {
        // Will be passed to the page component as props
        ...(await serverSideTranslations(locale, [
            ...publicPageRequires, // 여기에 이 페이지에서 사용할 locale 파일을 추가하세요.
        ])),
    },
});

export default function PostListPage() {
    return <BlogPostListPage />;
}
