import { signOut as authSignOut } from '@react-native-firebase/auth';
import { firebaseAuth } from '@/services/firebase';

export const signOut = async () => {
  await authSignOut(firebaseAuth);
};
