import React, { useEffect } from 'react'
import '../styles/todaysvisit.css'
import { TodaysVisitList } from './TodaysVisitList'
import { useAuth } from '../context/AuthContext'

export const TodaysVisit = ({title}) => {
  const {BusinessList} = useAuth();


  return (
    <div className='todaysvisitsec'>
        <h3 style={{color:'black'}}>{title}</h3>
        <TodaysVisitList listItm={BusinessList}/>
    </div>
  )
}
