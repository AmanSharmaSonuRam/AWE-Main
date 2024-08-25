import { schema } from './../../GraphQl/pothos/schema';
import { createYoga } from "graphql-yoga";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default createYoga({
    schema,
    graphqlEndpoint: "/api/graphqltwo", // Customize the endpoint if needed
    graphiql: true, // Enable GraphiQL interface
    cors: {
        origin: '*', // Replace with specific origins if needed
        credentials: true,
    },
});
