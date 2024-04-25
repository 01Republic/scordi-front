import {CardPanel} from '^admin/share/panels/CardPanel';
import {TextInput} from '^components/TextInput';
import {WysiwygEditor} from '^components/WysiwygEditor';
import {fileApi} from '^api/file.api';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {CreatePostByAdminDto, PostDto, UpdatePostByAdminDto} from '^models/Post/type';
import {datetime_local, yyyy_mm_dd} from '^utils/dateTime';
import {SelectDropdown} from '^v3/share/Select';
import {MultiSelect, Option} from '^components/util/react-select';
import {postAuthorManageApi, postTagManageApi} from '^models/Post/api';
import {PostAuthorDto, UpdatePostAuthorByAdminDto} from '^models/Post/type/authorType';
import {MultiValue} from 'react-select';
import {toast} from 'react-toastify';
import {errorNotify} from '^utils/toast-notify';
import {debounce} from 'lodash';

interface CreateBlogFormProps {
    form: UseFormReturn<CreatePostByAdminDto>;
    onSubmit: (data: CreatePostByAdminDto) => any;
    useTag?: boolean;
}

interface UpdateBlogFormProps {
    form: UseFormReturn<UpdatePostByAdminDto>;
    onSubmit: (data: UpdatePostByAdminDto) => any;
    post: PostDto;
    useTag?: boolean;
}

const byId = (id: number) => (author: PostAuthorDto) => author.id === id;
const pluckId = (entity: {id: number}) => entity.id;
const findAuthorsById = (authors: PostAuthorDto[], ids: number[]): PostAuthorDto[] => {
    const foundAuthors = ids.map((id) => authors.find(byId(id)));
    return foundAuthors.filter((e) => !!e) as PostAuthorDto[];
};

