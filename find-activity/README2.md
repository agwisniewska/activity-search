- inMemoryCache in apollo.client, for findActivity we can imagine users sedning same query multiple times during one session

- redis only on production, we don't want it in dev mode

- redis to share cached response between sessions or users


- paginacja (coursor instead of offset) 

- remove items from Pinia state, and replace with InMemoryCache()
    Pinia for app state (filters, sorting, pagination)
    InMemoryCache() on client with apollo.$query for activities for the given query 


- if algolia then cache is also important especially because API rquestes limit and costs.
in case of nuxt3 app
- client.ts
    request inMemoryCache
    response RedisCache (default inMemoryCache)
- server.ts
    request  (depends, no user action but we can request the same data in multiple components)
    response RedisCache

- algolia makes it easier to filter, sort, ability to create indices. 

- upload data (we can imagine from spreadsshet to Algolia)

