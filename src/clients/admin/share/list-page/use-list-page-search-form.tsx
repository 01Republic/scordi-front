import {FieldValues, Path, useForm, UseFormReturn} from 'react-hook-form';
import {DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes, memo, useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {AxiosResponse} from 'axios';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {WithChildren} from '^types/global.type';
import {Paginator} from '^components/Paginator';
import {useId} from 'react-id-generator';
import {cachePagedQuery} from '^hooks/usePagedResource';

type EntityDto = {id: number};
type SearchQueryDto<DTO extends EntityDto> = FindAllQueryDto<DTO> & {keyword?: string};

interface SearchResultContainerProps extends WithChildren {}

export function useListPageSearchForm<ItemDto extends EntityDto, QueryDto extends FieldValues>(
    request: (params: QueryDto) => Promise<AxiosResponse<Paginated<ItemDto>>>,
) {
    const searchForm = useForm<QueryDto>();
    const [listPage, setListPage] = useState<Paginated<ItemDto>>({
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 0,
            currentPage: 0,
            itemsPerPage: 0,
        },
    });

    // @ts-ignore
    const [query, setQuery] = useState<QueryDto>({});

    const fetchData = (params: QueryDto) => {
        return request(params).then((res) => {
            setListPage(res.data);
            setQuery(params);
        });
    };

    const onSearch = (data: QueryDto) => fetchData({...query, ...data, page: 1});

    const SearchResultContainer = ({children}: SearchResultContainerProps) => {
        return (
            <div className="flex flex-col gap-2">
                {listPage.items.length === 0 ? (
                    <div>검색 결과가 없습니다.</div>
                ) : (
                    <>
                        {/* List render here. */}
                        {children}

                        {/* Paginator */}
                        <div className="flex items-center justify-center w-full gap-4">
                            <div>
                                <select
                                    className="select select-bordered"
                                    defaultValue={query.itemsPerPage === 0 ? 0 : query.itemsPerPage || 30}
                                    onChange={(e) => {
                                        const itemsPerPage = Number(e.target.value);
                                        fetchData({...query, itemsPerPage});
                                    }}
                                >
                                    {[10, 30, 50, 100].map((value, i) => (
                                        <option key={i} value={value}>
                                            {value} 개씩 보기
                                        </option>
                                    ))}
                                    <option value={0}>전체 보기</option>
                                </select>
                            </div>

                            <Paginator
                                currentPage={listPage.pagination.currentPage}
                                totalPage={listPage.pagination.totalPage}
                                onClick={(n) => {
                                    fetchData({...query, ...searchForm.getValues(), page: n});
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    };

    return {
        fetchData,
        searchForm,
        onSearch,
        listPage,
        setListPage,
        SearchForm,
        SearchResultContainer,
    };
}

interface SearchFormProps<T extends FieldValues>
    extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    searchForm: UseFormReturn<T, any>;
    onSearch: (data: T) => any;
    registerName?: Path<T>;
}

const SearchForm = forwardRef(
    <T extends FieldValues>(
        {searchForm, onSearch, registerName, children, ...props}: SearchFormProps<T>,
        ref: ForwardedRef<any>,
    ) => {
        const [id] = useId(1, 'SearchForm');
        return (
            <form id={id} ref={ref} onSubmit={searchForm.handleSubmit(onSearch)}>
                {registerName ? <input {...props} {...searchForm.register(registerName)} /> : children}
            </form>
        );
    },
);
