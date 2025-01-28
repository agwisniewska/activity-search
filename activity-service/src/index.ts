import { ApolloServer } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { typeDefs } from './schema';
import { getActivities, getActivity } from './prismaClient';

const resolvers = {
  Query: {
    activities: async (
      _: any,
      args: { search: string; page: number; limit: number }
    ) => {
      const { search = "", page = 1, limit = 12 } = args;
      const filteredActivities = await getActivities(search);
      const totalCount = filteredActivities.length;

      const startIndex = (page - 1) * limit;
      const items = filteredActivities.slice(startIndex, startIndex + limit);

      return {
        items,
        totalCount,
        page,
        pageSize: limit,
      };
    },

    activity: (_: any, { activityId }: { activityId: string }) => {
      return getActivity(activityId)
    },
  },
  Activity: {
    supplier: (activity: any) => {
      return { __typename: 'Supplier', id: activity.supplierId };
    },
  },
};
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: 4002, host: '0.0.0.0' }).then(({ url }) => {
  console.log(`Activity service running at ${url}`);
});
