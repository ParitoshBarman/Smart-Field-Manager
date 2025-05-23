import React, { useState, useEffect } from "react";
// import CameraCapture from "./CameraCapture";
// import axios from "../services/apiService";
import "../styles/businesscontactform.css"
import axios from "axios";
import { useAuth } from "../context/AuthContext";

let cameraStyle = {
    mandatory: {
        width: { min: 640 },
        height: { min: 480 }
      },
        optional: [
      { width: 650 },
      { width: { min: 650 }},
      { frameRate: 60 },
      { width: { max: 800 }},
      { facingMode: "user" }
        ]
      }    


const ContactForm = () => {
    const {uploadFormData} = useAuth()
    const [formData, setFormData] = useState({
        // Assume logged-in username
        BusinessName: "",
        BusinessRepresentative: "",
        RepresentativePhone: "",
        BusinessPhone: "",
        location: "",
        businessImage: null,
        representativePhoto: null,
        selfiePhoto: null,
    });
    const [message, setMessage] = useState("");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setFormData((prev) => ({
                        ...prev,
                        location: `${latitude}, ${longitude}`,
                    }));
                },
                () => {
                    alert("Unable to fetch location");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
        }
    }

    // Fetch location
    useEffect(() => {
        getLocation();
    }, []);

    // Handle file input
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    };

    function handelchange(e){
        let inputName = e.target.name
        setFormData({...formData, [inputName]:e.target.value})
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        // formDataObj.append("username", formData.username);
        formDataObj.append("location", formData.location);
        formDataObj.append("businessImage", formData.businessImage);
        formDataObj.append("representativePhoto", formData.representativePhoto);
        formDataObj.append("selfiePhoto", formData.selfiePhoto);
        formDataObj.append("BusinessName", formData.BusinessName);
        formDataObj.append("BusinessRepresentative", formData.BusinessRepresentative);
        formDataObj.append("RepresentativePhone", formData.RepresentativePhone);
        formDataObj.append("BusinessPhone", formData.BusinessPhone);
        
        uploadFormData(formDataObj)

        // try {
        //   const response = await axios.post("http://localhost:5000/api/contact/submit", formDataObj);
        //   console.log(response.data)
        //   setMessage(response.data.message || "Form submitted successfully!");
        // } catch (error) {
        //     console.log(error)
        //   setMessage(error.response?.data?.message || "Error submitting form.");
        // }
    };

    if (message){
        return (
            <div>
                <h1>Successfully Submited</h1>
            </div>
        )
    }

    return (
        <div className="businesscontactForm">
            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit} style={{backgroundColor:'#fffcf6'}}>

                <div>
                    <label>Business Name:</label>
                    <input type="text" name="BusinessName" value={formData.BusinessName} onChange={handelchange} />
                </div>
                <div>
                    <label>Business Representative Name:</label>
                    <input type="text" name="BusinessRepresentative" value={formData.BusinessRepresentative} onChange={handelchange}/>
                </div>
                <div>
                    <label>Representative Phone:</label>
                    <input type="text" name="RepresentativePhone" value={formData.RepresentativePhone} onChange={handelchange}/>
                </div>
                <div>
                    <label>Business Phone:</label>
                    <input type="text" name="BusinessPhone" value={formData.BusinessPhone} onChange={handelchange}/>
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" readOnly name="location" value={formData.location} onChange={handelchange}/>
                </div>
                <div>
                    <label>Business Image:</label>
                    {/* <input type="file" name="businessImage" onChange={handleFileChange} accept="image/*" /> */}
                    <input type="file" id="imageFile" name="businessImage" capture="user" accept="image/*" onChange={handleFileChange}/>
                </div>
                <div>
                    <label>Representative Photo:</label>
                    {/* <input type="file" name="representativePhoto" onChange={handleFileChange} accept="image/*" /> */}
                    <input type="file" id="imageFile" name="representativePhoto" capture="user" accept="image/*" onChange={handleFileChange}/>
                </div>
                <div>
                    <label>Selfie Photo:</label>
                    {/* <input type="file" name="selfiePhoto" onChange={handleFileChange} accept="image/*" /> */}
                    <input type="file" id="selfiePhoto" name="selfiePhoto" capture="user" accept="image/*" onChange={handleFileChange}/>
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}

            {/* <CameraCapture /> */}
        </div>
    );
};

export default ContactForm;
