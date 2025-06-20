import {memo} from 'react';
import {CodefCardParserDto, CodefCardParserDtoInFactory} from '^models/_codef/CodefCardParser/type';
import {CodefBankAccountParserDtoInFactory} from '^models/_codef/CodefBankAccountParser/type';
import {CodefCardParserEditPageRoute} from '^pages/admin/factories/codef-card-parsers/[id]/edit';
import {CodefBankAccountParserEditPageRoute} from '^pages/admin/factories/codef-bank-account-parsers/[id]/edit';
import {LinkTo} from '^components/util/LinkTo';
import {CardViewItem} from './CardViewItem';

interface CodefAssetParserGroupProps {
    parsers: (CodefCardParserDtoInFactory | CodefBankAccountParserDtoInFactory)[];
    onClick: () => any;
    reload?: () => any;
}

export const CodefAssetParserGroup = memo((props: CodefAssetParserGroupProps) => {
    const {parsers, onClick, reload} = props;

    const activeItem = parsers.find((parser) => parser.isActive);
    const lastItem = parsers[parsers.length - 1];
    const parser: CodefCardParserDtoInFactory | CodefBankAccountParserDtoInFactory = activeItem || lastItem;
    const redirectTo =
        parser instanceof CodefCardParserDto
            ? CodefCardParserEditPageRoute.path(parser.id)
            : CodefBankAccountParserEditPageRoute.path(parser.id);

    return (
        <div className="relative w-full group">
            <LinkTo
                href={parsers.length > 1 ? undefined : redirectTo}
                onClick={parsers.length > 1 ? onClick : undefined}
                displayLoading={false}
            >
                <CardViewItem
                    id={parser.id}
                    name={parser.title}
                    tooltip={`(id: #${parser.productId}) ${parser.product?.name()}`}
                    product={parser.product}
                    updatedAt={parser.updatedAt}
                    isActive={parser.isActive}
                    reload={reload}
                    versionLength={parsers.length}
                />
            </LinkTo>
        </div>
    );
});
CodefAssetParserGroup.displayName = 'CodefAssetParserGroup';
