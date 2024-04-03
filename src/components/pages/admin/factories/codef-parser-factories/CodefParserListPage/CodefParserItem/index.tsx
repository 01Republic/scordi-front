import {memo} from 'react';
import {CodefParserFile} from '^admin/factories/codef-parser-factories/CodefParserFactory/CodefParserFile';
import {CardTableTR} from '^admin/share';

interface CodefParserItemProps {
    parser: CodefParserFile;
}

export const CodefParserItem = memo((props: CodefParserItemProps) => {
    const {parser} = props;

    return (
        <CardTableTR gridClass="grid-cols-12">
            <div className="col-span-2">{parser.serviceName}</div>

            {/*Published*/}
            <div>{parser.isPublished ? 'Y' : '-'}</div>
            <div>{parser.serviceName}</div>
            <div>{parser.serviceName}</div>
            <div>{parser.serviceName}</div>
            <div>{parser.serviceName}</div>
            <div>{parser.serviceName}</div>
            <div>{parser.serviceName}</div>
            <div>{parser.serviceName}</div>
            <div className="col-span-2">{parser.serviceName}</div>
        </CardTableTR>
    );
});
CodefParserItem.displayName = 'CodefParserItem';
