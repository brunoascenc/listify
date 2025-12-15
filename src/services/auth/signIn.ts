import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { firebaseAuth, db } from '@/services/firebase';
import { AppUser } from '@/types/user';
import { doc, getDoc } from '@react-native-firebase/firestore';

type SignInArgs = {
  email: string;
  password: string;
};

export const signIn = async ({ email, password }: SignInArgs): Promise<AppUser> => {
  const trimmedEmail = email.trim();

  const cred = await signInWithEmailAndPassword(firebaseAuth, trimmedEmail, password);

  const userDoc = await getDoc(doc(db, 'users', cred.user.uid));
  const data = userDoc.data();

  return {
    uid: cred.user.uid,
    email: cred.user.email ?? trimmedEmail,
    name: data?.name ?? cred.user.email ?? trimmedEmail,
  };
};
