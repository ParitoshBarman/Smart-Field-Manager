import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

const GeoLocationMap = () => {
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState([28.7111735, 77.1074509]);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      const routingControl = L.Routing.control({
        waypoints: [L.latLng(28.7111735, 77.1074509)],
      }).addTo(map);

      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setMarkerPosition([lat, lng]);

        routingControl.setWaypoints([
          L.latLng(28.7111735, 77.1074509),
          L.latLng(lat, lng),
        ]);
      });
    }
  }, []);

  return (
    <MapContainer
      center={[28.7111735, 77.1074509]}
      zoom={11}
      style={{ height: '100vh', width: '100%' }}
      whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={markerPosition}></Marker>
    </MapContainer>
  );
};

export default GeoLocationMap;
