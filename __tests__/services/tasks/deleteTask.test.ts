import { deleteTask } from '@/services/tasks/deleteTask';
import { firebaseAuth } from '@/services/firebase';
import { deleteDoc, doc } from '@react-native-firebase/firestore';
import type {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/firestore');

describe('deleteTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firebaseAuth.currentUser = {
      uid: 'user-1',
      email: 'test@example.com',
    } as FirebaseAuthTypes.User;
  });

  it('throws when user is not authenticated', async () => {
    firebaseAuth.currentUser = null;

    await expect(
      deleteTask({ taskId: 'task-1' }),
    ).rejects.toThrow(/autenticado/i);
  });

  it('calls deleteDoc with the task ref', async () => {
    const ref = {
      id: 'task-1',
      path: 'users/user-1/tasks/task-1',
    } as unknown as FirebaseFirestoreTypes.DocumentReference;

    jest.mocked(doc).mockReturnValue(ref);

    await deleteTask({ taskId: 'task-1' });

    expect(deleteDoc).toHaveBeenCalledWith(ref);
  });
});
