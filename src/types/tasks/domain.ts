export type BaseEntity = {
  id: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export type Entity<T> = T & BaseEntity;

export type SubtaskFields = {
  title: string;
  completed: boolean;
};

export type TaskFields = {
  title: string;
  completed: boolean;
  dueDate: Date | null;
};

export type Subtask = Entity<SubtaskFields>;

export type Task = Entity<
  TaskFields & {
    subtasks: Subtask[];
  }
>;

export type CreateTaskInput = {
  title: string;
  dueDate?: Date | null;
  subtasks?: Array<Pick<SubtaskFields, 'title'>>;
};

export type DeleteTaskInput = {
  taskId: string;
};

export type UpdateTaskInput = {
  taskId: string;
} & Partial<TaskFields> & {
    subtasks?: Array<{ id: string } & Partial<SubtaskFields>>;
  };
