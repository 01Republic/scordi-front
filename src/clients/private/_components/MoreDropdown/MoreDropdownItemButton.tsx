import {memo} from 'react';
import {LinkTo, LinkToProps} from '^components/util/LinkTo';

interface MoreDropdownItemButtonProps extends LinkToProps {
    //
}

export const MoreDropdownItemButton = memo((props: MoreDropdownItemButtonProps) => {
    const {className = '', ...res} = props;

    return (
        <LinkTo
            className={`text-12 flex items-center gap-2 py-2 bg-base-100 font-[500] text-gray-700 ${className}`}
            {...res}
        />
    );
});
MoreDropdownItemButton.displayName = 'MoreDropdownItemButton';
