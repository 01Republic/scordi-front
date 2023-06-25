import {memo, useEffect, useState} from 'react';
import {AdminListPageLayout} from '^components/pages/admin/layouts/ListPageLayout';
import {AdminNewPostPageRoute} from '^pages/admin/posts/new';
import {BooleanColumn, CardTablePanel, DateTimeColumn} from '^components/pages/admin/share/panels/CardTablePanel';
import {useForm} from 'react-hook-form';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllPostByAdminDto, PostDto} from '^types/post.type';
import {postManageApi} from '^api/post-manage.api';
import {useRouter} from 'next/router';
import {AdminPostPageRoute} from '^pages/admin/posts/[id]';
import {humanizeTimeDistance2} from '^utils/dateTime';
import {AdminEditPostPageRoute} from '^pages/admin/posts/[id]/edit';

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
                        gridClass="grid-cols-8"
                        entries={listPage.items}
                        columns={[
                            {th: '아이디', render: (post) => post.id},
                            {
                                th: '썸네일',
                                render: (post) => (
                                    <div className="max-w-[80px]">
                                        {post.thumbnailUrl ? (
                                            <img src={post.thumbnailUrl} alt="" loading="lazy" className="w-full" />
                                        ) : (
                                            <span className="text-gray-500 italic">unset</span>
                                        )}
                                    </div>
                                ),
                            },
                            {th: '제목', render: (post) => post.title},
                            {th: '작성일', render: (post) => <DateTimeColumn value={post.createdAt} />},
                            {
                                th: '공개여부',
                                render: (post) => {
                                    if (!post.publishAt) return <BooleanColumn value={false} />;
                                    const publishAt = new Date(post.publishAt);
                                    const now = new Date();
                                    const published = publishAt.getTime() <= now.getTime();
                                    return (
                                        <BooleanColumn
                                            value={published}
                                            falseVal={humanizeTimeDistance2(now, publishAt)}
                                        />
                                    );
                                },
                            },
                            {th: '발행일', render: (post) => <DateTimeColumn value={post.publishAt} />},
                            {
                                th: '조회수/좋아요/싫어요',
                                render: (post) => [post.visitCount, post.likeCount, post.unlikeCount].join(' / '),
                            },
                            {
                                th: '',
                                render: (post) => (
                                    <div className="flex gap-1">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => router.push(AdminEditPostPageRoute.path(post.id))}
                                        >
                                            수정
                                        </button>

                                        <button
                                            className="btn btn-error btn-sm"
                                            onClick={() => {
                                                if (confirm('Are you sure?')) {
                                                    postManageApi.destroy(post.id).then(() => {
                                                        fetchData({order: {id: 'DESC'}});
                                                    });
                                                }
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ),
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
