import {AxiosResponse} from 'axios';
import {Paginated} from '^types/utils/paginated.dto';
import {atom} from 'recoil';
import {usePagedResource} from './usePagedResouce';

interface UsePagedResourceFactoryOption<DTO, Query> {
    // 생상할 아톰의 키가 됩니다.
    key: string;

    // 이용하려는 API 엔드포인트.
    //
    // 예시) `endpoint: (params) => productApi.index(params),`
    endpoint: (params: Query, orgId: number) => Promise<AxiosResponse<Paginated<DTO>, any>>;

    // 최종적으로 쿼리를 전처리해야 하는 경우에 넣어주세요.
    //
    // 요청을 보내기 직전에 호출됩니다.
    buildQuery?: (params: Query, orgId: number) => Query;

    // 이 DTO 객체의 비교 키를 알려주세요. (ex: 'id')
    //
    // filter 등 비교함수에서 사용됩니다.
    getId: keyof DTO | ((dto: DTO) => any);

    // search() 함수에서 mergeMode 를 true 로 설정하는 경우,
    //
    // 이런 일이 자주 있다면 처음부터 기본값을 true 로 설정해 둘 수 있습니다.
    mergeMode?: boolean;
}

/**
 * 검색하는 훅을 매번 만드는것도 귀찮은데,
 * 관련된 아톰 상태도 두개씩 매번 만드는것도 역시 귀찮아서 만듦.
 * 이 함수는 쉽게 말하면,
 * 아톰을 생성해서 usePagedResource 에 넣어서 훅을 만드는 팩토리 역할이다.
 *
 * 사용 참고사례: src/models/Product/hook/index.ts:57
 */
export function buildPagedResource<DTO, Query extends object>(option: UsePagedResourceFactoryOption<DTO, Query>) {
    const {endpoint, key, buildQuery, mergeMode, getId} = option;

    const resultAtom = atom<Paginated<DTO>>({
        key: `PagedResource/resultAtom/${key}`,
        default: {
            items: [],
            pagination: {
                totalItemCount: 0,
                currentItemCount: 0,
                totalPage: 1,
                currentPage: 1,
                itemsPerPage: 30,
            },
        },
    });

    const queryAtom = atom<Query>({
        key: `PagedResource/queryAtom/${key}`,
        // @ts-ignore
        default: {},
    });

    return () => {
        return usePagedResource({
            resultAtom,
            queryAtom,
            endpoint,
            buildQuery,
            mergeMode,
            getId,
        });
    };
}
