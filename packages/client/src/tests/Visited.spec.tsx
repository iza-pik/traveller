import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Visited } from '../components/Visited'
import { getCitiesQuery } from '../definitions/cityQuery'

const mocks = [
  {
    request: {
      query: getCitiesQuery,
      variables: { filter: { visited: true } },
    },
    result: {
      data: {
        cities: {
          cities: [
            { id: 4, name: 'testCity1', country: 'testCountry1', visited: true, wishlist: false },
            { id: 10, name: 'testCity2', country: 'testCountry2', visited: true, wishlist: false },
          ],
        },
      },
    },
  },
]

describe('<Visited /> component', () => {
  it('renders without error', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Visited />
      </MockedProvider>
    )

    expect(screen.getByText(/Visited/)).toBeInTheDocument()
  })

  it('returns correct data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Visited />
      </MockedProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/testCity1/)).toBeInTheDocument()
      expect(screen.getByText(/testCity2/)).toBeInTheDocument()
    })
  })
})
