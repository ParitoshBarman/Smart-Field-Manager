import React from 'react'
import { Navbar } from '../components/Navbar'
import { AllVisits } from '../components/AllVisits'


export const ConnectionListPage = () => {
  return (
    <div>
        <Navbar/>
        <AllVisits title={"All Connections"}/>
    </div>
  )
}
