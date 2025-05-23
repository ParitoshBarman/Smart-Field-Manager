import React, { useState } from 'react'
import '../styles/home.css'
import { Navbar } from '../components/Navbar'
// import {Testmap} from '../components/Testmap.jsx'
import GeoLocationMap from '../components/GeoLocationMap.jsx'
import { TodaysVisit } from '../components/TodaysVisit.jsx'
import { AddConnection } from '../components/AddConnection.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useEffect } from 'react'

export const HomePage = () => {
  const { fetchBusinessList, BusinessList } = useAuth();

  useEffect(() => {
    fetchBusinessList();
  }, []);

  return (
    <div>
      <Navbar />
      <GeoLocationMap locations={BusinessList.map((ele, indx) => {
        return { lat: ele.location.split(",")[0].trim(), long: ele.location.split(",")[1].trim(), BusinessName:ele.BusinessName, BusinessRepresentative:ele.BusinessRepresentative }
      })} />
      <TodaysVisit title={"Todays Visit"} />
      <AddConnection />
    </div>
  )
}
