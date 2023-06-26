import {memo} from 'react';
import {ColumnProps} from './ColumnProps.type';
import {ActionColumn} from './ActionColumn';
import {ThumbnailColumn} from '^components/pages/admin/blogs/AdminBlogListPage/ThumbnailColumn';
import {DateTimeColumn} from '^components/pages/admin/share/panels/CardTablePanel';
import {IsPublishedColumn} from '^components/pages/admin/blogs/AdminBlogListPage/IsPublishedColumn';

export const MobileItem = memo((props: ColumnProps) => {
    const {post, fetchData} = props;

    return (
        <div>
            <div className="card card-side">
                <figure>
                    {post.thumbnailUrl ? (
                        <img src={post.thumbnailUrl} alt="" loading="lazy" className="w-[190px] rounded-box" />
                    ) : (
                        <div className="w-[190px] flex items-center justify-center bg-gray-200 rounded-box">
                            <span className="text-gray-400 italic">no image</span>
                        </div>
                    )}
                </figure>

                <div className="card-body !pl-4 !py-2 !pr-0">
                    <h2 className="card-title text-sm mb-2">{post.title}</h2>

                    <div>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>작성일</b>
                            <DateTimeColumn value={post.createdAt} />
                        </p>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>공개여부</b>
                            <IsPublishedColumn post={post} />
                        </p>
                        <p className="text-xs flex items-center justify-between whitespace-nowrap gap-3">
                            <b>발행일</b>
                            <DateTimeColumn value={post.publishAt} />
                        </p>
                    </div>

                    <div className="card-actions justify-end">
                        <ActionColumn post={post} fetchData={fetchData} />
                    </div>
                </div>
            </div>
        </div>
    );
});
