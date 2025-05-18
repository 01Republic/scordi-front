import {memo, useState} from 'react';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {CodefCardParserItem} from './CodefCardParserItem';

interface CodefCardParserGroupProps {
    parsers: CodefCardParserDto[];
    reload?: () => any;
}

export const CodefCardParserGroup = memo((props: CodefCardParserGroupProps) => {
    const {parsers, reload} = props;

    const orderedList = parsers.sort((a, b) => Number(a.isActive) - Number(b.isActive));

    return (
        <div className="relative w-full group">
            {orderedList.map((parser, i) => (
                <div key={parser.id} className="transition-all mb-[-55px] group-hover:mb-2">
                    <CodefCardParserItem parser={parser} reload={reload} />
                </div>
            ))}
        </div>
    );
});
CodefCardParserGroup.displayName = 'CodefCardParserGroup';
