import { createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import { firebaseAuth, db } from '@/services/firebase';
import { AppUser } from '@/types/user';
import { doc, setDoc } from '@react-native-firebase/firestore';

type SignUpArgs = {
  name: string;
  email: string;
  password: string;
};

export const signUp = async ({ name, email, password }: SignUpArgs): Promise<AppUser> => {
  const trimmedEmail = email.trim();
  const trimmedName = name.trim();

  const cred = await createUserWithEmailAndPassword(firebaseAuth, trimmedEmail, password);

  const userRef = doc(db, 'users', cred.user.uid);
  await setDoc(userRef, {
    name: trimmedName,
    email: trimmedEmail,
    createdAt: new Date(),
  });

  return {
    uid: cred.user.uid,
    email: trimmedEmail,
    name: trimmedName,
  };
};
