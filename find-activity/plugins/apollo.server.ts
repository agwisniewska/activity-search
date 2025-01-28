import {
    createHttpLink,
    ApolloLink,
    type GraphQLRequest,
    execute,
    toPromise,
    Observable,
    type Operation,
  } from '@apollo/client/core';
  import { onError } from '@apollo/client/link/error';
  import fetch from 'cross-fetch';
  import { defineNuxtPlugin, useRuntimeConfig } from '#app';
  import Redis from 'ioredis';
  import { createHash } from 'crypto';
  import type { GraphQLError } from 'graphql';
  
  export type CacheNone = {
    type: 'none'
  }
  
  export type CacheAbsolute = {
    type: 'absolute'
    ttl: number
  }
  
  export type CacheRevalidate = {
    type: 'revalidate'
    maxAge: number
    revalidate: number
    lockRevalidation?: number
  }
  
  
  export const DEFAULT_CACHE: CacheOption = {
    type: 'absolute',
    ttl: 60 * 60,
  }

  export type CacheOption = CacheRevalidate | CacheAbsolute | CacheNone
  
  export interface QueryOptions<Variables> {
    query: Operation['query']
    variables?: Variables
    context?: {
      cache?: CacheOption
    }
  }
  
  
  export interface GraphQLResponse<T> {
    data: T
    errors?: readonly GraphQLError[]
  }
  
  type Query = <Response, Variables>(
    options: QueryOptions<Variables>,
  ) => Promise<GraphQLResponse<Response>>
  
  export type Apollo = {
    query: Query
  }
  
  
  function getCacheKey({ query, variables }: { query: unknown; variables: Record<string, unknown> }) {
    const key = JSON.stringify([query, variables]);
    const hash = createHash('sha1').update(key).digest('base64');
    return `graphql:${hash}`;
  }
  
  export default defineNuxtPlugin({
    name: 'apollo',
    setup() {
      try {
        console.log('Running apollo.server.ts');
        const { serverUrl, isProduction } = useRuntimeConfig().public;
  
        const httpLink = createHttpLink({
          uri: serverUrl,
          fetch,
        });
  
        const errorLink = onError(({ networkError, response }) => {
          if (networkError) {
            console.error(`[Network error]: ${networkError.message}`);
          }
          if (response?.errors) {
            console.error(`[GraphQL errors]:`, response.errors);
          }
        });
  
        let cacheLink = null;
        // To avoid connecting to redis in development it's hidden behind isProduction, but in general that should be like that

        if (isProduction) {
          const redis = new Redis();
  
          cacheLink = new ApolloLink((operation, forward) => {
            return new Observable((observer) => {
              const cacheKey = getCacheKey({
                query: operation.query,
                variables: operation.variables,
              });
  
              redis
                .get(cacheKey)
                .then((cachedResult) => {
                  if (cachedResult) {
                    observer.next(JSON.parse(cachedResult));
                    observer.complete();
                  } else {
                    forward(operation).subscribe({
                      next: (result) => {
                        redis
                          .set(cacheKey, JSON.stringify(result), 'EX', 300)
                          .then(() =>
                            console.log(`Cached response for ${cacheKey}`)
                          )
                          .catch((err) =>
                            console.error(`Failed to cache ${cacheKey}`, err)
                          );
                        observer.next(result);
                      },
                      error: (err) => observer.error(err),
                      complete: () => observer.complete(),
                    });
                  }
                })
                .catch((err) => {
                  console.error(`Redis error for key ${cacheKey}`, err);
                  forward(operation).subscribe(observer);
                });
            });
          });
        }
  
        const link = cacheLink
          ? ApolloLink.from([errorLink, cacheLink, httpLink])
          : ApolloLink.from([errorLink, httpLink]);
  
        const query = async <Response, Variables>(
          options: QueryOptions<Variables>
        ): Promise<GraphQLResponse<Response>> => {
          return (await toPromise(
            execute(link, options as unknown as GraphQLRequest)
          )) as Promise<GraphQLResponse<Response>>;
        };
  
        return {
          provide: {
            apollo: { query },
          },
        };
      } catch (err) {
        console.error(err, 'Error in apollo.server.ts');
      }
    },
  });
  