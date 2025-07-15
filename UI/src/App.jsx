import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Router/AppRouter.jsx";
import NavBar from "./components/NavBar.jsx";
import AuthModal from "./components/AuthModal.jsx";
import "./styles/App.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAuthModal = () => setIsModalOpen(true);
  const closeAuthModal = () => setIsModalOpen(false);

  return (
    // --- 2. Wrap EVERYTHING inside ThemeProvider ---
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <NavBar onProfileClick={openAuthModal} />
            <main className="main-content">
              <AppRoutes onAuthRequired={openAuthModal} />
            </main>
            <AuthModal isOpen={isModalOpen} onClose={closeAuthModal} />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
