import { Fragment } from 'react'
import type { FC } from 'react'
import { Container, Heading, List, ListItem, Spinner } from '@chakra-ui/react'
import { useQuery } from '@apollo/client'
import { getCitiesQuery } from '../definitions/cityQuery'
import type { ICities } from '../interfaces/cities.interface'

export const WishList: FC = () => {
  const initialArgs = { filter: { wishlist: true } }

  const { data, loading } = useQuery(getCitiesQuery, { variables: initialArgs, fetchPolicy: 'network-only' })

  return (
    <Fragment>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="column">
        <List marginTop={4}>
          {loading && <Spinner />}
          {data &&
            data.cities.cities.map((city: ICities) => (
              <Fragment key={city.id}>
                <ListItem>{city.name}</ListItem>
              </Fragment>
            ))}
        </List>
      </Container>
    </Fragment>
  )
}
