import React, {memo} from 'react';
import {CodefParserFile} from '^admin/factories/codef-parser-factories/CodefParserFactory/CodefParserFile';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';

interface SearchedParserItemProps {
    parser: CodefCardParserDto;
}

export const SearchedParserItem = memo((props: SearchedParserItemProps) => {
    const {parser} = props;

    return (
        <div>
            <p>{parser.title}</p>
        </div>
    );
});
SearchedParserItem.displayName = 'SearchedParserItem';
