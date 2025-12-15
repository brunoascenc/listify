import { updateTask } from '@/services/tasks/updateTask';
import { firebaseAuth } from '@/services/firebase';
import { doc, setDoc, Timestamp } from '@react-native-firebase/firestore';
import type {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/firestore');

describe('updateTask', () => {
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
      updateTask({ taskId: 'task-1', title: 'Title' }),
    ).rejects.toThrow(/autenticado/i);
  });

  it('updates task with trimmed fields and subtasks', async () => {
    const taskRef: FirebaseFirestoreTypes.DocumentReference = {
      id: 'task-1',
      path: 'users/user-1/tasks/task-1',
    } as FirebaseFirestoreTypes.DocumentReference;

    jest.mocked(doc).mockReturnValue(taskRef);

    await updateTask({
      taskId: 'task-1',
      title: '  Updated title  ',
      dueDate: new Date('2025-01-02T00:00:00Z'),
      completed: true,
      subtasks: [{ id: 'sub-1', title: 'Sub', completed: false }],
    });

    expect(setDoc).toHaveBeenCalledWith(
      taskRef,
      expect.objectContaining({
        title: 'Updated title',
        dueDate: new Date('2025-01-02T00:00:00Z'),
        completed: true,
        subtasks: expect.arrayContaining([
          expect.objectContaining({
            id: 'sub-1',
            title: 'Sub',
            completed: false,
            updatedAt: expect.any(Timestamp),
          }),
        ]),
        updatedAt: expect.anything(),
      }),
      { merge: true },
    );
  });
});
