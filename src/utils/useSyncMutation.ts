import {useMutation, UseMutationOptions, UseMutationResult} from '@tanstack/react-query';

const useSyncMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
    options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData | undefined, TError, TVariables, TContext> => {
    const mutationResults = useMutation(options);

    return {
        ...mutationResults,
        mutate: (...params: [TVariables]) => {
            if (!mutationResults.isPending) {
                mutationResults.mutate(...params);
            }
        },
        mutateAsync: async (...params: [TVariables]) => {
            if (mutationResults.isPending) return;
            return mutationResults.mutateAsync(...params);
        },
    };
};

export default useSyncMutation;
