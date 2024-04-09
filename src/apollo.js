import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink
  } from "@apollo/client";
import {setContext} from '@apollo/client/link/context';
  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    const patient_token = localStorage.getItem('patient_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ""
      }
    }
  });
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
export default client;