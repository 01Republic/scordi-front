import {EmailParserDtoInFactory} from '^models/EmailParser/types';
import React, {memo} from 'react';
import {CodefCardParserEditPageRoute} from '^pages/admin/factories/codef-card-parsers/[id]/edit';
import {LinkTo} from '^components/util/LinkTo';
import {CardViewItem} from '^admin/factories/_common/CardViewItem';

interface EmailParserGroupProps {
    parsers: EmailParserDtoInFactory[];
    onClick: () => any;
    reload?: () => any;
}

export const EmailParserGroup = memo((props: EmailParserGroupProps) => {
    const {parsers, onClick, reload} = props;

    const activeItem = parsers.find((parser) => parser.isActive);
    const lastItem = parsers[parsers.length - 1];
    const parser = activeItem || lastItem;
    const redirectTo = CodefCardParserEditPageRoute.path(parser.id);

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
