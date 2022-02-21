import { Fragment, useState } from 'react'
import type { FC, ChangeEvent, KeyboardEvent } from 'react'
import {
  Container,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  VStack,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useMutation, useLazyQuery } from '@apollo/client'
import { getCitiesQuery } from '../definitions/cityQuery'
import { updateCityMutation } from '../definitions/updateCity'
import type { ICities } from '../interfaces/cities.interface'
import { Checkbox } from '@chakra-ui/react'

export const Home: FC = () => {
  const [city, setCity] = useState('')
  const [getCities, { data, loading }] = useLazyQuery(getCitiesQuery)
  const [updateCity] = useMutation(updateCityMutation)
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setCity(event.target.value)

  const handleClick = () => {
    if (city) {
      getCities({ variables: { filter: { name: city } } })
    }
  }

  const handleInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && handleClick()
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
            placeholder="City"
            data-testid="city-input"
          />
          <InputRightElement
            onClick={handleClick}
            children={
              <IconButton data-testid="search-icon-button" aria-label="Search city" size="sm" icon={<Search2Icon />} />
            }
          />
        </InputGroup>
        <List marginTop={4}>
          {loading && <Spinner />}
          {data &&
            data.cities.cities.map((city: ICities) => (
              <Fragment key={city.id}>
                <ListItem>
                  {city.name}
                  <Checkbox
                    marginLeft={8}
                    defaultChecked={false}
                    isChecked={city.visited}
                    onChange={() => {
                      updateCity({
                        variables: { input: { id: city.id, visited: !city.visited } },
                        onCompleted: () => {
                          // TODO: show success toast message
                        },
                        onError: err => {
                          // TODO: display error
                          console.error(`Failed to update visited state for ${city.name} with error: ${err}`)
                        },
                      })
                    }}
                  >
                    Visited
                  </Checkbox>
                  <Checkbox
                    marginLeft={8}
                    defaultChecked={false}
                    isChecked={city.wishlist}
                    onChange={() => {
                      updateCity({
                        variables: { input: { id: city.id, wishlist: !city.wishlist } },
                        onCompleted: () => {
                          // TODO: show success toast message
                        },
                        onError: err => {
                          // TODO: display error
                          console.error(`Failed to update visited state for ${city.name} with error: ${err}`)
                        },
                      })
                    }}
                  >
                    Wish list
                  </Checkbox>
                </ListItem>
              </Fragment>
            ))}
        </List>
      </Container>
    </VStack>
  )
}
