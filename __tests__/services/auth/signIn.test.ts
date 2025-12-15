import { signIn } from '@/services/auth/signIn';
import { firebaseAuth } from '@/services/firebase';
import {
  signInWithEmailAndPassword,
  FirebaseAuthTypes,
} from '@react-native-firebase/auth';
import { doc, getDoc } from '@react-native-firebase/firestore';
import type {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

jest.mock('@react-native-firebase/auth');
jest.mock('@react-native-firebase/firestore');

describe('signIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firebaseAuth.currentUser = {
      uid: 'uid-1',
      email: 'user@example.com',
    } as FirebaseAuthTypes.User;
  });

  it('trims email and returns mapped user with profile name', async () => {
    const credential = {
      user: {
        uid: 'uid-1',
        email: 'user@example.com',
      },
    } as unknown as FirebaseAuthTypes.UserCredential;

    jest
      .mocked(signInWithEmailAndPassword)
      .mockResolvedValueOnce(credential);

    const userRef = {
      path: 'users/uid-1',
    } as unknown as FirebaseFirestoreTypes.DocumentReference;

    jest.mocked(doc).mockReturnValue(userRef);

    const snapshot = {
      data: () => ({ name: 'Tester' }),
    } as unknown as FirebaseFirestoreTypes.DocumentSnapshot;

    jest.mocked(getDoc).mockResolvedValueOnce(snapshot);

    const result = await signIn({
      email: '  user@example.com  ',
      password: 'pw',
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      firebaseAuth,
      'user@example.com',
      'pw',
    );

    expect(result).toEqual({
      uid: 'uid-1',
      email: 'user@example.com',
      name: 'Tester',
    });
  });

  it('falls back to email when profile is empty', async () => {
    const credential = {
      user: {
        uid: 'uid-2',
        email: null,
      },
    } as unknown as FirebaseAuthTypes.UserCredential;

    jest
      .mocked(signInWithEmailAndPassword)
      .mockResolvedValueOnce(credential);

    const userRef = {
      path: 'users/uid-2',
    } as unknown as FirebaseFirestoreTypes.DocumentReference;

    jest.mocked(doc).mockReturnValue(userRef);

    const snapshot = {
      data: () => null,
    } as unknown as FirebaseFirestoreTypes.DocumentSnapshot;

    jest.mocked(getDoc).mockResolvedValueOnce(snapshot);

    const result = await signIn({
      email: 'noemail@example.com',
      password: 'pw',
    });

    expect(result).toEqual({
      uid: 'uid-2',
      email: 'noemail@example.com',
      name: 'noemail@example.com',
    });
  });
});
