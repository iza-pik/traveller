import { gql } from '@apollo/client'

export const getCitiesQuery = gql`
  query Cities($filter: CitiesFilters) {
    cities(filter: $filter) {
      cities {
        id
        name
        country
        visited
        wishlist
      }
    }
  }
`
