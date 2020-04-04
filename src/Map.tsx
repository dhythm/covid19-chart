import { GeoJsonLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import React, { useEffect, useState } from "react";
import { StaticMap } from "react-map-gl";
import { feature } from "topojson-client";
import japanPrefectures from "./assets/japan-prefecture.json";

interface Case {
  npatients: number;
  ncurrentpatients: number;
  nexits: number;
  ndeaths: number;
}

interface AreaCase extends Case {
  name: string;
  name_jp: string;
}

interface Data extends Case {
  srcurl_pdf: string;
  srcurl_web: string;
  description: string;
  lastUpdate: string;
  area: AreaCase[];
}

const Map: React.FunctionComponent = () => {
  const [cases, setCases] = useState<Data>(null);

  useEffect(() => {
    fetch("https://www.stopcovid19.jp/data/covid19japan.json")
      .then(response => response.json())
      .then(data => setCases(data));
  }, []);

  const prefectures = feature(
    japanPrefectures,
    japanPrefectures.objects.prefectures
  ).features?.map(v => ({
    name: v.properties.woe_name,
    latitude: v.properties.latitude,
    longitude: v.properties.longitude
  }));

  /**
   * {
   *   "type": "Feature",
   *   "geometry": {
   *     "type": "Point",
   *     "coordinates": [125.6, 10.1]
   *   },
   *   "properties": {
   *     "name": "Dinagat Islands"
   *   }
   * }
   */
  const data = cases?.area.map(v => {
    const { latitude, longitude } =
      prefectures.find(p => p.name === v.name) || {};
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
      properties: {
        name: v.name,
        confirmed: v.npatients
      }
    };
  });

  const layers = [
    new GeoJsonLayer({
      id: "point_layer",
      data,
      getRadius: d =>
        d.properties.confirmed ? d.properties.confirmed * 100 + 10000 : 0,
      getFillColor: d => [245, 36, 36, 150],
      pickable: true
    })
  ];

  return (
    <DeckGL viewState={viewState} layers={layers} width={600} height={450}>
      <StaticMap
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );
};

const viewState = {
  longitude: 139.7212733,
  latitude: 35.6606213,
  zoom: 4,
  pitch: 45,
  bearing: 0
};

export default Map;
