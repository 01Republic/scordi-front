import {Dispatch, memo, SetStateAction} from 'react';
import {useFormContext} from 'react-hook-form';
import {ChevronRight} from 'lucide-react';
import {EmailParserFormData, ParserTypes} from '^models/EmailParser/types';
import {Column} from '../Column';

interface HeadingColumnProps {
    isExpanded: boolean;
    setIsExpanded: Dispatch<SetStateAction<boolean>>;
    pos: [number, number];
    setPos: Dispatch<SetStateAction<[number, number]>>;
}

export const HeadingColumn = memo((props: HeadingColumnProps) => {
    const {isExpanded = false, setIsExpanded, pos, setPos} = props;
    const form = useFormContext<{filterQuery: string; parserData: EmailParserFormData}>();
    const parserData = form.getValues('parserData') || {};
    const keys = Object.keys(ParserTypes);
    const entries = Object.entries(parserData)
        .sort(([aKey], [bKey]) => keys.indexOf(aKey) - keys.indexOf(bKey))
        .filter(([_, val]) => val);
    const titles = entries.map(([key]) => {
        return ParserTypes[key as keyof EmailParserFormData]?.title;
    });

    return (
        <div className="w-[140px] min-w-[140px] max-w-[140px]">
            <div className="px-1.5 h-[40px] flex items-center">
                <button
                    type="button"
                    className="btn btn-xs btn-white no-animation btn-animation"
                    onClick={() => setIsExpanded((v) => !v)}
                >
                    <span>여러 이메일 체크</span>
                    <ChevronRight size={20} className={`${isExpanded ? 'rotate-90' : ''} transition-all`} />
                </button>
            </div>

            {isExpanded && (
                <div className="flex flex-col font-semibold bg-gray-100">
                    {titles.map((title, y) => (
                        <Column
                            key={y}
                            className={`transition-all ${isExpanded && pos[1] == y ? 'bg-gray-200' : ''}`}
                            onMouseEnter={() => isExpanded && setPos((p) => [p[0], y])}
                        >
                            {title}
                        </Column>
                    ))}
                </div>
            )}
        </div>
    );
});
HeadingColumn.displayName = 'HeadingColumn';
