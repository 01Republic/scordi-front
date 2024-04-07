import React, {memo} from 'react';
import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {AdminPostsPageRoute} from '^pages/admin/posts';
import {useForm} from 'react-hook-form';
import {CreatePostByAdminDto} from '^models/Post/type';
import {postManageApi} from '^models/Post/api';
import {useRouter} from 'next/router';
import {BlogForm} from '../form/BlogForm';
import {toast} from 'react-toastify';
import {errorToast} from '^api/api';
import {AdminPageContainer} from '^admin/layouts';

export const AdminBlogNewPage = memo(() => {
    const router = useRouter();
    const form = useForm<CreatePostByAdminDto>();

    const onSubmit = (data: CreatePostByAdminDto) => {
        postManageApi
            .create(data)
            .then(async (res) => {
                router.replace(AdminPostsPageRoute.path());
                toast.success('Successfully Created!');
            })
            .catch(errorToast);
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
            <AdminPageContainer>
                <BlogForm form={form} onSubmit={onSubmit} />
            </AdminPageContainer>
        </AdminDetailPageLayout>
    );
});
