'use client';
// ^-- to make sure we can mount the Provider from a server component
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import { useState } from 'react';
import { makeQueryClient } from './query-client';
import type { AppRouter } from './routers/_app';
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
let browserQueryClient: QueryClient;
/**
 * Obtain a QueryClient configured for the current execution environment.
 *
 * On server execution this yields a new QueryClient; in the browser it returns
 * a single cached QueryClient instance to avoid recreating the client across renders.
 *
 * @returns A QueryClient instance — a fresh instance for server execution, or a cached singleton for browser execution.
 */
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
/**
 * Compute the full tRPC API URL appropriate for the current runtime environment.
 *
 * @returns The full `/api/trpc` URL: an empty-relative path in the browser ("" + `/api/trpc`), `https://<VERCEL_URL>/api/trpc` when `process.env.VERCEL_URL` is set on the server, or `http://localhost:3000/api/trpc` as a local server fallback.
 */
function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return '';
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return 'http://localhost:3000';
  })();
  return `${base}/api/trpc`;
}
/**
 * Provides TRPC and React Query contexts for its descendant components.
 *
 * Initializes the tRPC client once for this provider and supplies a QueryClient
 * (server: fresh per call; browser: cached) to the React Query and tRPC contexts,
 * then renders `children` within those providers.
 *
 * @param props.children - React nodes to be rendered inside the providers
 * @returns A React element that wraps `children` with QueryClientProvider and TRPCProvider
 */
export function TRPCReactProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          // transformer: superjson, <-- if you use a data transformer
          url: getUrl(),
        }),
      ],
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {props.children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}