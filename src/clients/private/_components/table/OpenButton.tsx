import React, {memo} from 'react';
import {LinkTo, LinkToProps} from '^components/util/LinkTo';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaRegFolderOpen} from 'react-icons/fa';
import {WithChildren} from '^types/global.type';

interface OpenButtonProps extends LinkToProps {}

export const OpenButton = memo((props: OpenButtonProps) => {
    const {...res} = props;

    return (
        <LinkTo {...res} displayLoading={false}>
            <TagUI className="border border-gray-200 bg-white btn-animation no-selectable gap-1 shadow hover:shadow-lg">
                <FaRegFolderOpen size={10} />
                <span className="text-10">열기</span>
            </TagUI>
        </LinkTo>
    );
});
OpenButton.displayName = 'OpenButton';

interface OpenButtonColumn extends LinkToProps {}

export const OpenButtonColumn = memo((props: OpenButtonColumn & WithChildren) => {
    const {children, ...res} = props;

    return (
        <div className="relative cursor-pointer">
            {children}

            <div className="absolute right-0 top-0 bottom-0 items-center hidden group-hover:flex">
                <OpenButton {...res} />
            </div>
        </div>
    );
});