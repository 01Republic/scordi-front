import {CardPanel} from '^components/pages/admin/share/panels/CardPanel';
import {TextInput} from '^components/TextInput';
import {WysiwygEditor} from '^components/WysiwygEditor';
import {fileApi} from '^api/file.api';
import React, {useCallback, useEffect, useState} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {CreatePostByAdminDto, PostDto, UpdatePostByAdminDto} from '^types/post.type';
import {datetime_local, yyyy_mm_dd} from '^utils/dateTime';
import {SelectDropdown} from '^v3/share/Select';
import {MultiSelect} from '^components/util/select/MultiSelect';
import {postTagManageApi} from '^api/post-manage.api';

interface CreateBlogFormProps {
    form: UseFormReturn<CreatePostByAdminDto>;
    onSubmit: (data: CreatePostByAdminDto) => any;
}

interface UpdateBlogFormProps {
    form: UseFormReturn<UpdatePostByAdminDto>;
    onSubmit: (data: UpdatePostByAdminDto) => any;
    post: PostDto;
}

export const BlogForm = (props: CreateBlogFormProps | UpdateBlogFormProps) => {
    const {form, onSubmit} = props;
    const post = 'post' in props ? props.post : null;
    const [publishAt, setPublishAt] = useState<Date | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
    const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
    const [tagNames, setTagNames] = useState<string[]>([]);

    useEffect(() => {
        // @ts-ignore
        setPublishAt(form.getValues('publishAt') as Date | null);
        // @ts-ignore
        setSeoKeywords(form.getValues('seoKeywords') || []);
        // // @ts-ignore
        // setTagNames(form.getValues('tagNames') || []);
    }, []);

    const resetThumbnailUrl = useCallback(() => {
        if (!post) return;
        if (post.thumbnailUrl) setThumbnailUrl(post.thumbnailUrl);
    }, [post]);

    const resetTags = useCallback(() => {
        if (!post) return;
        if (post.tags) {
            const names = post.tags.map((tag) => tag.name);
            setTagNames(names);
            form.setValue('tagNames', names);
        }
    }, [post]);

    useEffect(() => {
        resetThumbnailUrl();
        resetTags();
    }, [post]);

    const addKeyword = (text: string) => {
        const arr = [...seoKeywords, text];
        setSeoKeywords(arr);
        form.setValue('seoKeywords', arr);
    };

    const removeKeyword = (i: number) => {
        const arr = [...seoKeywords.filter((v, ai) => ai !== i)];
        setSeoKeywords(arr);
        form.setValue('seoKeywords', arr);
    };

    const searchTags = async (inputValue: string): Promise<{value: string; label: string}[]> => {
        const tags = await postTagManageApi
            .index({
                name: inputValue,
                order: {id: 'DESC'},
            })
            .then((res) => res.data);

        return tags.map((tag) => ({
            value: tag.name,
            label: tag.name,
        }));
    };

    // const createTag = async (inputValue: string) => {
    //     const tags = await postTagManageApi.create({name: inputValue}).then((res) => res.data);
    // };

    return (
        // @ts-ignore
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardPanel>
                <div className="grid grid-cols-10">
                    <div className="col-span-7 p-6">
                        <div className="mb-4">
                            <TextInput
                                label="제목"
                                inputClass="!bg-white !border-gray-300"
                                {...form.register('title', {required: true})}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="post-content" className="label font-semibold">
                                본문
                            </label>
                            <WysiwygEditor
                                width="100%"
                                height="800px"
                                valueType="html"
                                initialEditType="wysiwyg"
                                initialValue={post?.content || ''}
                                placeholder="앱을 아직 사용한 적 없는 분들을 대상으로 간단하게 소개하는 글을 입력해주세요."
                                onChange={(v) => form.setValue('content', v)}
                                hooks={{
                                    addImageBlobHook: async (blob, callback) => {
                                        console.log(blob);
                                        const file = await fileApi.upload({file: blob});
                                        callback(file.url, file.filename);
                                    },
                                }}
                            />
                        </div>

                        <div className="divider" />

                        <div className="form-control mb-4">
                            <label htmlFor="post-thumbnail" className="label font-semibold">
                                공유 썸네일
                            </label>
                            <div className="flex flex-col gap-2">
                                <input
                                    type="file"
                                    id="post-thumbnail"
                                    className="file-input file-input-bordered w-full"
                                    multiple={false}
                                    onChange={(e) => {
                                        const file = e.target.files ? e.target.files[0] : null;
                                        if (file) {
                                            form.setValue('thumbnailImage', file);
                                            setThumbnailUrl(URL.createObjectURL(file));
                                        } else {
                                            form.resetField('thumbnailImage');
                                            resetThumbnailUrl();
                                        }
                                    }}
                                />
                                <div className="w-full">
                                    {thumbnailUrl && <img src={thumbnailUrl} alt="" className="border w-full" />}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <TextInput
                                label="SEO 제목"
                                inputClass="!bg-white !border-gray-300"
                                {...form.register('seoTitle', {required: true})}
                            />
                        </div>

                        <div className="mb-4">
                            <TextInput
                                label="SEO 설명"
                                inputClass="!bg-white !border-gray-300"
                                {...form.register('seoDescription', {required: true})}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="post-keywords" className="label font-semibold">
                                SEO 키워드
                            </label>
                            <div className="tags-input-container border rounded-lg border-gray-300">
                                {seoKeywords.map((keyword, i) => (
                                    <div key={i} className="tag-item">
                                        <span className="text-sm">{keyword}</span>
                                        <span className="close" onClick={() => removeKeyword(i)}>
                                            &times;
                                        </span>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    className="tags-input"
                                    placeholder="키워드는 쉼표(,) 로 구분합니다."
                                    onChange={(e) => {
                                        const input = e.target;
                                        if (input.value.includes(',')) {
                                            const value = input.value.replace(/,/g, '');
                                            addKeyword(value);
                                            input.value = '';
                                        }
                                    }}
                                />
                            </div>
                            {/*<TextInput*/}
                            {/*    label="SEO 키워드"*/}
                            {/*    inputClass="!bg-white !border-gray-300"*/}
                            {/*    {...form.register('seoKeywords')}*/}
                            {/*/>*/}
                        </div>
                    </div>

                    <div className="col-span-3 p-6 bg-gray-200 rounded-tr-box rounded-br-box">
                        <div className="mb-4">
                            <label htmlFor="publishAt" className="label">
                                <span className="label-text">발행일시</span>
                            </label>
                            <input
                                id="publishAt"
                                type="datetime-local"
                                className="input input-bordered w-full"
                                defaultValue={publishAt ? datetime_local(publishAt) : undefined}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const date = new Date(value);
                                    form.setValue('publishAt', date);
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="publishAt" className="label">
                                <span className="label-text">Tags</span>
                            </label>

                            <MultiSelect
                                value={tagNames.map((name) => ({
                                    label: name,
                                    value: name,
                                }))}
                                loadOptions={searchTags}
                                onChange={(options) => {
                                    const names = options.map(({value}) => value);
                                    setTagNames(names);
                                    form.setValue('tagNames', names);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </CardPanel>

            <div className="text-right mt-6">
                <button className="btn btn-lg btn-primary">Save</button>
            </div>
        </form>
    );
};
