import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

// Define the shape of our Navigation Context
interface NavigationContextProps {
  // Indicates whether the mobile navigation overlay is open
  isMobileNavOpen: boolean;
  // Function to toggle the mobile navigation overlay
  toggleMobileNav: () => void;
  // Stores the current active navigation path (e.g., pathname)
  activePath: string;
  // Allows manual override of the active navigation path if needed
  setActivePath: (path: string) => void;
}

// Create the Navigation Context with an initial null value
const NavigationContext = createContext<NavigationContextProps | null>(null);

interface NavigationProviderProps {
  children: ReactNode;
}

// NavigationProvider wraps its children and provides navigation state
export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string>(location.pathname);

  useEffect(() => {
    // Update activePath based on the current location pathname
    setActivePath(location.pathname);

    // Close the mobile navigation overlay (if open) when route changes
    if (isMobileNavOpen) {
      setIsMobileNavOpen(false);
    }

    // Scroll to top on route change to ensure the user starts at the top of new content
    window.scrollTo(0, 0);
  }, [location, isMobileNavOpen]);

  // Toggles the visibility of the mobile navigation overlay
  const toggleMobileNav = (): void => {
    setIsMobileNavOpen((prev) => !prev);
  };

  return (
    <NavigationContext.Provider
      value={{ isMobileNavOpen, toggleMobileNav, activePath, setActivePath }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to easily access the Navigation Context in child components
export const useNavigation = (): NavigationContextProps => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error(
      "useNavigation must be used within a NavigationProvider"
    );
  }
  return context;
};