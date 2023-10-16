import { QueryFunction, QueryKey } from "@tanstack/react-query";

export type RequiredQueryOptions<T extends (...args: any) => Promise<any>> = {
  queryFn: QueryFunction<Awaited<ReturnType<T>>>;
  queryKey: QueryKey;
};

export type ApiQuery<T extends (...args: any) => Promise<any>> = (
  ...args: Parameters<T>
) => RequiredQueryOptions<T>;
