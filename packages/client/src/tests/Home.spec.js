import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { Home } from '../components/Home'
import { getCitiesQuery } from '../definitions/cityQuery'
import userEvent from '@testing-library/user-event'

const mocks = [
  {
    request: {
      query: getCitiesQuery,
      variables: { filter: { name: 'testCity' } },
    },
    result: {
      data: {
        cities: { cities: [{ id: 4, name: 'testCity', country: 'testCountry', visited: true, wishlist: false }] },
      },
    },
  },
]

describe('<Home /> component', () => {
  it('renders without error', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    expect(screen.getByText(/Smart traveller/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/City/)).toBeInTheDocument()
  })

  it('returns correct data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    )

    userEvent.type(screen.getByTestId('city-input'), 'testCity')
    fireEvent.click(screen.getByTestId('search-icon-button'))

    await waitFor(() => {
      expect(screen.getByText(/testCity/)).toBeInTheDocument()
    })
  })
})
