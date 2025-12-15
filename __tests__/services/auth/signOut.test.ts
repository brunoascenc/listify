import { signOut } from '@/services/auth/signOut';
import { firebaseAuth } from '@/services/firebase';
import { signOut as authSignOut } from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/auth');

describe('signOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls firebase auth signOut with current auth instance', async () => {
    await signOut();
    expect(authSignOut).toHaveBeenCalledWith(firebaseAuth);
  });
});
