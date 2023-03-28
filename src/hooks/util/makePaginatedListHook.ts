import {atom, RecoilState, useRecoilState} from 'recoil';
import {Paginated, PaginationMetaData} from '^types/utils/paginated.dto';
import {useCallback} from 'react';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {AxiosResponse} from 'axios';
import {errorNotify} from '^utils/toast-notify';

/**
 * 페이지네이션을 지원하는 Index Endpoint 쿼리를 위한 코드는 아래와 같은 Hook 을 사용합니다.
 * 그런데 이 hook 은 보일러플레이트 코드가 꽤 커서 매번 작성하기에 번거롭습니다.
 *
 * 또 서로 다른 임의의 리소스에 대한 목록 조회 목적의 코드하면,
 * (예를 들어 연동이력목록 조회, 결제목록 조회, 구성원목록 조회 등)
 * 스펙과 인터페이스를 매번 따로 정의하는게 아니라, 일관되게 유지하는 것이 훨씬 생산적이기 때문에
 * 아래와 같은 코드를 만들어주는 보일러플레이트 작성용 팩토리 함수를 만들게 되었습니다.
 *
 * ```
 * export const useSyncHistoryList = () => {
 *     const [items, setItems] = useRecoilState(syncHistoryListAtom);
 *     const [pagination, setPagination] = useRecoilState(syncHistoryListPaginationAtom);
 *     const [queryParams, setQueryParams] = useRecoilState(syncHistoryListFetchItemsQueryParamAtom);
 *
 *     const fetchItems = useCallback(
 *         (applicationId: number, page: number, force?: boolean) => {
 *             if (!force && pagination.currentPage === page) return;
 *
 *             const params: FindAllSyncHistoryQuery = {
 *                 where: {applicationId},
 *                 order: {id: 'DESC'},
 *                 page,
 *                 itemsPerPage: pagination.itemsPerPage,
 *             };
 *             if (!force && JSON.stringify(queryParams) === JSON.stringify(params)) return;
 *
 *             setQueryParams(params);
 *             return getSyncHistories(applicationId, params)
 *                 .then((res) => {
 *                     setItems(res.data.items);
 *                     setPagination(res.data.pagination);
 *                 })
 *                 .catch(errorNotify);
 *         },
 *         [pagination, queryParams],
 *     );
 *
 *     return {
 *         items,
 *         fetchItems,
 *         pagination,
 *     };
 * };
 * ```
 */

interface MakePaginatedListHookOption<FetcherInterface, ItemDto> {
    listAtom: RecoilState<ItemDto[]>;
    paginationAtom: RecoilState<PaginationMetaData>;
    queryParamAtom: RecoilState<FindAllQueryDto<ItemDto>>;
    buildParams: (args: FetcherInterface, page: number, pagination: PaginationMetaData) => FindAllQueryDto<ItemDto>;
    request: (
        args: FetcherInterface,
        params: FindAllQueryDto<ItemDto>,
    ) => Promise<AxiosResponse<Paginated<ItemDto>, any>>;
}

export const makePaginatedListHook = <FetcherInterface, ItemDto>(
    option: MakePaginatedListHookOption<FetcherInterface, ItemDto>,
) => {
    const {listAtom, paginationAtom, queryParamAtom, buildParams, request} = option;

    function paginatedListHook() {
        const [items, setItems] = useRecoilState(listAtom);
        const [pagination, setPagination] = useRecoilState(paginationAtom);
        const [queryParams, setQueryParams] = useRecoilState(queryParamAtom);

        const fetchItems = useCallback(
            (args: FetcherInterface, page: number, force?: boolean) => {
                if (!force && pagination.currentPage === page) return;

                const params: FindAllQueryDto<ItemDto> = buildParams(args, page, pagination);

                if (!force && JSON.stringify(queryParams) === JSON.stringify(params)) return;
                setQueryParams(params);
                return request(args, params)
                    .then((res) => {
                        setItems(res.data.items);
                        setPagination(res.data.pagination);
                    })
                    .catch(errorNotify);
            },
            [pagination, queryParams],
        );

        return {
            items,
            fetchItems,
            pagination,
        };
    }

    return {
        paginatedListHook,
        listAtom,
        paginationAtom,
        queryParamAtom,
    };
};

