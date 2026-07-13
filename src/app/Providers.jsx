import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// React Query ka central cache manager
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,         // 1 min fresh
      gcTime: 5 * 60 * 1000,        // ← 5 min garbage collection (was cacheTime)
      retry: 1,
      retryDelay: (attempt) =>
        Math.min(1000 * 2 ** attempt, 10000), // ← exponential backoff: 1s, 2s, 4s...
      refetchOnWindowFocus: false,  // ← tab switch pe unnecessary refetch rokta hai
      refetchOnReconnect: true,     // ← network wapas aane pe refetch (good UX)
    },
    mutations: {
      retry: 0,                     // ← mutations retry nahi karni (payment double trigger!)
    },
  },
});

const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* Toast notifications */}
      <Toaster position="top-right" />

      {/* Sirf development me */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default Providers;
