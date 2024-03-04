import React, { useState, useEffect } from 'react';
import './style.css';
import { fetchData } from './service.js';

export default function App() {
  // const dataContext = createContext('Data')
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getAll() {
      const response = await fetchData('https://swapi.dev/api/people/');

      let list = [];

      for (let person of response.results) {
        const filmTitles = await Promise.all(
          person.films?.map(async (fimlUrl) => {
            const film = await fetchData(fimlUrl);
            return film.title;
          })
        );

        const vehicleTitles = await Promise.all(
          person.vehicles?.map(async (vehUrl) => {
            const vehicle = await fetchData(vehUrl);
            return vehicle.name;
          })
        );

        list.push({
          name: person.name,
          films: filmTitles?.length ? filmTitles.join(',') : '',
          vehicles: vehicleTitles?.length ? vehicleTitles.join(',') : '',
        });
      }

      setData(list);
    }
    getAll();
  }, []);
  return (
    <div>
      <h1>Star Wars</h1>
      <table style={{ 'border-collapse': 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Movies</th>
            <th>Vehicles</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid' }}>{row.name}</td>
              <td style={{ border: '1px solid' }}>{row.films}</td>
              <td style={{ border: '1px solid' }}>{row.vehicles}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
