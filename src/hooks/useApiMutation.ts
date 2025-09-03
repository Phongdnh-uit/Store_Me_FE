import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";

type MutationFn<TData, TVariables> = (variables: TVariables) => Promise<TData>;

export function useApiMutation<TData, TVariables>(
  mutationFn: MutationFn<TData, TVariables>,
  options?: UseMutationOptions<TData, Error, TVariables>,
): UseMutationResult<TData, Error, TVariables> {
  return useMutation<TData, Error, TVariables>({
    mutationFn,
    ...options,
  });
}
