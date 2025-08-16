import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import {onError} from "@apollo/client/link/error";

const MAGENTO_GRAPHQL_URI = process.env.MAGENTO_URI;
  let acessToken = null;
  if (typeof window !== "undefined") {
    acessToken = localStorage.getItem("customer_token");
  }
const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: MAGENTO_GRAPHQL_URI,
    headers: {
      Authorization: `Bearer ${acessToken}`
    }
  }),
  cache: new InMemoryCache()
})

export default apolloClient;