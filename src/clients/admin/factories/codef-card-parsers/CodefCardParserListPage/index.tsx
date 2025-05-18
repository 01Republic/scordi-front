import {memo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {Paginated} from '^types/utils/paginated.dto';
import {AdminListPageLayout} from '^admin/layouts';
import {SearchInput} from '^components/util/form-control/inputs/SearchInput';
import {Loader} from 'lucide-react';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {CodefCardParserGroup} from './CodefCardParserGroup';
import {LoadableBox} from '^components/util/loading';

export const CodefCardParserListPage = memo(function CodefCardParserListPage() {
    const {
        data: result,
        isFetching: isLoading,
        refetch,
    } = useQuery({
        queryFn: () =>
            adminCodefCardParserApi
                .index({
                    order: {
                        productId: 'DESC',
                        isActive: 'DESC',
                        id: 'DESC',
                    },
                    itemsPerPage: 0,
                })
                .then((res) => res.data),
        queryKey: ['adminCodefCardParserApi.index'],
        initialData: Paginated.init(),
    });
    const [searchValue, setSearchValue] = useState('');
    const [publishedView, setPublishedView] = useState<boolean>();

    const allList = result.items;
    const publishedList = result.items.filter((parser) => parser.isActive);
    const notPublishedList = result.items.filter((parser) => !parser.isActive);

    const parserList = publishedView === undefined ? allList : publishedView ? publishedList : notPublishedList;
    const searchedList = parserList.filter((parser) => parser.title.toLowerCase().includes(searchValue));

    const container: Record<number, CodefCardParserDto[]> = {};
    searchedList.forEach((item) => {
        container[item.productId] ||= [];
        container[item.productId].push(item);
    });
    const parserGroups = Object.values(container);

    return (
        <AdminListPageLayout
            title="[코드에프] 카드 파서 목록"
            breadcrumbs={[{text: '파서 공장 (신)'}, {text: '[코드에프] 카드 파서 목록'}]}
        >
            <div className="pt-10 px-2 sm:px-4">
                <div className="sticky top-0 -mx-2 sm:-mx-4 px-2 sm:px-4 mb-4 bg-layout-background z-10">
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-4 font-semibold text-18 text-gray-400 transition-all">
                                <div
                                    className={`cursor-pointer ${
                                        publishedView === undefined ? 'text-scordi' : 'hover:text-scordi'
                                    }`}
                                    onClick={() => setPublishedView(undefined)}
                                >
                                    전체 {allList.length}개
                                </div>
                                <div
                                    className={`cursor-pointer ${
                                        publishedView === true ? 'text-scordi' : 'hover:text-scordi'
                                    }`}
                                    onClick={() => setPublishedView(true)}
                                >
                                    활성 {publishedList.length}개
                                </div>
                                <div
                                    className={`cursor-pointer ${
                                        publishedView === false ? 'text-scordi' : 'hover:text-scordi'
                                    }`}
                                    onClick={() => setPublishedView(false)}
                                >
                                    비활성 {notPublishedList.length}개 <small>(신규)</small>
                                </div>
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
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2">
                        {parserGroups.map((parsers, i) => (
                            <CodefCardParserGroup key={i} parsers={parsers} reload={() => refetch()} />
                        ))}
                    </div>
                </LoadableBox>
                {/*{isLoading ? (*/}
                {/*    <div className="flex items-center justify-center">*/}
                {/*        <div className="animate-spin">*/}
                {/*            <Loader size={30} />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div>*/}
                {/*        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2">*/}
                {/*            {parserGroups.map((parsers, i) => (*/}
                {/*                <CodefCardParserGroup key={i} parsers={parsers} reload={() => refetch()} />*/}
                {/*            ))}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>
        </AdminListPageLayout>
    );
});
