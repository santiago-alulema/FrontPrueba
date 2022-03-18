import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
} from "react-google-maps";

const Maps = (props: any) => {
  return (
    <GoogleMap
      defaultCenter={{ lat: props.lati, lng: props.long }}
      defaultZoom={18}
    >
      {<Marker position={{ lat: props.lati, lng: props.long }} />}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Maps));
