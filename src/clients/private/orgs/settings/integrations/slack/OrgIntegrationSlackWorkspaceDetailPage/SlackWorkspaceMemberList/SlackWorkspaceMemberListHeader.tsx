import {memo} from 'react';
import {unitFormat} from '^utils/number';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {useTranslation} from 'next-i18next';

interface SlackWorkspaceMemberListHeaderProps {
    pagination: PaginationMetaData;
    prevPage: () => any;
    nextPage: () => any;
}

export const SlackWorkspaceMemberListHeader = memo((props: SlackWorkspaceMemberListHeaderProps) => {
    const {pagination, prevPage, nextPage} = props;
    const {totalItemCount, totalPage, currentPage} = pagination;
    const {t} = useTranslation('integrations');

    return (
        <div className="py-3 px-6 bg-gray-100/50 border-b border-gray-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="font-semibold text-12">
                        {t('members')} in {t('slack')}
                    </div>
                    <div className="text-14 mx-2">&middot;</div>
                    <div className="text-12">
                        {t('total')} {unitFormat(totalItemCount, t('members') as string)}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="text-12 text-gray-600 mr-4">
                        <span>{totalPage.toLocaleString()}p</span>
                        <span className="mx-0.5">{t('of')}</span>
                        <span>{currentPage.toLocaleString()}p</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            className={`btn btn-xs btn-white btn-square no-animation btn-animation ${
                                currentPage <= 1 ? 'btn-disabled' : ''
                            }`}
                            onClick={prevPage}
                        >
                            <ChevronLeft />
                        </button>
                        <button
                            className={`btn btn-xs btn-white btn-square no-animation btn-animation ${
                                currentPage >= totalPage ? 'btn-disabled' : ''
                            }`}
                            onClick={nextPage}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
SlackWorkspaceMemberListHeader.displayName = 'SlackWorkspaceMemberListHeader';
