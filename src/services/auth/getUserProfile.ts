import { db } from '@/services/firebase';
import { AppUser } from '@/types/user';
import { doc, getDoc } from '@react-native-firebase/firestore';

type GetUserProfileArgs = {
  uid: string;
  fallbackEmail?: string;
};

export const getUserProfile = async ({
  uid,
  fallbackEmail,
}: GetUserProfileArgs): Promise<AppUser | null> => {
  const snapshot = await getDoc(doc(db, 'users', uid));

  if (!snapshot.exists) {
    return fallbackEmail
      ? { uid, email: fallbackEmail, name: 'Sem nome' }
      : null;
  }

  const data = snapshot.data();
  if (!data) {
    return fallbackEmail
      ? { uid, email: fallbackEmail, name: 'Sem nome' }
      : null;
  }

  return {
    uid,
    email: (data.email as string | undefined) ?? fallbackEmail ?? '',
    name: (data.name as string | undefined) ?? 'Sem nome',
  };
};
