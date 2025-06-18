import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router/AppRouter";
import NavBar from "./components/NavBar";
import AuthModal from "./components/AuthModal";
import "./App.css";

// 1. Import the AuthProvider
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAuthModal = () => setIsModalOpen(true);
  const closeAuthModal = () => setIsModalOpen(false);

  return (
    // 2. Wrap everything inside AuthProvider
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <NavBar onProfileClick={openAuthModal} />
          <main className="main-content">
            <AppRouter />
          </main>
          {/* Only show the modal if no user is logged in */}
          <AuthModal isOpen={isModalOpen} onClose={closeAuthModal} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
