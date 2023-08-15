import React, {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useRecoilState} from 'recoil';
import {adminPrototypeDetail} from '^components/pages/admin/prototypes/AdminPrototypeDetailpage';
import {PostDto, CreatePostByAdminDto as CreateDto, UpdatePostByAdminDto as UpdateDto} from '^types/post.type';
import {postManageApi} from '^api/post-manage.api';
import {BlogForm} from '^components/pages/admin/blogs/form/BlogForm';

export const EditPrototypePost = memo(() => {
    const [prototype, setPrototype] = useRecoilState(adminPrototypeDetail);
    const [post, setPost] = useState<PostDto | null>(null);
    const form = useForm<CreateDto | UpdateDto>();

    useEffect(() => {
        if (!prototype) return;
        const post = prototype.posts[prototype.posts.length - 1];
        setPost(post);
    }, [prototype]);

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
    }, [post]);

    const createOrUpdate = post?.id
        ? (data: UpdateDto) => postManageApi.update(post.id, data)
        : (data: CreateDto) => postManageApi.create(data);

    const onSubmit = (data: UpdateDto | CreateDto) =>
        // @ts-ignore
        createOrUpdate(data).then((res) => {
            toast.success('Successfully Saved!');
        });

    // @ts-ignore
    return <BlogForm form={form} onSubmit={onSubmit} post={post} />;
});
