import {memo} from 'react';
import {CodefParserFile} from '^admin/factories/codef-parser-factories/CodefParserFactory/CodefParserFile';
import {CodefParserEditPageRoute} from '^pages/admin/factories/codef-parsers/[serviceName]/edit';
import {useRouter} from 'next/router';
import {TagUI} from '^v3/share/table/columns/share/TagUI';

interface CodefParserCardProps {
    parser: CodefParserFile;
    groupKey?: string;
    groupIndex?: number;
}

export const CodefParserCard = memo((props: CodefParserCardProps) => {
    const {parser, groupKey, groupIndex} = props;
    const router = useRouter();

    const onClickParser = (parser: CodefParserFile) => {
        router.push(CodefParserEditPageRoute.path(parser.serviceName));
    };

    //  px-3 py-2 bg-white
    return (
        <div
            id={groupIndex === 0 ? groupKey : undefined}
            className="card card-compact shadow-xl card-bordered cursor-pointer transition-all text-gray-500 hover:text-scordi bg-base-100 hover:bg-scordi-light-100"
            onClick={() => onClickParser(parser)}
        >
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <p className="text-16">{parser.serviceName}</p>

                    <div>
                        {parser.isPublished ? (
                            <TagUI className="bg-green-200">활성</TagUI>
                        ) : (
                            <TagUI className="bg-gray-200">비활성</TagUI>
                        )}
                    </div>
                </div>
                {/*<div className="justify-end card-actions">*/}
                {/*    <button className="btn btn-xs btn-primary">Buy Now</button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
});
CodefParserCard.displayName = 'CodefParserCard';
