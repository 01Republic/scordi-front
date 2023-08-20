import {memo, useEffect, useState} from 'react';
import {AdminNewPostPageRoute} from '^pages/admin/posts/new';
import {useForm} from 'react-hook-form';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllPostByAdminDto, PostDto} from '^types/post.type';
import {postManageApi} from '^api/post-manage.api';
import {useRouter} from 'next/router';
import {AdminListPageLayout} from '../../layouts/ListPageLayout';
import {CardTablePanel, DateTimeColumn} from '../../share/panels/CardTablePanel';
import {ThumbnailColumn} from './ThumbnailColumn';
import {IsPublishedColumn} from './IsPublishedColumn';
import {StatColumn} from './StatColumn';
import {ActionColumn} from './ActionColumn';
import {TitleColumn} from './TitleColumn';
import {IdColumn} from './IdColumn';
import {MobileItem} from './MobileItem';

export const AdminBlogListPage = memo(() => {
    const router = useRouter();
    const form = useForm<FindAllPostByAdminDto>();
    const [listPage, setUListPage] = useState<Paginated<PostDto>>({
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 0,
            currentPage: 0,
            itemsPerPage: 0,
        },
    });

    const fetchData = (params: FindAllPostByAdminDto) => {
        postManageApi.index(params).then((res) => setUListPage(res.data));
    };

    useEffect(() => {
        fetchData({order: {id: 'DESC'}});
    }, []);

    const onSearch = (data: FindAllPostByAdminDto) => fetchData({order: {id: 'DESC'}});

    return (
        <AdminListPageLayout
            title="게시글 목록"
            breadcrumbs={[{text: '블로그 관리'}, {text: '게시글 목록'}]}
            createPageRoute={AdminNewPostPageRoute.path()}
        >
            <div className="container pt-10 px-2 sm:px-8">
                <div className="w-full">
                    <CardTablePanel
                        gridClass="grid-cols-1 lg:grid-cols-8"
                        entries={listPage.items}
                        columns={[
                            // Xs
                            {
                                th: '',
                                className: 'block lg:hidden',
                                render: (post) => <MobileItem post={post} fetchData={fetchData} />,
                            },

                            // Lg
                            {th: '아이디', className: 'hidden lg:block', render: (post) => <IdColumn post={post} />},
                            {
                                th: '썸네일',
                                className: 'hidden lg:block',
                                render: (post) => <ThumbnailColumn post={post} />,
                            },
                            {th: '제목', className: 'hidden lg:block', render: (post) => <TitleColumn post={post} />},
                            {
                                th: '작성일',
                                className: 'hidden lg:block',
                                render: (post) => <DateTimeColumn value={post.createdAt} />,
                            },
                            {
                                th: '공개여부',
                                className: 'hidden lg:block',
                                render: (post) => <IsPublishedColumn post={post} />,
                            },
                            {
                                th: '발행일',
                                className: 'hidden lg:block',
                                render: (post) => <DateTimeColumn value={post.publishAt} />,
                            },
                            {
                                th: '조회수/좋아요/싫어요',
                                className: 'hidden lg:block',
                                render: (post) => <StatColumn post={post} />,
                            },
                            {
                                th: '',
                                className: 'hidden lg:block',
                                render: (post) => <ActionColumn post={post} fetchData={fetchData} />,
                            },
                        ]}
                        pagination={listPage.pagination}
                        pageMove={(page) => fetchData({order: {id: 'DESC'}, page})}
                    />
                </div>
            </div>
        </AdminListPageLayout>
    );
});
