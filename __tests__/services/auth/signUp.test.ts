import { signUp } from '@/services/auth/signUp';
import { firebaseAuth } from '@/services/firebase';
import {
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { doc, setDoc } from '@react-native-firebase/firestore';
import type {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth');
jest.mock('@react-native-firebase/firestore');

describe('signUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates user and stores profile', async () => {
    const credential = {
      user: {
        uid: 'uid-123',
        email: 'user@example.com',
      },
    } as unknown as FirebaseAuthTypes.UserCredential;

    jest
      .mocked(createUserWithEmailAndPassword)
      .mockResolvedValueOnce(credential);

    const userRef = {
      path: 'users/uid-123',
    } as unknown as FirebaseFirestoreTypes.DocumentReference;

    jest.mocked(doc).mockReturnValue(userRef);

    const result = await signUp({
      name: ' Tester ',
      email: ' user@example.com ',
      password: 'secret',
    });

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      firebaseAuth,
      'user@example.com',
      'secret',
    );

    expect(setDoc).toHaveBeenCalledWith(
      userRef,
      expect.objectContaining({
        name: 'Tester',
        email: 'user@example.com',
      }),
    );

    expect(result).toEqual({
      uid: 'uid-123',
      email: 'user@example.com',
      name: 'Tester',
    });
  });
});
