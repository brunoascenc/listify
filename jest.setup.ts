import '@testing-library/jest-native/extend-expect';

// Minimal mocks for Firebase native modules to avoid linking errors in Jest
jest.mock('@react-native-firebase/app', () => ({
  __esModule: true,
  getApp: jest.fn(() => ({})),
  getApps: jest.fn(() => [{}]),
}));

jest.mock('@react-native-firebase/auth', () => {
  const auth = { currentUser: { uid: 'test-uid', email: 'test@example.com' } };
  return {
    __esModule: true,
    getAuth: jest.fn(() => auth),
    onAuthStateChanged: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };
});

jest.mock('@react-native-firebase/firestore', () => {
  const Timestamp = class {
  private date: Date;
  constructor(date = new Date()) {
    this.date = date;
  }
  static now() {
    return new Timestamp();
  }
  static fromDate(date: Date) {
    return new Timestamp(date);
  }
  static fromMillis(ms: number) {
    return new Timestamp(new Date(ms));
  }
  toDate() {
    return this.date;
  }
};

  const serverTimestamp = () => ({ __serverTimestamp: true });

  const makeDocSnapshot = (data: Record<string, any> = {}, id = 'doc-id') => ({
    id,
    exists: true,
    data: () => data,
  });

  const doc = jest.fn((_, ...segments: string[]) => ({
    id: segments[segments.length - 1] ?? 'doc-id',
    path: segments.join('/'),
  }));

  const collection = jest.fn((_, ...segments: string[]) => ({
    id: segments[segments.length - 1] ?? 'collection-id',
    path: segments.join('/'),
  }));

  const setDoc = jest.fn(async () => Promise.resolve());
  const getDoc = jest.fn(async () => makeDocSnapshot());
  const deleteDoc = jest.fn(async () => Promise.resolve());

  const orderBy = jest.fn((field: string, direction?: 'asc' | 'desc') => ({
    type: 'orderBy',
    field,
    direction,
  }));
  const query = jest.fn((ref, ...constraints) => ({ ref, constraints }));
  const getDocs = jest.fn(async () => ({
    docs: [makeDocSnapshot()],
  }));

  const getFirestore = jest.fn(() => ({}));

  return {
    __esModule: true,
    getFirestore,
    Timestamp,
    serverTimestamp,
    collection,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    getDocs,
    query,
    orderBy,
    FirebaseFirestoreTypes: { Timestamp },
  };
});
