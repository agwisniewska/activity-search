import { ApolloServer } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { typeDefs } from "./schema";
import { getSupplier } from "./prismaClient";

const resolvers = {
  Query: {
    supplier: (_: any, { id }: { id: number }) => {
      return getSupplier(id);
    },
  },
  Supplier: {
    __resolveReference(reference: { id: number }) {
      return getSupplier(reference.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4001, host: "0.0.0.0" }).then(({ url }) => {
  console.log(`Supplier service running at ${url}`);
});
