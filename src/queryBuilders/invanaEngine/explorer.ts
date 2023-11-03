import { gql} from "@apollo/client/core";
// https://github.com/invana/invana-engine/blob/develop/invana_engine/gremlin/vertex.py

export const GET_TEST_CONNECTION_QUERY = gql`
  query {
    get_client_info{
        gremlin_traversal_source
        gremlin_host
    }
  }
`


export const GENERIC_GREMLIN_QUERY = gql`
  query {
    execute_query(gremlin: "g.V().elementMap().limit(5)", timeout: 100)
  }
`
