// UI/src/components/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children, onAuthRequired }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If no user, show a message and trigger the auth modal
    onAuthRequired(); // This calls the function to open the modal
    return (
      <h1 style={{ padding: "50px" }}>Please log in to view this page.</h1>
    );
  }

  // If there is a user, render the actual page component
  return children;
};

export default ProtectedRoute;
