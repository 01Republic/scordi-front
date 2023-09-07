import React, {memo, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useRecoilState} from 'recoil';
import {adminProductDetail} from '^components/pages/admin/products/AdminProductDetailpage';
import {PostDto, CreatePostByAdminDto as CreateDto, UpdatePostByAdminDto as UpdateDto} from '^types/post.type';
import {postManageApi} from '^api/post-manage.api';
import {BlogForm} from '^components/pages/admin/blogs/form/BlogForm';

export const EditProductPost = memo(() => {
    const [product, setProduct] = useRecoilState(adminProductDetail);
    const [post, setPost] = useState<PostDto | null>(null);
    const form = useForm<CreateDto | UpdateDto>();

    useEffect(() => {
        if (!product) return;
        const post = product.posts[product.posts.length - 1];
        setPost(post);
    }, [product]);

    /**
     * 최초 생성시 설정
     */
    useEffect(() => {
        if (!product) return;

        form.setValue('productId', product.id);
        form.setValue('title', product.nameEn);
        form.setValue('content', '');
        form.setValue('seoTitle', product.nameEn);
        form.setValue('seoDescription', product.tagline);
    }, [product]);

    /**
     * 이미 post 가 있다면
     */
    useEffect(() => {
        if (!product) return;
        if (!post) return;

        form.setValue('title', post.title || product.nameEn);
        form.setValue('content', post.content);
        form.setValue('seoTitle', post.seoTitle || product.nameEn);
        form.setValue('seoDescription', post.seoDescription || product.tagline);
        if (post.publishAt) {
            form.setValue('publishAt', new Date(post.publishAt));
        }
        if (post.seoKeywords) {
            form.setValue('seoKeywords', post.seoKeywords);
        }
    }, [post]);

    const createOrUpdate = post?.id
        ? (data: UpdateDto) => postManageApi.update(post.id, data)
        : (data: CreateDto) => postManageApi.create(data).then((res) => setPost(res.data));

    const onSubmit = (data: UpdateDto | CreateDto) =>
        // @ts-ignore
        createOrUpdate(data).then((res) => {
            toast.success('Successfully Saved!');
        });

    // @ts-ignore
    return <BlogForm form={form} onSubmit={onSubmit} post={post} useTag={false} />;
});
