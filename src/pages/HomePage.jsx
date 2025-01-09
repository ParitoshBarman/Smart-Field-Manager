import React from 'react'
import '../styles/home.css'
import { Navbar } from '../components/Navbar'
// import {Testmap} from '../components/Testmap.jsx'
import GeoLocationMap from '../components/GeoLocationMap.jsx'

export const HomePage = () => {
  return (
    <div>
      <GeoLocationMap/>
    </div>
  )
}
