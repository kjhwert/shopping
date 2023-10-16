import { QueryFunction, QueryKey } from "@tanstack/react-query";

export type RequiredQueryOptions<ApiFn extends (...args: any) => Promise<any>> =
  {
    queryFn: QueryFunction<Awaited<ReturnType<ApiFn>>>;
    queryKey: QueryKey;
  };
