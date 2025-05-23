import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import GeoLocationMap from '../components/GeoLocationMap'
import BusinessView from '../components/BusinessView'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const BusinessViewPage = () => {
  const { token } = useAuth();
  const { business_id } = useParams();
  const [businessDetails, setbusinessDetails] = useState(null);
  // http://127.0.0.1:5000/api/contact/678b44500502eaac38fe8260
    const businessDetails2 = {
      BusinessName: "Tech Innovations Inc.",
      BusinessRepresentative: "John Doe",
      RepresentativePhone: "+1-234-567-8901",
      BusinessPhone: "+1-987-654-3210",
      location: "37.7749, -122.4194", // Latitude and Longitude (San Francisco)
      businessImage: new File([""], "business-image.jpg", { type: "image/jpeg" }),
      representativePhoto: new File([""], "representative-photo.jpg", { type: "image/jpeg" }),
      selfiePhoto: new File([""], "selfie-photo.jpg", { type: "image/jpeg" }),
  };

  const fetchBusinessDetails = async () => {

    try {
      const res = await axios.get(`${API_URL}/api/contact/${business_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setbusinessDetails(res.data.data);

    }
    catch (error) {
      console.error("Failed to fetch profile", error);
    }
  }

  useEffect(() => {
    fetchBusinessDetails();
  }, [])

  if(!businessDetails){
    return <h1>Loading...</h1>
  }

  // let businessLocation = {lat:businessDetails.location.split(",")[0].trim(), long:businessDetails.location.split(",")[1].trim()}
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <MapContainer
          style={{
            height: "50vh",
            width: "1100px",
          }}
          center={[businessDetails.location.split(",")[0].trim(), businessDetails.location.split(",")[1].trim()]}
          zoom={15}
        >
          {/* add google map tile url  */}
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />


          <Marker position={[businessDetails.location.split(",")[0].trim(), businessDetails.location.split(",")[1].trim()]}>
            <Popup>
              {businessDetails.BusinessName} <br /> {businessDetails.BusinessRepresentative}
            </Popup>
          </Marker>



        </MapContainer>

      </div>
      {/* <GeoLocationMap locations={{lat:28.723348423857004, long:77.12253418939636}}/> */}
        <BusinessView details={businessDetails}/>
    </div>
  )
}
