import {useCallback, useState} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {adminScordiPlansApi} from '^models/_scordi/ScordiPlan/api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {infiniteQueryDefaultOptions, useInfiniteQueryMergeResult} from '^types/utils/paginated.dto';

/**
 * 관리자용 Scordi 요금제 목록을 페이지네이션 가능한 무한 쿼리로 조회하는 커스텀 훅.
 *
 * 내부적으로 전달된 초기 조회 파라미터를 상태로 유지하며, react-query의 useInfiniteQuery를 사용해 페이지별 데이터를 가져옵니다.
 * 또한 useInfiniteQueryMergeResult로 병합된 결과(result)를 제공하고, 페이지 변경을 위한 onPageChange 헬퍼를 노출합니다.
 *
 * @param initialParams - 초기 조회 조건(페이지, itemsPerPage 등)을 포함한 FindAllQueryDto<ScordiPlanDto>
 * @returns 쿼리 실행 결과에 원래의 useInfiniteQuery 반환값을 모두 합친 객체. 추가로 다음 필드를 포함합니다:
 * - result: useInfiniteQueryMergeResult로 병합된 페이징 결과
 * - params: 현재 조회 파라미터 상태
 * - setParams: 조회 파라미터를 직접 갱신하는 상태 설정 함수
 * - onPageChange(page, itemsPerPage, force?): 페이지를 변경하는 헬퍼. force가 true면 캐시된 'admin/scordi-plans' 쿼리를 제거한 뒤 파라미터를 갱신합니다.
 */
export function useAdminScordiPlanList(initialParams: FindAllQueryDto<ScordiPlanDto>) {
    const [params, setParams] = useState(initialParams);
    const queryClient = useQueryClient();
    const queryResult = useInfiniteQuery({
        queryKey: ['admin/scordi-plans', params],
        queryFn: async ({pageParam: page}) => {
            const res = await adminScordiPlansApi.index({...params, page});
            return res.data;
        },
        ...infiniteQueryDefaultOptions,
    });

    const result = useInfiniteQueryMergeResult(queryResult);

    const onPageChange = useCallback(
        (page: number, itemsPerPage: number, force = false) => {
            if (force) queryClient.removeQueries({queryKey: ['admin/scordi-plans']});
            setParams((q) => ({...q, page, itemsPerPage}));
        },
        [setParams],
    );

    return {...queryResult, result, params, setParams, onPageChange};
}
