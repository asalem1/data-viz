import React, {useCallback, useEffect, useState} from 'react';
import Papa from 'papaparse';
import './App.css';
import {ResponsiveChoropleth} from '@nivo/geo';
import {Dropdown} from './components/Dropdown';

const CSV_YEARS = ['2015', '2016', '2017', '2018', '2019'] as const;
type Years = typeof CSV_YEARS[number];

function App() {
  const [data, setData] = useState<any>([]);
  const [features, setFeatures] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState<Years>(CSV_YEARS[0]);

  const getFeatures = useCallback(async () => {
    const resp = await fetch(
      'https://raw.githubusercontent.com/plouc/nivo/master/website/src/data/components/geo/world_countries.json'
    ).then((res) => res.json());
    setFeatures(resp.features);
  }, []);

  const getCountryMap = useCallback(() => {
    const countryMap: any = {};
    features.forEach((feature: any) => {
      countryMap[feature.properties.name] = feature.id;
    });
    return countryMap;
  }, [features]);

  const getData = useCallback(async () => {
    try {
      const mappedFeatures = getCountryMap();
      const csv = require(`./db/${selectedYear}.csv`);
      const csvText = await fetch(csv).then((r) => r.text());
      const results = Papa.parse(csvText, {header: true}); // object with { data, errors, meta }
      const rows: any[] = results.data; // array of objects
      const mapData: {id: string; value: number}[] = [];
      rows.forEach((row) => {
        let id = mappedFeatures[row['Country']];
        if (id == null) {
          switch (row['Country']) {
            case 'United States':
              id = 'USA';
              break;
            case 'United Kingdom':
              id = 'GBR';
              break;
          }
        }
        mapData.push({
          id,
          value: Number(row[`Happiness Score`]),
        });
      });
      setData(mapData);
    } catch (error) {
      console.error({error});
    }
  }, [getCountryMap, selectedYear]);

  const handleUpdateYear = (value: Years) => {
    setSelectedYear(value);
  };

  useEffect(() => {
    getFeatures();
    getData();
  }, [getFeatures, getData]);

  return (
    <div>
      <h2 className="app-header__title">Happiness Score - {selectedYear}</h2>
      <div className="app-header__filters">
        <Dropdown
          headers={CSV_YEARS}
          onSelect={handleUpdateYear}
          selected={selectedYear}
        />
      </div>
      <div style={{height: 500, width: '100vw'}}>
        <MyResponsiveChoropleth data={data} features={features} />
      </div>
    </div>
  );
}

interface CountryData {
  id: string;
  value: string | number;
}

interface Feature {
  type: 'Feature';
  properties: {
    name: string;
  };
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][];
  };
  id: string;
}

type Props = {
  data: CountryData[];
  features: Feature[];
};

const MyResponsiveChoropleth: React.FC<Props> = ({data, features}) => (
  <ResponsiveChoropleth
    data={data}
    features={features}
    margin={{top: 0, right: 0, bottom: 0, left: 0}}
    colors="nivo"
    domain={[0, 10]}
    unknownColor="#666666"
    label="properties.name"
    valueFormat=".2s"
    projectionTranslation={[0.5, 0.5]}
    projectionRotation={[0, 0, 0]}
    enableGraticule={true}
    graticuleLineColor="#dddddd"
    borderWidth={0.5}
    borderColor="#152538"
    legends={[
      {
        anchor: 'bottom-left',
        direction: 'column',
        justify: true,
        translateX: 20,
        translateY: -100,
        itemsSpacing: 0,
        itemWidth: 94,
        itemHeight: 18,
        itemDirection: 'left-to-right',
        itemTextColor: '#444444',
        itemOpacity: 0.85,
        symbolSize: 18,
        effects: [
          {
            on: 'hover',
            style: {
              itemTextColor: '#000000',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default App;
