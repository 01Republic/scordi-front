import React, {memo, useState} from 'react';
import {AdminListPageLayout} from '^admin/layouts';
import {ListPageTitle} from '^admin/factories/_common/ListPageTitle';
import {EmailParserNewPageRoute} from '^pages/admin/factories/email-parsers/new';
import {FilterScope} from '^admin/factories/_common/FilterScope';
import {ListPageControl} from '^admin/factories/_common/ListPageControl';
import {useEmailParserListInFactory} from '^models/EmailParser/hooks/useEmailParserListInFactory';
import {getGroupByProduct} from '^admin/factories/_common/ListPageControl/groupByProduct';
import {EmailParserDtoInFactory} from '^models/EmailParser/types';
import {LoadableBox} from '^components/util/loading';
import {EmailParserGroup} from './EmailParserGroup';
import {EmailParserVersionListModal} from '^admin/factories/email-parsers/EmailParserListPage/EmailParserVersionListModal';

export const EmailParserListPage = memo(function EmailParserListPage() {
    const {data: result, isFetching: isLoading, refetch} = useEmailParserListInFactory();
    const [searchValue, setSearchValue] = useState('');
    const [publishedView, setPublishedView] = useState<boolean>();
    const [versionListForModal, setVersionListForModal] = useState<EmailParserDtoInFactory[]>([]);

    const {allList, publishedList, notPublishedList} = getGroupByProduct(result.items, searchValue);
    const parserGroups = publishedView === undefined ? allList : publishedView ? publishedList : notPublishedList;

    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="email" />}
            breadcrumbs={[{text: '파서 공장 (신)'}, {text: '[Gmail] 이메일 파서 목록'}]}
            createPageRoute={EmailParserNewPageRoute.path()}
        >
            <div className="pt-10 px-2 sm:px-4">
                <ListPageControl
                    name="이메일 파서"
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    pagination={result.pagination}
                    isLoading={isLoading}
                    reload={() => refetch()}
                >
                    <div className="flex items-center gap-4 font-semibold text-18 text-gray-400 transition-all">
                        <FilterScope active={publishedView === undefined} onClick={() => setPublishedView(undefined)}>
                            전체 {allList.length}개
                        </FilterScope>
                        <FilterScope active={publishedView === true} onClick={() => setPublishedView(true)}>
                            활성 {publishedList.length}개
                        </FilterScope>
                        <FilterScope active={publishedView === false} onClick={() => setPublishedView(false)}>
                            비활성 {notPublishedList.length}개 <small>(신규)</small>
                        </FilterScope>
                    </div>
                </ListPageControl>

                <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {parserGroups.map((parsers, i) => (
                            <EmailParserGroup
                                key={i}
                                parsers={parsers}
                                reload={() => refetch()}
                                onClick={() => setVersionListForModal(parsers)}
                            />
                        ))}
                    </div>
                </LoadableBox>

                <EmailParserVersionListModal
                    isOpen={versionListForModal.length > 0}
                    onClose={() => setVersionListForModal([])}
                    parsers={versionListForModal}
                    reload={() => refetch()}
                />
            </div>
        </AdminListPageLayout>
    );
});
