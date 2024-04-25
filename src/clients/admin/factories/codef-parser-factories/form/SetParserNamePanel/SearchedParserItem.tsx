import React, {memo} from 'react';
import {CodefParserFile} from '^admin/factories/codef-parser-factories/CodefParserFactory/CodefParserFile';

interface SearchedParserItemProps {
    parser: CodefParserFile;
}

export const SearchedParserItem = memo((props: SearchedParserItemProps) => {
    const {parser} = props;

    return (
        <div>
            <p>{parser.serviceName}</p>
        </div>
    );
});
SearchedParserItem.displayName = 'SearchedParserItem';
