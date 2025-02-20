import {ReactNodeElement} from '^types/global.type';
import {MouseEvent, ButtonHTMLAttributes, DetailedHTMLProps, useState, HTMLAttributes, MouseEventHandler} from 'react';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaTimes} from 'react-icons/fa';
import {getColor, palette} from '^components/util/palette';

type FilterKey = string | number;

interface Filter {
    key: FilterKey;
    value?: ReactNodeElement;
    onClick?: () => any;
}

interface UseListFilterOption {
    reset: () => any;
}

export const useListFilter = (option: UseListFilterOption) => {
    const {reset} = option;
    const [filters, setFilters] = useState<Filter[]>([]);
    const addFilter = (filter: Filter) => setFilters((_filters) => [..._filters, filter]);
    const removeFilter = (key: FilterKey) => setFilters((arr) => arr.filter((a) => a.key !== key));
    const resetFilter = () => {
        reset();
        setFilters([]);
    };

    const filterRegister = <T extends HTMLElement>(opt: {
        group?: string;
        label: string;
        query: () => any;
        notQuery?: () => any;
        reset: () => any;
    }) => {
        const {group, label, query, notQuery, reset} = opt;

        return {
            // Query
            onClick: () => {
                const key = new Date().getTime();
                const value = [group, label].filter((e) => e).join(': ');

                // 필터 뱃지 추가
                addFilter({
                    key,
                    value,
                    // 필터 적용 해제
                    onClick: () => {
                        removeFilter(key);
                        reset();
                    },
                });

                // 필터 적용 실행
                query();
            },

            // Not Query
            onContextMenu: ((): MouseEventHandler<T> => {
                return (e) => {
                    if (!notQuery) return;

                    e.preventDefault();
                    const key = new Date().getTime();
                    const value = [group, ['NOT', label].join(' ')].filter((e) => e).join(': ');

                    // 필터 뱃지 추가
                    addFilter({
                        key,
                        value,
                        // 필터 적용 해제
                        onClick: () => {
                            removeFilter(key);
                            reset();
                        },
                    });

                    // 필터 적용 실행
                    notQuery();
                };
            })(),
        };
    };

    return {
        filters,
        setFilters,
        addFilter,
        removeFilter,
        resetFilter,
        filterRegister,
    };
};

export const FilterResetButton = (
    props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
    const {className = '', ...res} = props;

    return (
        <button className={`btn btn-xs btn-white ${className}`} {...res}>
            조건 초기화
        </button>
    );
};

interface FilterItemProps {
    filter: Filter;
}

export const FilterItem = ({filter}: FilterItemProps) => {
    const {key, value, onClick} = filter;
    const index = typeof key === 'string' ? key.length : key;
    const colorClass = getColor(index, palette.notionColors);

    return (
        <TagUI
            className={`flex items-center ${colorClass} group`}
            onClick={() => {
                onClick && onClick();
            }}
        >
            <div>{value}</div>
            <div className="ml-1 bg-transparent text-gray-500 group-hover:text-gray-800 transition-all">
                <FaTimes fontSize={10} />
            </div>
        </TagUI>
    );
};

export const FilterItems = ({filters, onClear}: {filters: Filter[]; onClear?: () => any}) => {
    return filters.length > 0 ? (
        <div className="flex items-center gap-4">
            {onClear && <FilterResetButton onClick={onClear} />}
            <div className="flex items-center">
                {filters.map((filter, i) => (
                    <FilterItem key={i} filter={filter} />
                ))}
            </div>
        </div>
    ) : (
        <></>
    );
};
