import {ListPage} from '^clients/private/_components/rest-pages/ListPage';

interface YearlyScopeHandlerProps {
    years: number[];
    value?: number;
    onChange?: (year: number) => any;
}

export function YearlyScopeHandler(props: YearlyScopeHandlerProps) {
    const {years, value, onChange} = props;

    return (
        <div className="flex items-center gap-2 flex-wrap pr-16">
            {years.map((year, i) => (
                <ListPage.ScopeButton
                    key={year}
                    active={value ? year === value : i === 0}
                    onClick={() => onChange && onChange(year)}
                >
                    {year}
                </ListPage.ScopeButton>
            ))}
        </div>
    );
}
