import React, {memo} from 'react';
import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {AdminPostsPageRoute} from '^pages/admin/posts';
import {useForm} from 'react-hook-form';
import {CreatePostByAdminDto} from '^types/post.type';
import {postManageApi} from '^api/post-manage.api';
import {useRouter} from 'next/router';
import {AdminPostPageRoute} from '^pages/admin/posts/[id]';
import {BlogForm} from '../form/BlogForm';

export const AdminBlogNewPage = memo(() => {
    const router = useRouter();
    const form = useForm<CreatePostByAdminDto>();

    const onSubmit = (data: CreatePostByAdminDto) => {
        postManageApi.create(data).then((res) => {
            router.replace(AdminPostPageRoute.path(res.data.id));
        });
    };

    return (
        <AdminDetailPageLayout
            title="새 게시글"
            breadcrumbs={[
                {text: '블로그 관리'},
                {text: '게시글 목록', href: AdminPostsPageRoute.path()},
                {text: '새 게시글'},
            ]}
        >
            <div className="container pt-10 px-2 sm:px-8">
                <div className="w-full">
                    <BlogForm form={form} onSubmit={onSubmit} />
                </div>
            </div>
        </AdminDetailPageLayout>
    );
});
