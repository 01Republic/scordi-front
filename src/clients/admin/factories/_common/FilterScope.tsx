import {memo} from 'react';
import {WithChildren} from '^types/global.type';

interface FilterScopeProps extends WithChildren {
    active: boolean;
    onClick: () => any;
}

export const FilterScope = memo((props: FilterScopeProps) => {
    const {active, onClick, children} = props;

    return (
        <div className={`cursor-pointer ${active ? 'text-scordi' : 'hover:text-scordi'}`} onClick={onClick}>
            {children}
        </div>
    );
});
FilterScope.displayName = 'FilterScope';
