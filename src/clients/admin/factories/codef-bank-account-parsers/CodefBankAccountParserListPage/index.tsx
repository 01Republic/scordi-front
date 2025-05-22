import React, {memo, useState} from 'react';
import {LoadableBox} from '^components/util/loading';
import {CodefBankAccountParserNewPageRoute} from '^pages/admin/factories/codef-bank-account-parsers/new';
import {CodefBankAccountParserDtoInFactory} from '^models/_codef/CodefBankAccountParser/type';
import {useCodefBankAccountParserListInFactory} from '^models/_codef/CodefBankAccountParser/hooks';
import {AdminListPageLayout} from '^admin/layouts';
import {ListPageTitle} from '../../_common/ListPageTitle';
import {ListPageControl} from '../../_common/ListPageControl';
import {getGroupByProduct} from '../../_common/ListPageControl/groupByProduct';
import {FilterScope} from '../../_common/FilterScope';
import {CodefAssetParserGroup} from '../../_common/CodefAssetParserGroup';
import {CodefBankAccountParserVersionListModal} from '../CodefBankAccountParserVersionListModal';

export const CodefBankAccountParserListPage = memo(function CodefBankAccountParserListPage() {
    const {data: result, isFetching: isLoading, refetch} = useCodefBankAccountParserListInFactory();
    const [searchValue, setSearchValue] = useState('');
    const [publishedView, setPublishedView] = useState<boolean>();
    const [versionListForModal, setVersionListForModal] = useState<CodefBankAccountParserDtoInFactory[]>([]);

    const {allList, publishedList, notPublishedList} = getGroupByProduct(result.items, searchValue);
    const parserGroups = publishedView === undefined ? allList : publishedView ? publishedList : notPublishedList;

    return (
        <AdminListPageLayout
            title={<ListPageTitle currentSubject="bank-account" />}
            breadcrumbs={[{text: '파서 공장 (신)'}, {text: '[코드에프] 계좌 파서 목록'}]}
            createPageRoute={CodefBankAccountParserNewPageRoute.path()}
        >
            <div className="pt-10 px-2 sm:px-4">
                <ListPageControl
                    name="계좌 파서"
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
                            <CodefAssetParserGroup
                                key={i}
                                parsers={parsers}
                                reload={() => refetch()}
                                onClick={() => setVersionListForModal(parsers)}
                            />
                        ))}
                    </div>
                </LoadableBox>

                <CodefBankAccountParserVersionListModal
                    isOpen={versionListForModal.length > 0}
                    onClose={() => setVersionListForModal([])}
                    parsers={versionListForModal}
                    reload={() => refetch()}
                />
            </div>
        </AdminListPageLayout>
    );
});
