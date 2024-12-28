import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: 'user', // Could be 'admin' or 'user'
    username: 'John Doe',
    profilePicture: 'https://example.com/profile.jpg',
  });
  const handleLogin = (email) => {
    // Extract the username from the email (before @)
    const username = email.split('@')[0];
    
    // Set role based on the email
    const role = email === 'waris2@gmail.com' ? 'admin' : 'user';

    // Update the user context
    setUser({
      username: username,
      role: role,
      profilePicture: 'https://via.placeholder.com/80', // Replace with actual profile picture if available
    });
  };

  return <UserContext.Provider value={{ user, handleLogin}}>{children}</UserContext.Provider>;
};
