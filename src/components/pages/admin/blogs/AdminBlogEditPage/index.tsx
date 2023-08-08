import React, {memo, useEffect, useState} from 'react';
import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {PostDto, UpdatePostByAdminDto} from '^types/post.type';
import {postManageApi} from '^api/post-manage.api';
import {AdminPostsPageRoute} from '^pages/admin/posts';
import {BlogForm} from '../form/BlogForm';
import {toast} from 'react-toastify';
import {errorToast} from '^api/api';

export const AdminBlogEditPage = memo(() => {
    const router = useRouter();
    const id = Number(router.query.id);
    const [post, setPost] = useState<PostDto | null>(null);
    const form = useForm<UpdatePostByAdminDto>();

    useEffect(() => {
        if (!id || isNaN(id)) return;
        postManageApi.show(id).then((res) => setPost(res.data));
    }, [id]);

    const onSubmit = (data: UpdatePostByAdminDto) => {
        if (!post) return;
        postManageApi
            .update(post.id, data)
            .then(async (res) => {
                await router.push(AdminPostsPageRoute.path());
                toast.success('Successfully Updated!');
            })
            .catch(errorToast);
    };

    if (!post) return <></>;

    return (
        <AdminDetailPageLayout
            title="게시글 수정"
            breadcrumbs={[
                {text: '블로그 관리'},
                {text: '게시글 목록', href: AdminPostsPageRoute.path()},
                {text: '게시글 수정'},
            ]}
        >
            <div className="container pt-10 px-2 sm:px-8">
                <div className="w-full">
                    <BlogForm form={form} onSubmit={onSubmit} post={post} />
                </div>
            </div>
        </AdminDetailPageLayout>
    );
});
