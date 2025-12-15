import { act, renderHook } from '@testing-library/react-hooks';
import { UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { useHome } from '@/screens/home/logic/useHome';
import { useGetTasks } from '@/services/tasks/getTasks';
import { useUpdateTask } from '@/services/tasks/updateTask';
import { useAuthStore } from '@/store/useAuthStore';
import { Task, UpdateTaskInput } from '@/types/tasks/domain';
import { UiTask } from '@/types/tasks/ui';

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

jest.mock('@/services/tasks/getTasks');
jest.mock('@/services/tasks/updateTask');
jest.mock('@/store/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));


const makeTask = (overrides: Partial<Task> = {}): Task => ({
  id: 'task-1',
  title: 'Task 1',
  completed: false,
  dueDate: new Date('2025-01-10T12:00:00Z'),
  createdAt: null,
  updatedAt: null,
  subtasks: [],
  ...overrides,
});

const makeUiTask = (overrides: Partial<UiTask> = {}): UiTask => ({
  id: 'ui-1',
  title: 'Task 1',
  dueDate: null,
  dueDateLabel: '',
  dueTimeLabel: '',
  status: 'today',
  completed: false,
  subtasks: [],
  ...overrides,
});

const makeQueryResult = <T,>(data: T): UseQueryResult<T, Error> =>
  ({
    data,
    isLoading: false,
    isError: false,
    isSuccess: true,
  } as UseQueryResult<T, Error>);

const createMutationMock = <TVariables,>() => {
  const mutate = jest.fn<void, [TVariables]>();
  const mutateAsync = jest
    .fn<Promise<void>, [TVariables]>()
    .mockResolvedValue(undefined);

  return {
    mutate,
    mutateAsync,
    result: {
      mutate,
      mutateAsync,
      isPending: false,
      isLoading: false,
      isSuccess: false,
      isError: false,
      reset: jest.fn(),
    } as Partial<UseMutationResult<void, Error, TVariables>>,
  };
};

describe('useHome', () => {
  const setUserMock = jest.fn();

  const mockedUseGetTasks = useGetTasks as jest.MockedFunction<
    typeof useGetTasks
  >;
  const mockedUseUpdateTask = useUpdateTask as jest.MockedFunction<
    typeof useUpdateTask
  >;
  const mockedUseAuthStore = useAuthStore as jest.MockedFunction<
    typeof useAuthStore
  >;

  const mutation = createMutationMock<UpdateTaskInput>();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseGetTasks.mockReturnValue(
      makeQueryResult({
        uiTasks: [],
        stats: { today: 0, scheduled: 0, overdue: 0, all: 0 },
        todayAndOverdue: [],
        rawTasks: [],
      }),
    );

    mockedUseUpdateTask.mockReturnValue(
      mutation.result as UseMutationResult<
        void,
        Error,
        UpdateTaskInput
      >,
    );

    mockedUseAuthStore.mockImplementation((selector: any) =>
      selector({
        user: { name: 'Tester' },
        setUser: setUserMock,
      }),
    );
  });

  it('filters tasks by status', () => {
    const uiTasks: UiTask[] = [
      makeUiTask({ id: '1', status: 'today' }),
      makeUiTask({ id: '2', status: 'overdue' }),
    ];

    mockedUseGetTasks.mockReturnValue(
      makeQueryResult({
        uiTasks,
        stats: { today: 1, scheduled: 0, overdue: 1, all: 2 },
        todayAndOverdue: uiTasks,
        rawTasks: [],
      }),
    );

    const { result } = renderHook(() => useHome());

    expect(result.current.filter).toBe('today');
    expect(result.current.tasks.map(t => t.id)).toEqual(['1']);

    act(() => result.current.setFilter('overdue'));

    expect(result.current.tasks.map(t => t.id)).toEqual(['2']);
  });

  it('toggles a task', () => {
    const rawTasks = [makeTask({ id: '1', completed: false })];

    mockedUseGetTasks.mockReturnValue(
      makeQueryResult({
        uiTasks: [
          makeUiTask({ id: '1', status: 'today', completed: false }),
        ],
        stats: { today: 1, scheduled: 0, overdue: 0, all: 1 },
        todayAndOverdue: [],
        rawTasks,
      }),
    );

    const { result } = renderHook(() => useHome());

    act(() => result.current.handleToggleTask('1', true));

    expect(mutation.mutate).toHaveBeenCalledWith({
      taskId: '1',
      completed: true,
    });
  });

  it('toggles a subtask', () => {
    const rawTasks = [
      makeTask({
        id: '1',
        subtasks: [{ id: 'sub-1', title: 'sub', completed: false }],
      }),
    ];

    mockedUseGetTasks.mockReturnValue(
      makeQueryResult({
        uiTasks: [makeUiTask({ id: '1', status: 'today' })],
        stats: { today: 1, scheduled: 0, overdue: 0, all: 1 },
        todayAndOverdue: [],
        rawTasks,
      }),
    );

    const { result } = renderHook(() => useHome());

    act(() =>
      result.current.handleToggleSubtask('1', 'sub-1', true),
    );

    expect(mutation.mutate).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: '1',
        subtasks: [
          expect.objectContaining({
            id: 'sub-1',
            completed: true,
          }),
        ],
      }),
    );
  });

  it('adds a subtask', () => {
    const rawTasks = [makeTask({ id: '1', subtasks: [] })];

    mockedUseGetTasks.mockReturnValue(
      makeQueryResult({
        uiTasks: [makeUiTask({ id: '1', status: 'today' })],
        stats: { today: 1, scheduled: 0, overdue: 0, all: 1 },
        todayAndOverdue: [],
        rawTasks,
      }),
    );

    const { result } = renderHook(() => useHome());

    act(() => result.current.handleAddSubtask('1', 'New sub'));

    expect(mutation.mutate).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: '1',
        subtasks: expect.arrayContaining([
          expect.objectContaining({
            title: 'New sub',
            completed: false,
          }),
        ]),
      }),
    );
  });
});
