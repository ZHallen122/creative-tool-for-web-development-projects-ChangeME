import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the user shape interface.
export interface User {
  id: string;
  name: string;
  email: string;
  // Add additional fields as required.
}

// Define the shape for the UserContext.
export interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the UserContext with an undefined default for safety.
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define the props for the UserProvider component.
interface UserProviderProps {
  children: ReactNode;
}

// Implement the UserProvider that wraps its children with UserContext.
export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  // Local state to hold the current user.
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Simulated login function to mimic API call.
  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Simulate network delay.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate API response. If the API returns empty or undefined,
      // we'll fallback to this mock data.
      const simulatedResponse: User = {
        id: Date.now().toString(),
        name: 'John Doe',
        email,
      };

      // Set the user state and mark as authenticated.
      setUser(simulatedResponse);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      // Propagate the error to allow further handling in consuming components.
      throw error;
    }
  };

  // Logout function to clear the user state.
  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Prepare the context value.
  const contextValue: UserContextType = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Custom hook for consuming the UserContext.
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;