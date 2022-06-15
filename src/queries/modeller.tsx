/*
 * Copyright 2021 Invana
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {gql} from "@apollo/client";


export const GET_SCHEMA_QUERY = gql`
  query {
      get_all_edges_models{
        name
        directed
        unidirected
        multiplicity
        properties{
          name
          cardinality
          type
        }
        link_paths{
          outv_label
          inv_label
        }
      }
      get_all_vertex_models{
        name
        partitioned
        static
        properties{
          name
          cardinality
          type
        }
      }
  }
`
// export const GET_GOD_QUERY = gql`
//   query {
//       god{
//         id
//         label
//         type
//         properties{
//           name
//           age
//         }
//       }
//   }
// `
export const GET_GOD_QUERY = gql`
  query {
    _get_client_info{
        gremlin_traversal_source
        gremlin_host
    }
  }
`