export const BlogForm = (props: CreateBlogFormProps | UpdateBlogFormProps) => {
    const {form, onSubmit} = props;
    const post = 'post' in props ? props.post : null;
    const useTag = props.useTag ?? true;
    const [publishAt, setPublishAt] = useState<Date | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
    const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
    const [tagNames, setTagNames] = useState<string[]>([]);
    const [authors, setAuthors] = useState<PostAuthorDto[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<PostAuthorDto[]>([]);

    useEffect(() => {
        // @ts-ignore
        setPublishAt(form.getValues('publishAt') as Date | null);
        // @ts-ignore
        setSeoKeywords(form.getValues('seoKeywords') || []);
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

    const resetAuthors = useCallback(() => {
        if (!post) return;
        if (post.authors) {
            const authorIds = post.authors.map(pluckId);
            setSelectedAuthors(post.authors);
            form.setValue('authorIds', authorIds);
        }
    }, [post]);

    useEffect(() => {
        form.setValue('content', '');
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

    useEffect(() => {
        resetThumbnailUrl();
        resetTags();
        resetAuthors();
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

    const searchTags = async (inputValue: string) => {
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

    const searchAuthors = async (inputValue: string) => {
        const authors = await postAuthorManageApi
            .index({
                name: inputValue,
                order: {name: 'ASC', id: 'DESC'},
            })
            .then((res) => res.data);

        setAuthors((old) => [...old, ...authors]);
        return authors.map((author) => ({
            value: author.id,
            label: author.name,
        }));
    };

    const onSelectAuthors = async (options: MultiValue<Option>) => {
        const newAuthors = await Promise.all(
            options
                .filter((o) => o.__isNew__)
                .map(async (o) => {
                    return postAuthorManageApi.create({name: o.value}).then((res) => res.data);
                }),
        );

        const ids = options.map((o) => {
            if (typeof o.value === 'number') return o.value;
            if (typeof o.value === 'string' && o.__isNew__) {
                const author = newAuthors.find((newAuthor) => newAuthor.name === o.value)!;
                return author.id;
            }
            return o.value;
        });

        const dataList = [...authors, ...newAuthors];
        const foundList = findAuthorsById(dataList, ids);
        setSelectedAuthors(foundList);
        setAuthors((old) => [...old, ...newAuthors]);
        form.setValue('authorIds', foundList.map(pluckId));
    };

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
                                required={true}
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
                                required={true}
                            />
                        </div>

                        <div className="mb-4">
                            <TextInput
                                label="SEO 설명"
                                inputClass="!bg-white !border-gray-300"
                                {...form.register('seoDescription', {required: true})}
                                required={true}
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

                        {useTag && (
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
                        )}

                        <div className="mb-4">
                            <label htmlFor="publishAt" className="label">
                                <span className="label-text">Editors</span>
                            </label>

                            <MultiSelect
                                value={selectedAuthors.map((author) => ({
                                    value: author.id,
                                    label: author.name,
                                }))}
                                loadOptions={searchAuthors}
                                onChange={onSelectAuthors}
                            />

                            <div className="mt-4 flex flex-col gap-2">
                                {selectedAuthors.map((author, i) => (
                                    <AuthorEditCard author={author} key={i} />
                                ))}
                            </div>
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

interface AuthorEditCardProps {
    author: PostAuthorDto;
}

enum SAVE_STATUS {
    NO = 'no',
    PENDING = 'pending',
    SUCCESS = 'success',
    FAILED = 'failed',
}

export const AuthorEditCard = memo(({author}: AuthorEditCardProps) => {
    // const form = useForm<UpdatePostAuthorByAdminDto>();
    const [name, setName] = useState(author.name);
    const [profileImg, setProfileImg] = useState(author.profileImg);
    const [introduce, setIntroduce] = useState(author.introduce);
    const [imgChanged, setImgChanged] = useState(false);
    const [saveStatus, setSaveStatus] = useState<SAVE_STATUS>(SAVE_STATUS.NO);

    useEffect(() => {
        setName(author.name);
        setProfileImg(author.profileImg);
        setIntroduce(author.introduce);
    }, []);

    const onSubmit = () => {
        const data = {name, profileImg, introduce};
        setSaveStatus(SAVE_STATUS.PENDING);
        postAuthorManageApi
            .update(author.id, data)
            .then(() => {
                setSaveStatus(SAVE_STATUS.SUCCESS);
                setTimeout(() => setSaveStatus(SAVE_STATUS.NO), 5000);
            })
            .catch(() => {
                setSaveStatus(SAVE_STATUS.FAILED);
            })
            .finally(() => {
                setImgChanged(false);
            });
    };

    return (
        <div
            className={`card card-bordered bg-white card-compact rounded border-slate-300 save-status save-status--${saveStatus}`}
        >
            <div className="p-2 flex gap-2 items-start">
                <div>
                    <label htmlFor={`author-${author.id}-profileImg`} className="cursor-pointer">
                        <div className="avatar">
                            <div className="w-10 rounded-full border">
                                <img src={profileImg} alt={name} />
                            </div>
                        </div>
                    </label>
                    {imgChanged && (
                        <p
                            className="block text-center text-xs cursor-pointer underline text-scordi-light hover:text-scordi"
                            onClick={() => onSubmit()}
                        >
                            <span className="block">img</span>
                            save
                        </p>
                    )}
                    <input
                        type="file"
                        id={`author-${author.id}-profileImg`}
                        className="hidden"
                        onChange={(e) => {
                            if (!e.target.files) return;
                            console.log(e.target.files);
                            const file = e.target.files[0];
                            fileApi
                                .upload({file})
                                .then((fileDto) => setProfileImg(fileDto.url))
                                .then(() => setImgChanged(true))
                                .catch(errorNotify);
                        }}
                    />
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                    <input
                        type="text"
                        className="text-lg font-semibold input input-xs input-ghost rounded px-0"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={() => onSubmit()}
                    />

                    <textarea
                        rows={4}
                        className="textarea textarea-ghost textarea-xs w-full p-0"
                        defaultValue={introduce}
                        onChange={(e) => setIntroduce(e.target.value)}
                        onBlur={() => onSubmit()}
                    />
                </div>
            </div>
        </div>
    );
});
