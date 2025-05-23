import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const TodaysVisitList = ({ listItm }) => {

  return (
    <ul>
      {listItm.map((element, index) => {
        return (
          <li key={element._id}>
            <div>
              <div>
                <a href={`/businessview/${element._id}`}>
                  <div className="shopprofilephoto">
                    <img src={element.representativePhoto?`${API_URL}/${element.representativePhoto}`:"https://static.infragistics.com/xplatform/images/avatars/8.jpg"} alt="" />
                  </div>
                  <div className="shopactiondata">
                    <h4>{element.BusinessRepresentative}</h4>
                    <p>{element.RepresentativePhone}</p>
                  </div>
                </a>
              </div>
              <div className="shopaction">
                <a href={`https://wa.me/${element.RepresentativePhone}?text=Hi`}>Text</a>
                <a href={`tel:${element.RepresentativePhone}`}>Call</a>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
