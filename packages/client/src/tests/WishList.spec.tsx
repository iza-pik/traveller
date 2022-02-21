import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { WishList } from '../components/WishList'
import { getCitiesQuery } from '../definitions/cityQuery'

const mocks = [
  {
    request: {
      query: getCitiesQuery,
      variables: { filter: { wishlist: true } },
    },
    result: {
      data: {
        cities: {
          cities: [
            { id: 4, name: 'testCity1', country: 'testCountry1', visited: false, wishlist: true },
            { id: 10, name: 'testCity2', country: 'testCountry2', visited: false, wishlist: true },
          ],
        },
      },
    },
  },
]

describe('<WishList /> component', () => {
  it('renders without error', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WishList />
      </MockedProvider>
    )

    expect(screen.getByText(/Wish list/)).toBeInTheDocument()
  })

  it('returns correct data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <WishList />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/testCity1/)).toBeInTheDocument()
      expect(screen.getByText(/testCity2/)).toBeInTheDocument()
    })
  })
})
