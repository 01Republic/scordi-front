import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LinkTo, LinkToProps} from '^components/util/LinkTo';

interface ListPageDropdownMenuItemProps extends LinkToProps {
    plain?: boolean;
}

export const ListPageDropdownMenuItem = memo((props: ListPageDropdownMenuItemProps & WithChildren) => {
    const {plain = false, children, ...res} = props;

    return (
        <div className="group" tabIndex={0}>
            {plain ? (
                children
            ) : (
                <LinkTo
                    {...res}
                    className="w-full py-2 px-4 group-hover:text-scordi transition-all flex items-center gap-2"
                    displayLoading={false}
                >
                    {children}
                </LinkTo>
            )}
        </div>
    );
});
ListPageDropdownMenuItem.displayName = 'ListPageDropdownMenuItem';
