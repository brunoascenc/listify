import { getTasks } from '@/services/tasks/getTasks';
import { firebaseAuth } from '@/services/firebase';
import {
  getDocs,
  orderBy,
  query,
  Timestamp,
} from '@react-native-firebase/firestore';
import type {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

jest.mock('@react-native-firebase/firestore');

describe('getTasks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    firebaseAuth.currentUser = {
      uid: 'user-1',
      email: 'test@example.com',
    } as FirebaseAuthTypes.User;
  });

  it('throws when user is not authenticated', async () => {
    firebaseAuth.currentUser = null;
    await expect(getTasks()).rejects.toThrow(/autenticado/i);
  });

  it('queries tasks ordered by createdAt desc and maps docs', async () => {
    const docMock = {
      id: 'task-1',
      data: () => ({
        title: 'Task A',
        completed: false,
        dueDate: Timestamp.fromDate(
          new Date('2025-01-01T00:00:00Z'),
        ),
        createdAt: Timestamp.fromDate(
          new Date('2025-01-01T00:00:00Z'),
        ),
        updatedAt: Timestamp.fromDate(
          new Date('2025-01-02T00:00:00Z'),
        ),
        subtasks: [],
      }),
    };

    const docs = [
      docMock as unknown as FirebaseFirestoreTypes.QueryDocumentSnapshot,
    ];

    const snapshot = {
      docs,
    } as unknown as FirebaseFirestoreTypes.QuerySnapshot;

    jest.mocked(getDocs).mockResolvedValueOnce(snapshot);

    const result = await getTasks();

    expect(query).toHaveBeenCalled();
    expect(orderBy).toHaveBeenCalledWith('createdAt', 'desc');
    expect(getDocs).toHaveBeenCalled();

    expect(result[0]).toMatchObject({
      id: 'task-1',
      title: 'Task A',
      completed: false,
    });
  });
});
