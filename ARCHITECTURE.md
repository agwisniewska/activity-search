# Project Architecture

## How to run

1. Navigate to the find-activity directory:

`cd find-activity`

2. Install project dependencies:

`yarn install`

3. Return to the root directory:

`cd ..`

4. Build and start the Docker containers:

`docker-compose up --build`

## Overview

1. Frontend Interaction:

The Frontend Application `find-activity`, built with Vue.js and Nuxt.js, serves as the user interface.
It communicates with the backend through Apollo Client, making GraphQL queries to fetch and manipulate data.

By leveraging Nuxt.js, we ensure that our frontend is performant and SEO-friendly but also scalable and maintainable, complementing modern backend services and GraphQL architecture.

2. API Gateway:

Acts as the Unified Entry Point for all client requests.
Utilizes Apollo Server to handle GraphQL requests, routing them to the appropriate backend services.

3. Backend Microservices:

- Activity Service:
  Handles all operations related to activities, including creation, retrieval, updating, and deletion.
  Interacts with the PostgreSQL database using Prisma ORM for type-safe data access.

- Supplier Service:
  Manages supplier-related functionalities, such as managing supplier information and their associated activities.
  Also interacts with the PostgreSQL database using Prisma ORM for type-safe data access.

4. Database Layer:
   Each microservice maintains its own PostgreSQL database, ensuring data encapsulation and integrity.

Separating backend functionalities into Activity Service and Supplier Service promotes scalability, maintainability, and fault isolation.

## Left Features in `find-activity`

1. Internationalization (i18n) Support
   What:
   Adding multilingual support to cater to a broader audience.
   Why:
   Expands the application's reach and accessibility to non-English users
   How:
   Integrate Nuxt.js i18n module for managing translations and locale-specific content.

2. Testing
   What:
   Establishing a testing framework including unit, component tests
   Why:
   Ensure Reliability and facilitate maintenance, makes it easier to refactor and update the codebase, improve development efficiency
   How:  
   Utilize Vitest and Vue Test Utils to write tests for individual Vue components and utility functions, ensuring that each unit behaves correctly in isolation, also considering Integration Testing, E2E Testing with Cypress.
   Focus on Smoke Tests, so the most important functionalities.

3. Custom error handling
   What:
   Implementing comprehensive error handling mechanisms to manage and respond to various error scenarios.
   Why:
   Providing error messages ensures users are informed about issues and can take actions.
   Detailed error logging aids in quicker identification and resolution of issues, reducing downtime.
   How:
   Utilize Nuxt.js middleware and plugins to catch and handle errors globally across the application.
   Use UI components (e.g., toast notifications) to inform users of errors
   Integrate logging tools like Sentry to monitor and record errors for analysis.
   API Response Handling: Implement standardized handling of API responses using Apollo Client

4. Mobile Responsiveness Enhancements
   What:
   Developing a fully responsive design to ensureapplication provides an optimal user experience across all mobile devices and screen sizes (for now only some elements are introduces, but eg. `SearchFilters` component miss it)
   Why:
   Ensures that users on mobile devices have a seamless and intuitive interaction with the application, expands the application's reach, and mobile-friendly designs positively impact search engine rankings.
   How:
   Utilize Tailwind CSS's responsive utility classes, and implement media queries (if Tailwind CSS for some reason is not enough) to adjust component styles and layouts based on device width.

5. Redis Cache in apollo.server.ts + InMemory cache in apollo.client.ts
   What:
   Making Redis as a caching layer within `apollo.server.ts`
   For now it's not fully set up.
   Why:
   Improve data retrieval speeds by serving cached responses for frequent queries, and decrease the number of direct requests to backend services, optimizing resource usage.
   How:
   The existing setup lacks error handling, more in-depth cache policies that are simplistic and the whole `cacheLink` implementation is hidden behind the `isProduction` flag to avoid the errors with `new Redis()`

6. Advanced Filters Implementation
   What:
   Adding ore sophisticated and user-friendly filter options within the `find-activity` including reset filters
   Why:
   Allows users to easily and effectively filter making the application more intuitive and efficient to use,advanced filtering options helps users narrow down results
   How:
   Integrate advanced filter components such as dropdowns, sliders, autocomplete fields, and a all filters modal window Add buttons to allow users to reset all filters or initiate search operations easily, ensuring users can manage their filter criteria effortlessly.

7. Search Query Suggestions
   What:
   Implementing search query suggestions to enhance the search functionality by providing real-time suggestions as users type.
   Why:
   Assists users in finding relevant activities quickly by offering suggestions based on current input, helps prevent search errors and ensures users can find desired activities with ease.
   How:
   Integrating a third-party service like Algolia to handle search indexing and provide fast, reliable query suggestions through its API, but also exploring alternatives or building a custom suggestion mechanism if Algolia's costs are prohibitive (then implementing GraphQL queries to retrieve search suggestions based on partial user inputs)
   Autocomplete components using Vue.js that fetch suggestions from the backend via Apollo Client as users type.
   Utilize Tailwind CSS for styling the suggestion dropdowns, ensuring they are responsive and intuitive.
 
