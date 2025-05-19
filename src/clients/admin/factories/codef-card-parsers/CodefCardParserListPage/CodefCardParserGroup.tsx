import {memo} from 'react';
import {CodefCardParserEditPageRoute} from '^pages/admin/factories/codef-card-parsers/[id]/edit';
import {LinkTo} from '^components/util/LinkTo';
import {ProductDto} from '^models/Product/type';
import {CodefCardParserDto} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {CodefCardParserItem} from './CodefCardParserItem';

interface CodefCardParserGroupProps {
    parsers: (CodefCardParserDto & {product: ProductDto})[];
    onClick: () => any;
    reload?: () => any;
}

export const CodefCardParserGroup = memo((props: CodefCardParserGroupProps) => {
    const {parsers, onClick, reload} = props;

    const activeItem = parsers.find((parser) => parser.isActive);
    const lastItem = parsers[parsers.length - 1];
    const parser = activeItem || lastItem;

    return (
        <div className="relative w-full group">
            {parsers.length > 1 ? (
                <LinkTo onClick={() => onClick()} displayLoading={false}>
                    <CodefCardParserItem parser={activeItem || lastItem} reload={reload} />
                </LinkTo>
            ) : (
                <LinkTo href={CodefCardParserEditPageRoute.path(parser.id)} displayLoading={false}>
                    <CodefCardParserItem parser={activeItem || lastItem} reload={reload} />
                </LinkTo>
            )}
        </div>
    );
});
CodefCardParserGroup.displayName = 'CodefCardParserGroup';
