import {useCallback, useState} from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {adminScordiPlansApi} from '^models/_scordi/ScordiPlan/api';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {infiniteQueryDefaultOptions, useInfiniteQueryMergeResult} from '^types/utils/paginated.dto';

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
