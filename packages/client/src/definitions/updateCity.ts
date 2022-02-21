import { gql } from '@apollo/client'

export const updateCityMutation = gql`
  mutation UpdateCity($input: CitiesMutationInput) {
    updateCity(input: $input) {
      id
      visited
      wishlist
    }
  }
`
