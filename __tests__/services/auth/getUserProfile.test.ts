import { getUserProfile } from '@/services/auth/getUserProfile';
import { db } from '@/services/firebase';
import { doc, getDoc } from '@react-native-firebase/firestore';

jest.mock('@react-native-firebase/firestore');

describe('getUserProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when doc missing and no fallback', async () => {
    jest.mocked(doc as unknown as jest.Mock).mockReturnValue({ path: 'users/uid-1' });
    jest.mocked(getDoc as unknown as jest.Mock).mockResolvedValueOnce({
      exists: false,
    });

    const result = await getUserProfile({ uid: 'uid-1' });
    expect(result).toBeNull();
  });

  it('returns fallback when doc missing', async () => {
    jest.mocked(doc as unknown as jest.Mock).mockReturnValue({ path: 'users/uid-1' });
    jest.mocked(getDoc as unknown as jest.Mock).mockResolvedValueOnce({
      exists: false,
    });

    const result = await getUserProfile({
      uid: 'uid-1',
      fallbackEmail: 'fallback@example.com',
    });
    expect(result).toEqual({
      uid: 'uid-1',
      email: 'fallback@example.com',
      name: 'Sem nome',
    });
  });

  it('returns profile data when exists', async () => {
    jest.mocked(doc as unknown as jest.Mock).mockReturnValue({ path: 'users/uid-2' });
    jest.mocked(getDoc as unknown as jest.Mock).mockResolvedValueOnce({
      exists: true,
      data: () => ({ email: 'user@example.com', name: 'User' }),
    });

    const result = await getUserProfile({
      uid: 'uid-2',
      fallbackEmail: 'fallback@example.com',
    });
    expect(result).toEqual({
      uid: 'uid-2',
      email: 'user@example.com',
      name: 'User',
    });
  });
});
