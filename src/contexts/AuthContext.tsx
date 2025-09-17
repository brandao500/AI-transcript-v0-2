import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type UpdateProfileData = {
  displayName?: string | null;
  photoURL?: string | null;
};

type UserCredential = {
  user: User;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock user data - you can customize this as needed
  const mockUser: User = {
    uid: 'mock-user-123',
    email: 'mock@example.com',
    displayName: 'Mock User',
    photoURL: null,
  };

  const [user, setUser] = useState<User | null>(mockUser);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    // Simulate API call with loading state
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create a user object with the provided email
    const loggedInUser: User = {
      uid: `user-${Date.now()}`,
      email,
      displayName: email.split('@')[0], // Use the part before @ as display name
      photoURL: null,
    };
    
    setUser(loggedInUser);
    setLoading(false);
    return { user: loggedInUser };
  };

  const signUp = async (email: string, password: string): Promise<UserCredential> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(mockUser);
    return { user: mockUser };
  };

  const signOut = async (): Promise<void> => {
    // Simulate sign out with a small delay
    await new Promise(resolve => setTimeout(resolve, 200));
    setUser(null); // This will trigger a re-render and update the UI
  };

  const updateProfile = async (data: UpdateProfileData): Promise<void> => {
    // Simulate profile update
    await new Promise(resolve => setTimeout(resolve, 300));
    if (user) {
      setUser({
        ...user,
        displayName: data.displayName ?? user.displayName,
        photoURL: data.photoURL ?? user.photoURL,
      });
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
