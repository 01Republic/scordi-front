import React, {memo, useEffect, useState} from 'react';
import {AdminDetailPageLayout} from '^components/pages/admin/layouts/DetailPageLayout';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {PostDto, UpdatePostByAdminDto} from '^types/post.type';
import {postManageApi} from '^api/post-manage.api';
import {AdminPostPageRoute} from '^pages/admin/posts/[id]';
import {AdminPostsPageRoute} from '^pages/admin/posts';
import {BlogForm} from '../form/BlogForm';
import {toast} from 'react-toastify';
import {AdminEditPostPageRoute} from '^pages/admin/posts/[id]/edit';

export const AdminBlogEditPage = memo(() => {
    const router = useRouter();
    const id = Number(router.query.id);
    const [post, setPost] = useState<PostDto | null>(null);
    const form = useForm<UpdatePostByAdminDto>();

    useEffect(() => {
        if (!id || isNaN(id)) return;
        postManageApi.show(id).then((res) => setPost(res.data));
    }, [id]);

    useEffect(() => {
        if (!post) return;

        form.setValue('title', post.title);
        form.setValue('content', post.content);
        form.setValue('seoTitle', post.seoTitle);
        form.setValue('seoDescription', post.seoDescription);
        if (post.publishAt) {
            form.setValue('publishAt', new Date(post.publishAt));
        }
        if (post.seoKeywords) {
            form.setValue('seoKeywords', post.seoKeywords);
        }
        if (post.tags) {
            const tagNames = post.tags.map((tag) => tag.name);
            form.setValue('tagNames', tagNames);
        }
    }, [post]);

    const onSubmit = (data: UpdatePostByAdminDto) => {
        if (!post) return;
        postManageApi.update(post.id, data).then(async (res) => {
            await router.push(AdminEditPostPageRoute.path(res.data.id));
            toast.success('Successfully Saved!');
        });
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
