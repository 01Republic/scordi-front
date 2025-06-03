import {UseQueryResult} from '@tanstack/react-query';
import {isDefinedValue} from '^utils/array';

export function queriesCombine<T, E extends Error = Error>(results: UseQueryResult<T[], E>[]) {
    return {
        data: results.flatMap((result) => result.data).filter(isDefinedValue),
        errors: results.flatMap((result) => result.error).filter(isDefinedValue),
        pending: results.some((result) => result.isPending),
        refetch: () => results.map((result) => result.refetch()),
    };
}

export function fulfilledQueries<T, E extends Error = Error>(results: UseQueryResult<T[], E>[]) {
    return results.filter((result) => !!result.data);
}

export function rejectedQueries<T, E extends Error = Error>(results: UseQueryResult<T[], E>[]) {
    return results.filter((result) => !!result.error);
}

export function queriesControl<T, E extends Error = Error>(results: UseQueryResult<T[], E>[]) {
    const combined = queriesCombine(results);
    const fulfilled = fulfilledQueries(results);
    const rejected = rejectedQueries(results);

    return {
        ...combined,
        fulfilled,
        rejected,
    };
}
