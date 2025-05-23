import React from "react";
import "../styles/businessview.css";
const API_URL = import.meta.env.VITE_API_BASE_URL;

const BusinessView = ({ details }) => {
    return (
        <div className="businessView">
            <h2>Business Details</h2>
            <div>
                <strong>Business Name:</strong>
                <p>{details.BusinessName}</p>
            </div>
            <div>
                <strong>Business Representative:</strong>
                <p>{details.BusinessRepresentative}</p>
            </div>
            <div>
                <strong>Representative Phone:</strong>
                <p>{details.RepresentativePhone}</p>
            </div>
            <div>
                <strong>Business Phone:</strong>
                <p>{details.BusinessPhone}</p>
            </div>
            <div>
                <strong>Location:</strong>
                <p>{details.location}</p>
            </div>
            <div>
                <strong>Visit Time:</strong>
                <p>{new Date(details.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    })}</p>
            </div>
            <div>
                <strong>Business Image:</strong>
                {details.businessImage && (
                    <img
                        src={`${API_URL}/${details.businessImage}`}
                        alt="Business"
                        style={{ maxWidth: "300px", height: "auto" }}
                    />
                )}
            </div>
            <div>
                <strong>Representative Photo:</strong>
                {details.representativePhoto && (
                    <img
                        src={`${API_URL}/${details.representativePhoto}`}
                        alt="Representative"
                        style={{ maxWidth: "300px", height: "auto" }}
                    />
                )}
            </div>
            <div>
                <strong>Selfie Photo:</strong>
                {details.selfiePhoto && (
                    <img
                        src={`${API_URL}/${details.selfiePhoto}`}
                        alt="Selfie"
                        style={{ maxWidth: "300px", height: "auto" }}
                    />
                )}
            </div>
        </div>
    );
};

export default BusinessView;
