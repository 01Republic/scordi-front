import {memo} from 'react';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {ago} from '^utils/dateTime';

interface CodefCardParserItemProps {
    parser: CodefCardParserDto;
    reload?: () => any;
}

export const CodefCardParserItem = memo((props: CodefCardParserItemProps) => {
    const {parser} = props;

    return (
        <div className="card card-compact shadow-xl card-bordered cursor-pointer transition-all text-gray-500 hover:text-scordi bg-base-100 hover:bg-scordi-light-100">
            <div className="card-body">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="text-16 flex items-center gap-3">
                            <div className="badge badge-xs">#{parser.id}</div>
                            <p className="text-14">{parser.product?.name() || parser.title}</p>
                        </div>
                        <p className="text-12 text-gray-400">수정: {ago(parser.updatedAt)}</p>
                    </div>

                    <div>
                        {parser.isActive ? (
                            <TagUI className="bg-green-200">활성</TagUI>
                        ) : (
                            <TagUI className="bg-gray-200">비활성</TagUI>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});
CodefCardParserItem.displayName = 'CodefCardParserItem';
