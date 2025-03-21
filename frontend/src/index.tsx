import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import { NavigationProvider } from "./contexts/navigationContext";
import Home from "./pages/home";
import ProjectCreation from "./pages/projectCreation";
import ProjectDashboard from "./pages/projectDashboard";
import Header from "./components/header";
import Footer from "./components/footer";

// Fallback component for undefined routes
const NotFound: React.FC = () => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-white text-[#34495e] p-4">
    <h1 className="text-4xl md:text-5xl font-arial-sans-serif font-semibold mb-4">
      404 - Page Not Found
    </h1>
    <p className="text-base md:text-lg font-helvetica-sans-serif mb-6">
      The page you are looking for does not exist.
    </p>
    <a
      href="/"
      className="text-[#3498db] hover:underline font-helvetica-sans-serif text-base md:text-lg"
    >
      Go to Home
    </a>
  </div>
);

// Main Application Component with global providers and layout
const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <NavigationProvider>
          <div className="min-h-screen flex flex-col bg-white">
            {/* Global Header */}
            <Header />

            {/* Main content area for routed pages */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-project" element={<ProjectCreation />} />
                <Route path="/dashboard" element={<ProjectDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </NavigationProvider>
      </UserProvider>
    </Router>
  );
};

// Mount the application to the DOM
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}