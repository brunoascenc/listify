import { PropsWithChildren, useEffect, useState } from 'react';
import { firebaseAuth, listenAuth } from '@/services/firebase';
import { useAuthStore } from '@/store/useAuthStore';
import { getUserProfile } from '@/services/auth/getUserProfile';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [initializing, setInitializing] = useState(true);
  const setAppUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = listenAuth(firebaseAuth, async currentUser => {
      if (currentUser?.email) {
        const profile = await getUserProfile({
          uid: currentUser.uid,
          fallbackEmail: currentUser.email,
        });
        setAppUser(profile);
      } else {
        setAppUser(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, [setAppUser]);

  if (initializing) {
    return null;
  }

  return <>{children}</>;
};
