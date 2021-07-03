import { MapContainer, TileLayer, Marker } from 'react-leaflet'

type Place = {
  id: string
  name: string
  slug: string
  location: {
    latitude: number
    longitude: number
  }
}

export type MapProps = {
  places?: Place[]
}

const Map = ({ places }: MapProps) => (
  <MapContainer
    center={[-8.3004257, -36.010846]}
    zoom={13}
    style={{ height: '100%', width: '100%' }} //Como o map precisa saber a altura e a largura da página ele não pode ser server side rendering. Então usamos o dynamic do Next
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    {places?.map(({ id, name, location }) => {
      const { latitude, longitude } = location
      return (
        <Marker
          key={`place-${id}`}
          position={[latitude, longitude]}
          title={name}
        />
      )
    })}
  </MapContainer>
)

export default Map
