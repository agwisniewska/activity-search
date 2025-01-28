import fetch from 'cross-fetch'
import {
  createHttpLink,
  execute,
  toPromise,
  type GraphQLRequest,
  type Operation,
  ApolloClient,
  InMemoryCache,
  type OperationVariables
} from '@apollo/client/core';
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


export default defineNuxtPlugin({
  name: 'apollo',
  setup: async() => {
    console.log('Running apollo.client.ts')

    try {
      const { clientUrl } = useRuntimeConfig().public
      const httpLink = createHttpLink({
        uri: clientUrl,
        fetch,
      })
 

      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              supplier: {
                keyArgs: ['id'],
                merge(existing, incoming) {
                  return incoming
                },
              },
              activity: {
                keyArgs: ['id'],
                merge(existing, incoming) {
                  //  TODO: if we deecide on pagination, then we need to merge data, existing with incoming
                  //  dso this cache is not needed now, but can be needed in the future so to decide how to store data
                  return incoming
                },
              },
            },
          },
        },
     
      })

      const client = new ApolloClient({
        cache,
        link: httpLink,
        connectToDevTools: true,
        defaultOptions: {
          query: {
            // TODO: replace or remove as it's the default
            fetchPolicy: 'cache-first',
          },
        },
      })

      const query = async <Response, Variables>(
        options: QueryOptions<Variables>,
      ): Promise<GraphQLResponse<Response>> => {
        const result = await client.query(options as unknown as QueryOptions<OperationVariables>)

        // there is a difference between GpraphQLResponse and  GrapqhQLFromattedResponse
        const errors = result.errors as readonly GraphQLError[] | undefined;

        return {
          data: result.data,
          errors
        }

      }
      return { provide: { apollo: { query } } }
    } catch (e) {
      console.error('plugin:apollo')
      throw e
    }
  },
})
