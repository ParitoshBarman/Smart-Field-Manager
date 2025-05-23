import { useState } from "react";
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import L from 'leaflet';
import customeIcon from '../assets/marker-icon2.png'


import { useAuth } from "../context/AuthContext";


function GeoLocationMap({ locations }) {
  const customIcon = new L.Icon({
  iconUrl: customeIcon,
  iconSize: [32, 45], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which corresponds to marker's location
  popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
});

  const { mapCenterForMult } = useAuth();

  const getCenter = (locations) => {
    if (locations.length === 0) return null;

    let sumLat = 0, sumLng = 0;
    locations.forEach(([lat, lng]) => {
      sumLat += lat;
      sumLng += lng;
    });

    return [sumLat / locations.length, sumLng / locations.length];
  };

  function getCommonCenter() {
    if (locations.length > 0) {
      let sumLat = 0, sumLng = 0;
      locations.forEach((ele) => {
        // console.log(ele.lat)
        sumLat += parseFloat(ele.lat);
        sumLng += parseFloat(ele.long);
      })
      return [sumLat / locations.length, sumLng / locations.length]

    } else {
      return [0, 0]
    }
  }


  return (
    <div style={{ display: "flex" }}>

      {locations.length > 0 ? <>
        <MapContainer
          style={{
            height: "50vh",
            width: "1100px",
          }}
          center={getCommonCenter()}
          zoom={10}
        >
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />

          {locations.map((location, index) => {
            return (
              <Marker position={[location.lat, location.long]} key={index} icon={customIcon}>
                <Popup>
                  {location.BusinessName} <br /> {location.BusinessRepresentative}
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>

      </> : <h1>No locations found...</h1>}


    </div>
  );
}

export default GeoLocationMap;
