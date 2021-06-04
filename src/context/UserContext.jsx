import React, { useState } from "react";

export const UserStoreContext = React.createContext();

const UserStoreProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const userStore = {
    profile: profile,
    updateProfile: (profile) => setProfile(profile),
  };
  return (
    <UserStoreContext.Provider value={userStore}>
      {children}
    </UserStoreContext.Provider>
  );
};

export default UserStoreProvider;
