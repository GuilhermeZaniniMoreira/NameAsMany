import React, { useState } from 'react';
import { Typography, Input } from 'antd';
import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import { LatLngTuple } from 'leaflet';
import { api } from './services';
import { normalizeCityName } from './helpers';
import { ICity } from './interfaces';
import StatesList from './components/StatesList';
import './App.css';

function App() {

  const { Title } = Typography;
  const { Search } = Input;

  const [cities, setCities] = useState<ICity[]>([]);

  const [cityName, setCityName] = useState('');

  const onSearch = async (value: string) => {
    try {
      const name = normalizeCityName(value);
      const res = await api.get(`/cities?name=${name}`);
      if (!cities.find(city => city.id === res.data.id)) {
        setCities([...cities, res.data]);
      }
    } catch (error) {
      console.error(error);
    };

    setCityName('');
  };

  const defaultLatLng: LatLngTuple = [-15.793889, -53.882778];
  const zoom: number = 4;

  return (
    <React.Fragment>
      <Title
        level={3}
        style={{ textAlign: 'center', marginTop: '1%' }}
      >
        Quizz Municípios Brasileiros
      </Title>
      <div
        style={{ marginLeft: '20%', marginRight: '20%', marginTop: '1.5%' }}
      >
        <Search
          placeholder="Nome do município"
          enterButton="Buscar"
          size="large"
          allowClear
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          onSearch={onSearch}
        />
        <Title
          level={4}
          style={{ textAlign: 'center', marginTop: '1.5%' }}
        >
          Contador: {cities.length}
        </Title>
      </div>
      <div style={{
        width: '100%',
        paddingBottom: '2.5%'
      }}>
        <MapContainer
          id="mapId"
          center={defaultLatLng}
          zoom={zoom}
          scrollWheelZoom={true}
        >
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png'
          />
          {
            cities.map(city => (
              <CircleMarker
                center={[city.lat, city.lng]}
                radius={city.population_min_max_normalization * 50}
              >
                <Popup>{city.name} - {city.state_abbreviation} (População: {city.population.toLocaleString()})</Popup>
              </CircleMarker>
            ))
          }
        </MapContainer>
      </div>
      <StatesList
        cities={cities}
      />
    </React.Fragment>
  );
}

export default App;
