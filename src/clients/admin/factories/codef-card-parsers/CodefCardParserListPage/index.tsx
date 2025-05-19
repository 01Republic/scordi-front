import {memo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {AdminListPageLayout} from '^admin/layouts';
import {SearchInput} from '^components/util/form-control/inputs/SearchInput';
import {LoadableBox} from '^components/util/loading';
import {CodefCardParserNewPageRoute} from '^pages/admin/factories/codef-card-parsers/new';
import {ProductDto} from '^models/Product/type';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {CodefCardParserVersionListModal} from '../CodefCardParserVersionListModal';
import {CodefCardParserGroup} from './CodefCardParserGroup';
import {FilterScope} from './FilterScope';

export const CodefCardParserListPage = memo(function CodefCardParserListPage() {
    const {
        data: result,
        isFetching: isLoading,
        refetch,
    } = useQuery({
        queryFn: () =>
            adminCodefCardParserApi
                .index({
                    relations: ['product'],
                    order: {productId: 'DESC', id: 'DESC'},
                    itemsPerPage: 0,
                })
                .then((res) => {
                    return res.data as Paginated<CodefCardParserDto & {product: ProductDto}>;
                }),
        queryKey: ['CodefCardParserListPage.parsers'],
        initialData: Paginated.init(),
    });
    const [searchValue, setSearchValue] = useState('');
    const [publishedView, setPublishedView] = useState<boolean>();
    const [versionListForModal, setVersionListForModal] = useState<(CodefCardParserDto & {product: ProductDto})[]>([]);

    const container: Record<number, (CodefCardParserDto & {product: ProductDto})[]> = {};
    result.items.forEach((item) => {
        container[item.productId] ||= [];
        container[item.productId].push(item);
    });
    const groups = Object.values(container);

    const searchedGroups = groups
        .map((parsers) => {
            return parsers.filter((parser) => {
                if (parser.title.toLowerCase().includes(searchValue)) return true;
                if (parser.product.name().toLowerCase().includes(searchValue)) return true;

                return false;
            });
        })
        .filter((parsers) => parsers.length > 0);

    const allList = searchedGroups;
    const publishedList = searchedGroups.filter((parsers) => parsers.some((parser) => parser.isActive));
    const notPublishedList = searchedGroups.filter((parsers) => !parsers.some((parser) => parser.isActive));

    const parserGroups = publishedView === undefined ? allList : publishedView ? publishedList : notPublishedList;

    return (
        <AdminListPageLayout
            title="[코드에프] 카드 파서 목록"
            breadcrumbs={[{text: '파서 공장 (신)'}, {text: '[코드에프] 카드 파서 목록'}]}
            createPageRoute={CodefCardParserNewPageRoute.path()}
        >
            <div className="pt-10 px-2 sm:px-4">
                <div className="sticky top-0 -mx-2 sm:-mx-4 px-2 sm:px-4 mb-4 bg-layout-background z-10">
                    <div className="py-4 flex items-center justify-between">
                        <div className="">
                            <p className={`text-xl font-semibold mb-2 text-gray-400 transition-all`}>
                                {searchValue ? (
                                    <span>
                                        <code className="code code-xl">{searchValue}</code> 의 검색결과:
                                    </span>
                                ) : (
                                    <span className="">
                                        카드 파서 조회{' '}
                                        <small>(버전 총 {result.pagination.totalItemCount.toLocaleString()}개)</small>
                                    </span>
                                )}
                            </p>
                            <div className="flex items-center gap-4 font-semibold text-18 text-gray-400 transition-all">
                                <FilterScope
                                    active={publishedView === undefined}
                                    onClick={() => setPublishedView(undefined)}
                                >
                                    전체 {allList.length}개
                                </FilterScope>
                                <FilterScope active={publishedView === true} onClick={() => setPublishedView(true)}>
                                    활성 {publishedList.length}개
                                </FilterScope>
                                <FilterScope active={publishedView === false} onClick={() => setPublishedView(false)}>
                                    비활성 {notPublishedList.length}개 <small>(신규)</small>
                                </FilterScope>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <div className="ml-auto">
                                <SearchInput
                                    scale="sm"
                                    placeholder="search name"
                                    onChange={(e) => setSearchValue(e.target.value.trim().toLowerCase())}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
                        {parserGroups.map((parsers, i) => (
                            <CodefCardParserGroup
                                key={i}
                                parsers={parsers}
                                reload={() => refetch()}
                                onClick={() => setVersionListForModal(parsers)}
                            />
                        ))}
                    </div>
                </LoadableBox>

                <CodefCardParserVersionListModal
                    isOpen={versionListForModal.length > 0}
                    onClose={() => setVersionListForModal([])}
                    parsers={versionListForModal}
                    reload={() => refetch()}
                />
            </div>
        </AdminListPageLayout>
    );
});
