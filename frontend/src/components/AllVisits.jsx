import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const AllVisits = () => {
    const {token} = useAuth();
    const [businessList, setbusinessList] = useState();
    const [error, setError] = useState(true);
    const navigate = useNavigate();

    const fetchBusinessList = async ()=>{
        try {
            const res = await axios.get(`${API_URL}/api/contact/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });            
            setbusinessList(res.data);
            setError(false);

        }
        catch (error) {
            console.error("Failed to fetch profile", error);
            setError(true);
            if(error.response.data.message=="Invalid token"){
                navigate("/login");
            }
        }
    }

    useEffect(()=>{
        fetchBusinessList();
    }, []);

    if(error){
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className='todaysvisitsec'>
            <h3>All Connections</h3>
            <ul>
                {businessList && businessList.map((element, index) => {
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
                                    <a href="tel:9091467852">Text</a>
                                    <a href={`tel:${element.RepresentativePhone}`}>Call</a>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}
