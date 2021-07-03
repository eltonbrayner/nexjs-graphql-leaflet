import { render, screen } from '@testing-library/react'
import Map from '.'

describe('<Map />', () => {
  it('should render without any marker', () => {
    render(<Map />)

    expect(
      screen.getByRole('link', { name: /openstreetmap/i })
    ).toBeInTheDocument()
  })

  it('should render with the market in correct place', () => {
    const place = {
      id: '1',
      name: 'caruaru',
      slug: 'caruaru',
      location: {
        latitude: -9.3004257,
        longitude: -36.010846
      }
    }

    const recife = {
      id: '2',
      name: 'recife',
      slug: 'recife',
      location: {
        latitude: -8.3004257,
        longitude: -36.010846
      }
    }

    render(<Map places={[place, recife]} />)

    expect(screen.getByTitle(/caruaru/i)).toBeInTheDocument()
    expect(screen.getByTitle(/recife/i)).toBeInTheDocument()
  })
})
