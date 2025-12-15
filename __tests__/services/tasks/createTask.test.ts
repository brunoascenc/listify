import { createTask } from '@/services/tasks/createTask';
import { firebaseAuth } from '@/services/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from '@react-native-firebase/firestore';
import type {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/firestore');

describe('createTask', () => {
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
      createTask({ title: 'Task' }),
    ).rejects.toThrow(/autenticado/i);
  });

  it('creates task and returns mapped data', async () => {
    const taskRef = {
      id: 'task-1',
      path: 'users/user-1/tasks/task-1',
    } as unknown as FirebaseFirestoreTypes.DocumentReference;

    const subtaskIdRef = {
      id: 'sub-1',
      path: 'ids/sub-1',
    } as unknown as FirebaseFirestoreTypes.DocumentReference;

    jest
      .mocked(doc)
      .mockReturnValueOnce(taskRef)
      .mockReturnValueOnce(subtaskIdRef);

    const snapshot = {
      id: 'task-1',
      data: () => ({
        title: 'My Task',
        completed: false,
        dueDate: null,
        subtasks: [
          {
            id: 'sub-1',
            title: 'Sub A',
            completed: false,
            createdAt: Timestamp.fromDate(
              new Date('2025-01-01T00:00:00Z'),
            ),
            updatedAt: Timestamp.fromDate(
              new Date('2025-01-01T00:00:00Z'),
            ),
          },
        ],
        createdAt: Timestamp.fromDate(
          new Date('2025-01-01T00:00:00Z'),
        ),
        updatedAt: Timestamp.fromDate(
          new Date('2025-01-01T00:00:00Z'),
        ),
      }),
    } as unknown as FirebaseFirestoreTypes.DocumentSnapshot;

    jest.mocked(getDoc).mockResolvedValueOnce(snapshot);

    const result = await createTask({
      title: 'My Task',
      dueDate: null,
      subtasks: [{ title: 'Sub A' }],
    });

    expect(setDoc).toHaveBeenCalledWith(
      taskRef,
      expect.objectContaining({
        title: 'My Task',
        completed: false,
        subtasks: expect.arrayContaining([
          expect.objectContaining({
            id: 'sub-1',
            title: 'Sub A',
            completed: false,
          }),
        ]),
      }),
    );

    expect(result.id).toBe('task-1');
    expect(result.title).toBe('My Task');
    expect(result.subtasks[0].id).toBe('sub-1');
  });
});
