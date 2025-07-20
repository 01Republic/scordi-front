import {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {PaginationMetaData} from '^types/utils/paginated.dto';

interface LoadMoreButtonProps {
    pagination?: PaginationMetaData;
    onClick?: () => any;
}

export const LoadMoreButton = memo((props: LoadMoreButtonProps) => {
    const {t} = useTranslation('teams');
    const {pagination = new PaginationMetaData(), onClick} = props;
    const {currentPage = 0, totalPage = 0} = pagination;

    if (currentPage >= totalPage) return <></>;

    return (
        <div className="col-span-2 flex items-center justify-center">
            <button
                onClick={onClick}
                className="btn btn-sm border !border-gray-300 !bg-white shadow hover:shadow-md btn-animation gap-1"
            >
                <span>{t('list.loadMore')}</span>
                <small>
                    ({currentPage.toLocaleString()}/{totalPage.toLocaleString()})
                </small>
            </button>
        </div>
    );
});
LoadMoreButton.displayName = 'LoadMoreButton';
