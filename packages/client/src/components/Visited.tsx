import { Fragment } from 'react'
import type { FC } from 'react'
import { Container, Heading, List, ListItem, Spinner } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useQuery } from '@apollo/client'
import { getCitiesQuery } from '../definitions/cityQuery'
import type { ICities } from '../interfaces/cities.interface'

export const Visited: FC = () => {
  const initialArgs = { filter: { visited: true } }

  const { data, loading } = useQuery(getCitiesQuery, { variables: initialArgs, fetchPolicy: 'network-only' })

  return (
    <Fragment>
      <Heading as="h1" color="green">
        Visited
      </Heading>
      <Container centerContent maxW="container.md" flexDir="column">
        <List marginTop={4}>
          {loading && <Spinner emptyColor="green.200" />}
          {data &&
            data.cities.cities.map((city: ICities) => (
              <Fragment key={city.id}>
                <ListItem textAlign="left">
                  <CheckCircleIcon color="green" marginRight={6} marginBottom={1} />
                  {city.name}
                </ListItem>
              </Fragment>
            ))}
        </List>
      </Container>
    </Fragment>
  )
}
