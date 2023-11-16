import {
  QueryClient,
  QueryClientProvider as OriginQueryClientProvider,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const QueryClientProvider = OriginQueryClientProvider;
