import {useCallback, useEffect, useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {AxiosResponse} from 'axios';
import {errorNotify} from '^utils/toast-notify';
import {atom, RecoilState, useRecoilState} from 'recoil';

export function hasInvalidValue<T extends object>(object: T): boolean {
    return Object.values(object).every((v) =>
        v && typeof v === 'object' ? hasInvalidValue(v) : isNaN(v) || v === null || typeof v === 'undefined',
    );
}

/**
 * 범용 리소스에 대응할 수 있게 제작된 페이지네이션 목록 조회용 훅 빌더입니다.
 * 내부적으로 Recoil 을 사용하며, 기계적인 반복작업을 줄이는데 목적이 있습니다.
 *
 * ---
 * Usage:
 *
 *      export const useBillingHistories = makeFindAllResources<BillingHistoryDto, GetBillingHistoriesParams>({
 *          atom: billingHistoriesAtom,
 *          fetcher: getBillingHistories,
 *      });
 *
 * ---
 * 다음은 단일 리소스에 대한 훅 코드의 원형입니다.
 * Usage 대로 사용하지 않고 풀어서 작성하려면
 * 아래와 같은 코드를 리스트 조회시마다 작성해야 합니다.
 *
 * Original:
 *
 * export const useBillingHistories = (
 *     params: GetBillingHistoriesParams,
 *     deps: any[],
 *     validator?: (params: GetBillingHistoriesParams) => boolean,
 * ) => {
 *     const [page, setPage] = useState<number>(0);
 *     const [totalPage, setTotalPage] = useState<number>(0);
 *     const [totalItemCount, setTotalItemCount] = useState<number>(0);
 *     const [isLoading, setIsLoading] = useState<boolean>(false);
 *     const [list, setList] = useRecoilState(billingHistoriesAtom);
 *
 *     const fetch = useCallback((params: GetBillingHistoriesParams) => {
 *         // [skip] 파라미터에 NaN 이나 undefined 와 같은 값이 있다면, 정적으로 그냥 거른다.
 *         if (hasInvalidValue(params)) {
 *             // console.log('filtered', 'hasInvalidValue', deps, params);
 *             return;
 *         }
 *
 *         // [skip] 요청의 실행조건이 별도로 지정되어 있고, 평가된 값이 거짓이라면 요청을 생략합니다.
 *         if (validator && !validator(params)) {
 *             // console.log('filtered', 'validator', deps, params);
 *             return;
 *         }
 *
 *         console.log(deps, params);
 *         setIsLoading(true);
 *         getBillingHistories(params)
 *             .then(({data}) => {
 *                 setPage(data.pagination.currentPage);
 *                 setTotalPage(data.pagination.totalPage);
 *                 setTotalItemCount(data.pagination.totalItemCount);
 *                 const items = [...list, ...data.items];
 *                 setList(items);
 *             })
 *             .catch(errorNotify)
 *             .finally(() => setIsLoading(false));
 *     }, deps);
 *
 *     useEffect(() => {
 *         fetch(params);
 *     }, deps);
 *
 *     return {
 *         data: list,
 *         fetch,
 *         isLoading,
 *         pagination: {
 *             currentPage: page,
 *             totalPage,
 *             totalItemCount,
 *         },
 *     };
 * };
 */

// Recoil atom 을 외부로부터 주입받을 수 있습니다.
interface FindAllWithAtomOption<Entity, Params> {
    atom: RecoilState<Entity[]>;
    fetcher: (params: Params) => Promise<AxiosResponse<Paginated<Entity>, any>>;
}

// Recoil atom 을 외부로부터 주입받지 않고, 빌더 내부에서 생성할 수 있습니다.
interface indAllWithoutAtomOption<Entity, Params> {
    key: string;
    default: Entity[];
    fetcher: (params: Params) => Promise<AxiosResponse<Paginated<Entity>, any>>;
}

export function makeFindAllResources<Entity, Params extends object>(
    option: FindAllWithAtomOption<Entity, Params> | indAllWithoutAtomOption<Entity, Params>,
) {
    const getResources = option.fetcher;
    const recoilState = 'atom' in option ? option.atom : atom({key: option.key, default: option.default});

    return (params: Params, deps: any[], validator?: (params: Params) => boolean) => {
        const [page, setPage] = useState<number>(0);
        const [totalPage, setTotalPage] = useState<number>(0);
        const [totalItemCount, setTotalItemCount] = useState<number>(0);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [list, setList] = useRecoilState(recoilState);

        const fetch = useCallback((params: Params) => {
            // [skip] 파라미터에 NaN 이나 undefined 와 같은 값이 있다면, 정적으로 그냥 거른다.
            if (hasInvalidValue(params)) {
                // console.log('filtered', 'hasInvalidValue', deps, params);
                return;
            }

            // [skip] 요청의 실행조건이 별도로 지정되어 있고, 평가된 값이 거짓이라면 요청을 생략합니다.
            if (validator && !validator(params)) {
                // console.log('filtered', 'validator', deps, params);
                return;
            }

            // console.log(deps, params);
            setIsLoading(true);
            getResources(params)
                .then(({data}) => {
                    setPage(data.pagination.currentPage);
                    setTotalPage(data.pagination.totalPage);
                    setTotalItemCount(data.pagination.totalItemCount);
                    // 무한스크롤과 같은 상황에서
                    // page 1, 2, 3 ... 요청한 결과를 누적하여 가지려면
                    // append 하도록 해야 하므로 아래와 같은 spread 가 불가피합니다.
                    //
                    // 그런데 이 부분이 개발시 리엑트의 hot reload 시에
                    // 기존 상태를 그대로 가지고 누적시키는 버그를 만들어내고 있습니다.
                    // 개발시에만 나타나는 버그이므로 아직 해결방법은 못찾은 상태입니다.
                    const items = [...list, ...data.items];
                    setList(items);
                })
                .catch(errorNotify)
                .finally(() => setIsLoading(false));
        }, deps);

        useEffect(() => {
            fetch(params);
        }, deps);

        return {
            data: list,
            fetch,
            isLoading,
            pagination: {
                currentPage: page,
                totalPage,
                totalItemCount,
            },
        };
    };
}
