import {memo, useEffect, useState} from 'react';
import {AdminListPageLayout} from '^admin/layouts';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {CodefParserFile} from '^admin/factories/codef-parser-factories/CodefParserFactory/CodefParserFile';
import {CgSpinner} from 'react-icons/cg';
import {CodefParserNewPageRoute} from '^pages/admin/factories/codef-parsers/new';
import {CodefParserCard} from '^admin/factories/codef-parser-factories/CodefParserListPage/CodefParserCard';
import {SearchInput} from '^components/util/form-control/inputs/SearchInput';

const compareString = (a: string, b: string, direct: 'asc' | 'desc' = 'asc') => {
    const g = direct === 'asc' ? 1 : -1;
    return (a < b ? -1 : a > b ? 1 : 0) * g;
};

export const CodefParserListPage = memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    const [parsers, setParsers] = useState<CodefParserFile[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [publishValue, setPublishValue] = useState<boolean>();

    useEffect(() => {
        setIsLoading(true);
        codefParserFactoryApi.index().then((res) => {
            setIsLoading(false);
            const list = res.data || [];

            const ordered = list.sort((a, b) => {
                return compareString(a.serviceName, b.serviceName, 'asc');
            });
            setParsers(ordered);
        });
    }, []);

    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const groups: [string, CodefParserFile[]][] = alphabets.map((char) => {
        const list = parsers.filter((parser) => {
            return parser.serviceName.toLowerCase().startsWith(char);
        });
        return [char, list];
    });

    const all = parsers;
    const publishedOnly = parsers.filter((p) => p.isPublished);
    const notPublishedOnly = parsers.filter((p) => !p.isPublished);

    const parserList = publishValue === undefined ? all : publishValue === true ? publishedOnly : notPublishedOnly;

    return (
        <AdminListPageLayout
            title="[코드에프] 파서 목록"
            breadcrumbs={[{text: '파서 공장'}, {text: '[코드에프] 파서 목록'}]}
            createPageRoute={CodefParserNewPageRoute.path()}
        >
            <div className="container pt-10 px-2 sm:px-4">
                <div className="sticky top-0 -mx-2 sm:-mx-4 px-2 sm:px-4 mb-4 bg-layout-background z-10">
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            {/*{alphabets.map((char, i) => (*/}
                            {/*    <a key={i} href={`#${char}`} className="btn btn-link btn-xs">*/}
                            {/*        {char}*/}
                            {/*    </a>*/}
                            {/*))}*/}
                            <div className="flex items-center gap-4 font-semibold text-18 text-gray-400 transition-all">
                                <div
                                    className={`cursor-pointer ${
                                        publishValue === undefined ? 'text-scordi' : 'hover:text-scordi'
                                    }`}
                                    onClick={() => setPublishValue(undefined)}
                                >
                                    전체 {all.length}개
                                </div>
                                <div
                                    className={`cursor-pointer ${
                                        publishValue === true ? 'text-scordi' : 'hover:text-scordi'
                                    }`}
                                    onClick={() => setPublishValue(true)}
                                >
                                    활성 {publishedOnly.length}개
                                </div>
                                <div
                                    className={`cursor-pointer ${
                                        publishValue === false ? 'text-scordi' : 'hover:text-scordi'
                                    }`}
                                    onClick={() => setPublishValue(false)}
                                >
                                    비활성 {notPublishedOnly.length}개 <small>(신규)</small>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center">
                            <div>
                                {/*<div className="form-control">*/}
                                {/*    <label className="label cursor-pointer">*/}
                                {/*        <input type="checkbox" className="checkbox checkbox-primary" />*/}
                                {/*        <span className="label-text">Remember me</span>*/}
                                {/*    </label>*/}
                                {/*</div>*/}
                            </div>
                            <div>
                                <SearchInput
                                    scale="sm"
                                    placeholder="search name"
                                    onChange={(e) => setSearchValue(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin">
                            <CgSpinner size={30} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-2">
                            {/*{groups.map(([char, parserList], g) => {*/}
                            {/*    return parserList.map((parser, i) => {*/}
                            {/*        if (!parser.serviceName.toLowerCase().includes(searchValue)) return <></>;*/}
                            {/*        return (*/}
                            {/*            <div key={`${char}-${i}`}>*/}
                            {/*                <CodefParserCard parser={parser} groupKey={char} groupIndex={i} />*/}
                            {/*            </div>*/}
                            {/*        );*/}
                            {/*    });*/}
                            {/*})}*/}
                            {parserList.map((parser, i) => {
                                if (!parser.serviceName.toLowerCase().includes(searchValue)) return <></>;

                                return <CodefParserCard parser={parser} key={i} />;
                            })}
                        </div>

                        {/*{groups.map(([char, parserList], g) => (*/}
                        {/*    <section id={char} key={g}>*/}
                        {/*        <h3 className="pt-6">{char}</h3>*/}
                        {/*        <div className="-grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">*/}
                        {/*            {parserList.map((parser, i) => (*/}
                        {/*                <CodefParserCard key={i} parser={parser} groupKey={char} groupIndex={g} />*/}
                        {/*            ))}*/}
                        {/*        </div>*/}
                        {/*    </section>*/}
                        {/*))}*/}

                        {/*<CardTablePanel*/}
                        {/*    gridClass="grid-cols-12"*/}
                        {/*    entries={parsers}*/}
                        {/*    ths={['Name', '', 'Published']}*/}
                        {/*    entryComponent={(parser, i) => <CodefParserItem parser={parser} key={i} />}*/}
                        {/*/>*/}
                    </div>
                )}
            </div>
        </AdminListPageLayout>
    );
});
