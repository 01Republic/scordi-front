import {memo, useEffect, useState} from 'react';
import {AdminListPageLayout} from '^admin/layouts';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {CodefParserFile} from '^admin/factories/codef-parser-factories/CodefParserFactory/CodefParserFile';
import {CgSpinner} from 'react-icons/cg';
import {CodefParserNewPageRoute} from '^pages/admin/factories/codef-parsers/new';

export const CodefParserListPage = memo(() => {
    const [isLoading, setIsLoading] = useState(false);
    const [parsers, setParsers] = useState<CodefParserFile[]>([]);

    useEffect(() => {
        setIsLoading(true);
        codefParserFactoryApi.index().then((res) => {
            setIsLoading(false);
            setParsers(res.data);
        });
    }, []);

    const alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const groups: [string, CodefParserFile[]][] = alphabets.map((char) => {
        const list = parsers.filter((parser) => {
            return parser.serviceName.toLowerCase().startsWith(char);
        });
        return [char, list];
    });

    return (
        <AdminListPageLayout
            title="[코드에프] 파서 목록"
            breadcrumbs={[{text: '파서 공장'}, {text: '[코드에프] 파서 목록'}]}
            createPageRoute={CodefParserNewPageRoute.path()}
        >
            <div className="container pt-10 px-2 sm:px-4">
                <div className="w-full sticky top-0 bg-layout-background mb-4">
                    {alphabets.map((char, i) => (
                        <a key={i} href={`#${char}`} className="btn btn-link btn-xs">
                            {char}
                        </a>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin">
                            <CgSpinner size={30} />
                        </div>
                    </div>
                ) : (
                    <div>
                        {groups.map(([char, parserList], g) => (
                            <section id={char} key={g}>
                                <h3 className="pt-6">{char}</h3>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                    {parserList.map((parser, i) => (
                                        <div key={i}>
                                            <div className="text-gray-600 transition-all cursor-pointer hover:text-scordi hover:underline">
                                                {parser.serviceName}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </AdminListPageLayout>
    );
});
