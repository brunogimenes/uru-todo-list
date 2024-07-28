import { QueryClient } from "@tanstack/react-query";

export const httpConfig = {
  baseURL: 'http://localhost:3000/',
  cacheTime: 1 * 60 * 1000,
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});