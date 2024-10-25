import React, {memo} from 'react';
import {ListPageScopeButton} from '^clients/private/_layouts/_shared/ListPageScopeButton';

interface YearlyScopeHandlerProps {
    years: number[];
    value?: number;
    onChange?: (year: number) => any;
}

export const YearlyScopeHandler = memo((props: YearlyScopeHandlerProps) => {
    const {years, value, onChange} = props;

    return (
        <div className="flex items-center gap-2 flex-wrap pr-16">
            {years.map((year, i) => (
                <ListPageScopeButton
                    key={year}
                    active={value ? year === value : i === 0}
                    onClick={() => onChange && onChange(year)}
                >
                    {year}
                </ListPageScopeButton>
            ))}
        </div>
    );
});
YearlyScopeHandler.displayName = 'YearlyScopeHandler';
