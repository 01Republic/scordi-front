import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {MoreDropdownMenu} from './MoreDropdownMenu';
import {MoreDropdownButton} from './MoreDropdownButton';

interface MoreDropdownProps extends WithChildren {
    moreDropdownButton?: () => JSX.Element;
    className?: string;
}

export const MoreDropdown = memo((props: MoreDropdownProps) => {
    const {moreDropdownButton, children, className = ''} = props;

    return (
        <div className={`dropdown dropdown-bottom dropdown-end ${className}`}>
            {moreDropdownButton ? moreDropdownButton() : <MoreDropdownButton />}

            <MoreDropdownMenu>{children}</MoreDropdownMenu>
        </div>
    );
});
MoreDropdown.displayName = 'MoreDropdown';

export * from './MoreDropdownButton';
export * from './MoreDropdownMenu';
export * from './MoreDropdownMenuItem';
