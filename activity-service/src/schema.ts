import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Activity @key(fields: "id") {
  id: Int!
  title: String
  price: Float
  currency: String
  rating: Float
  specialOffer: Boolean
  supplier: Supplier
}

extend type Supplier @key(fields: "id") {
  id: Int! @external
}

type Query {
  activities(search: String, page: Int, limit: Int): ActivitiesResult
  activity(activityId: Int!): Activity
}

type ActivitiesResult {
  items: [Activity]
  totalCount: Int
  page: Int
  pageSize: Int
}
`;
