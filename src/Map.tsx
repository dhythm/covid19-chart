import DeckGL from "@deck.gl/react";
import React from "react";
import { StaticMap } from "react-map-gl";

const Map: React.FunctionComponent = () => {
  return (
    <DeckGL viewState={viewState} width={600} height={450}>
      <StaticMap
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );
};

const viewState = {
  longitude: 139.7212733,
  latitude: 35.6606213,
  zoom: 6,
  pitch: 45,
  bearing: 0
};

export default Map;
