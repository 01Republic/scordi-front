import React, {memo} from 'react';
import {LinkTo, LinkToProps} from '^components/util/LinkTo';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {WithChildren} from '^types/global.type';
import Tippy from '@tippyjs/react/headless';
import {FolderOpen} from 'lucide-react';
import {useTranslation} from 'next-i18next';

interface OpenButtonProps extends LinkToProps {}

export const OpenButton = memo((props: OpenButtonProps) => {
    const {...res} = props;
    const {t} = useTranslation('common');

    return (
        <LinkTo {...res} displayLoading={false}>
            <TagUI className="border border-gray-200 bg-white btn-animation no-selectable gap-1 shadow hover:shadow-lg">
                <FolderOpen size={10} />
                <span className="text-10">{t('table.open')}</span>
            </TagUI>
        </LinkTo>
    );
});
OpenButton.displayName = 'OpenButton';

interface OpenButtonColumn extends LinkToProps {}

export const OpenButtonColumn = memo((props: OpenButtonColumn & WithChildren) => {
    const {children, ...res} = props;

    return (
        <Tippy placement="right" offset={[0, -30]} interactive render={() => <OpenButton {...res} />}>
            <div className="">{children}</div>
        </Tippy>
    );

    // return (
    //     <div className="flex items-center justify-between cursor-pointer group gap-2">
    //         {children}
    //
    //         <div className="flex items-center invisible pointer-events-none group-hover:visible group-hover:pointer-events-auto">
    //             <OpenButton {...res} />
    //         </div>
    //     </div>
    // );

    // return (
    //     <div className="relative cursor-pointer">
    //         {children}
    //
    //         <div className="absolute right-0 top-0 bottom-0 items-center hidden group-hover:flex">
    //             <OpenButton {...res} />
    //         </div>
    //     </div>
    // );
});
