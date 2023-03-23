// App Settings
type AppStateType = {
  projectId: string | undefined;
  darkMode: boolean;
};

type AppActionType = {
  type: "UPDATE_PROJECTID" | "UPDATE_DARKMODE";
  payload?: { projectId: string };
};

// Component Props

// Add New Task form state
type NewTaskState = {
  title: string;
  description: string;
  status: string;
};

type NewSubtaskState = {
  title: string;
};

type FormState = {
  task: NewTaskState;
  subtasks: NewSubtaskState[];
};

type FormResetAction = {
  type: "RESET";
};

type TaskAction = {
  type: "TASK_TITLE" | "TASK_DESC" | "TASK_STATUS";
  payload: { data: string };
};

type SubtaskAction = {
  type: "SUBTASK_TITLE";
  payload: { title: string; index: number };
};
