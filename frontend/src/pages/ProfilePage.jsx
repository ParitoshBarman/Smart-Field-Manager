import React, { useState, useEffect } from "react";
// import axios from "../services/apiService";
import { Navbar } from "../components/Navbar";

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        username: "John Doe",
        email: "johndoe@example.com",
        role: "Sales Executive",
        location: "",
        recentActivities: [],
    });

    const [loading, setLoading] = useState(false);

    // Fetch location dynamically
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setProfile((prev) => ({
                        ...prev,
                        location: `Latitude: ${latitude}, Longitude: ${longitude}`,
                    }));
                },
                () => {
                    alert("Unable to fetch location");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
        }
    }, []);

    // Fetch recent activities from the backend
    useEffect(() => {
        // const fetchActivities = async () => {
        //   try {
        //     const response = await axios.get("/sales-executive/activities");
        //     setProfile((prev) => ({
        //       ...prev,
        //       recentActivities: response.data.activities || [],
        //     }));
        //   } catch (error) {
        //     console.error("Error fetching activities:", error);
        //   } finally {
        //     setLoading(false);
        //   }
        // };

        // fetchActivities();
    }, []);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    return (<>
        <Navbar />
        <div style={styles.container}>
            <div style={styles.profileCard}>
                <h2>Profile</h2>
                <p>
                    <strong>Username:</strong> {profile.username}
                </p>
                <p>
                    <strong>Email:</strong> {profile.email}
                </p>
                <p>
                    <strong>Role:</strong> {profile.role}
                </p>
                <p>
                    <strong>Location:</strong> {profile.location || "Fetching location..."}
                </p>
            </div>

            <div style={styles.activities}>
                <h3>Recent Activities</h3>
                {profile.recentActivities.length > 0 ? (
                    <ul>
                        {profile.recentActivities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No recent activities.</p>
                )}
            </div>
        </div>
    </>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
    },
    profileCard: {
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "20px",
        backgroundColor: "#fff",
    },
    activities: {
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
    },
};

export default ProfilePage;
