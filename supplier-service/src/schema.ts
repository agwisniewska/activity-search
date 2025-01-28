import { gql } from "apollo-server";

export const typeDefs = gql`
  type Supplier @key(fields: "id") {
    id: Int!
    name: String
    address: String
    zip: String
    city: String
    country: String
  }

  extend type Query {
    supplier(id: Int!): Supplier
  }
`;
