import {
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from "@tanstack/react-query";

type QueryFn<T> = () => Promise<T>;

export function useApiQuery<T>(
  key: string | unknown[],
  queryFn: QueryFn<T>,
  options?: UseQueryOptions<T>,
): UseQueryResult<T> {
  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    ...options,
  });
}
