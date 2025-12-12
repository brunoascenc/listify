import { create } from 'zustand';

type Subtask = {
  id: string;
  title: string;
  done: boolean;
};

export type Task = {
  id: string;
  title: string;
  dueLabel: string;
  status: 'today' | 'scheduled' | 'overdue';
  topicId: string;
  completed: boolean;
  subtasks: Subtask[];
};

export type Topic = {
  id: string;
  name: string;
  color: string;
  notes: number;
};

type State = {
  topics: Topic[];
  tasks: Task[];
  addTopic: (topic: Omit<Topic, 'id'>) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  addSubtask: (taskId: string, title: string) => void;
  toggleTask: (taskId: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
};

const initialTopics: Topic[] = [
  { id: 'grocery', name: 'Grocery', color: '#f0d8ff', notes: 15 },
  { id: 'edu', name: 'Educational', color: '#d4e2ff', notes: 6 },
  { id: 'home', name: 'Home Related', color: '#fff4c2', notes: 8 },
  { id: 'work', name: 'Work Related', color: '#c7f2de', notes: 14 },
  { id: 'mandatory', name: 'Mandatory Work', color: '#ffd9f3', notes: 3 },
  { id: 'personal', name: 'Personal Notes', color: '#d6f2ea', notes: 3 },
];

const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Project retrospective',
    dueLabel: 'Today · 4:50 PM',
    status: 'today',
    topicId: 'work',
    completed: false,
    subtasks: [],
  },
  {
    id: 't2',
    title: 'Evening team meeting',
    dueLabel: 'Today · 4:50 PM',
    status: 'today',
    topicId: 'work',
    completed: false,
    subtasks: [],
  },
  {
    id: 't3',
    title: 'Create monthly deck',
    dueLabel: 'Today · 4:50 PM',
    status: 'today',
    topicId: 'work',
    completed: false,
    subtasks: [],
  },
  {
    id: 't4',
    title: 'Shop for groceries',
    dueLabel: 'Today · 6:00 PM',
    status: 'today',
    topicId: 'grocery',
    completed: false,
    subtasks: [
      { id: 'st1', title: 'Pick up bag', done: false },
      { id: 'st2', title: 'Rice', done: false },
      { id: 'st3', title: 'Meat', done: false },
    ],
  },
  {
    id: 't5',
    title: 'Read book',
    dueLabel: 'Yesterday · 10:30 PM',
    status: 'overdue',
    topicId: 'personal',
    completed: false,
    subtasks: [],
  },
  {
    id: 't6',
    title: 'Schedule doctor visit',
    dueLabel: 'Tomorrow · 9:00 AM',
    status: 'scheduled',
    topicId: 'mandatory',
    completed: false,
    subtasks: [],
  },
];

export const useTaskStore = create<State>((set) => ({
  topics: initialTopics,
  tasks: initialTasks,
  addTopic: (topic) =>
    set((state) => ({
      topics: [
        ...state.topics,
        {
          ...topic,
          id: `topic-${Date.now()}`,
        },
      ],
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...task, id: `task-${Date.now()}`, completed: false },
      ],
    })),
  addSubtask: (taskId, title) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: `sub-${Date.now()}`, title, done: false },
              ],
            }
          : task,
      ),
    })),
  toggleTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              subtasks: task.subtasks.map((sub) => ({
                ...sub,
                done: !task.completed ? true : sub.done,
              })),
            }
          : task,
      ),
    })),
  toggleSubtask: (taskId, subtaskId) =>
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id !== taskId) return task;

        const subtasks = task.subtasks.map((sub) =>
          sub.id === subtaskId ? { ...sub, done: !sub.done } : sub,
        );

        const allDone = subtasks.length > 0 && subtasks.every((s) => s.done);

        return {
          ...task,
          subtasks,
          completed: allDone ? true : task.completed && !allDone,
        };
      }),
    })),
}));
