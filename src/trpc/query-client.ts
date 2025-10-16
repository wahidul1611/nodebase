import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
/**
 * Create a preconfigured QueryClient for use with server-side rendering and client hydration.
 *
 * The returned client marks queries fresh for 30 seconds and dehydrates queries that meet the default
 * criteria or are currently in a `'pending'` state.
 *
 * @returns A `QueryClient` with `defaultOptions.queries.staleTime` set to 30000 and a `dehydrate.shouldDehydrateQuery` that also dehydrates queries whose state status is `'pending'`.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        // serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        // deserializeData: superjson.deserialize,
      },
    },
  });
}