/**
 * 이걸 보고 계신 분이라면, 아마도 쓸 데 없이 축약한 것 아닌가 하는 생각이 들 수도 있습니다.
 * 이걸 만든 저도 그러니까요.
 *
 * 그런데, 이 아톰들을 만들어내는 코드는
 * 정확히 "페이지네이션 리스트" 기능만을 위한 아톰들이기에,
 * 훅을 정의하는 파일과 따로 떨어져 있을 필요가 없고,
 * 그래서도 안될 것 같았습니다.
 *
 * 또한 이렇게 정형화 해도 괜찮다면,
 * 이어지는 makePaginatedListHook2 함수를 통해 필요한 모든 기능을
 * 훨씬 더 깔끔하고 단순하게, 그리고 빠르면서 빠짐없이 구현할 수 있게 됩니다.
 * 이는 개발자의 작업 능률을 상당히 높여 줄 수 있습니다.
 *
 *
 * 이렇게 사용하면,
 * ```
 *    const {listAtom, queryParamAtom, paginationAtom} = makePaginatedListAtoms<SyncHistoryDto>({
 *        subject: 'syncHistoryList',
 *    });
 *    export const syncHistoryListAtom = listAtom;
 *    export const syncHistoryListFetchItemsQueryParamAtom = queryParamAtom;
 *    export const syncHistoryListPaginationAtom = paginationAtom;
 * ```
 *
 * 이런 코드와 동일합니다.
 * ```
 *    export const syncHistoryListAtom = atom<SyncHistoryDto[]>({
 *        key: 'syncHistoryListAtom',
 *        default: [],
 *    });
 *
 *    export const syncHistoryListFetchItemsQueryParamAtom = atom<FindAllSyncHistoryQuery>({
 *        key: 'syncHistoryList/fetchItemsQueryParamAtom',
 *        default: {},
 *    });
 *
 *    export const syncHistoryListPaginationAtom = atom<PaginationMetaData>({
 *        key: 'syncHistoryList/paginationAtom',
 *        default: {
 *            totalItemCount: 0,
 *            currentItemCount: 0,
 *            totalPage: 0,
 *            currentPage: 0,
 *            itemsPerPage: 10,
 *        },
 *    });
 * ```
 */

interface MakePaginatedListAtomsOption {
    subject: string;
}

export function makePaginatedListAtoms<ItemDto>(option: MakePaginatedListAtomsOption) {
    const {subject} = option;

    const listAtom = atom<ItemDto[]>({
        key: `${subject}Atom`,
        default: [],
    });

    const queryParamAtom = atom<FindAllQueryDto<ItemDto>>({
        key: `${subject}/fetchItemsQueryParamAtom`,
        default: {},
    });

    const paginationAtom = atom<PaginationMetaData>({
        key: `${subject}/paginationAtom`,
        default: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 0,
            currentPage: 0,
            itemsPerPage: 10,
        },
    });

    return {listAtom, queryParamAtom, paginationAtom};
}

interface MakePaginatedListHookWithAtoms<FetcherInterface, ItemDto> {
    subject: string;
    buildParams: (args: FetcherInterface, page: number, pagination: PaginationMetaData) => FindAllQueryDto<ItemDto>;
    request: (
        args: FetcherInterface,
        params: FindAllQueryDto<ItemDto>,
    ) => Promise<AxiosResponse<Paginated<ItemDto>, any>>;
}

export const makePaginatedListHookWithAtoms = <FetcherInterface, ItemDto>(
    option: MakePaginatedListHookWithAtoms<FetcherInterface, ItemDto>,
) => {
    const {subject, buildParams, request} = option;
    return makePaginatedListHook<FetcherInterface, ItemDto>({
        ...makePaginatedListAtoms<ItemDto>({subject}),
        buildParams,
        request,
    });
};
