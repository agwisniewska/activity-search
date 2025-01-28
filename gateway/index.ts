import { ApolloServer } from 'apollo-server';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

(async () => {

  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'activityservice', url: 'http://activityservice:4002/' }, // Activity subgraph
        { name: 'supplierservice', url: 'http://supplierservice:4001/' }, // Supplier subgraph
      ],
    })
  });

  const server = new ApolloServer({
    gateway,
    introspection: true, 
  });

  server.listen({ port: 4000, host: '0.0.0.0' }).then(({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
  });
})();


