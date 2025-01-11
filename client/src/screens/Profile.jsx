import React, { useEffect, useState } from 'react';
import { Sidebar } from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { getUserInfo } from '../api/authApi';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        // Check if userId or token is missing
        if (!userId || !token) {
          throw new Error("User ID or token is missing.");
        }

        // Call the API to get user information
        const userInfo = await getUserInfo(userId, token);

        // Log and verify the structure
        console.log("API Response:", userInfo);

        // Validate that the userInfo has the necessary fields
        if (userInfo && userInfo._id) {
          setProfile(userInfo);  // Set the profile with the user data directly
        } else {
          throw new Error("User data is empty or invalid.");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
        setProfile(null);  // Set profile to null in case of error
      } finally {
        setLoading(false);  // Ensure loading is set to false once the API call finishes
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="bg-black px-2 md:px-2 flex flex-col md:flex-row  py-8 gap-4 text-white">
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && profile && (
        <>
          <div className="w-full h-auto md:w-1/6">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
      {!loading && !profile && (
        <div className="w-full h-full flex items-center justify-center">
          <p>Error: Unable to load profile information.</p>
        </div>
      )}
    </div>
  );
};
