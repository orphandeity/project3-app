import { randomUUID } from "crypto";

// App Settings
export const appReducer = (state: AppStateType, action: AppActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_PROJECTID":
      return { ...state, projectId: payload?.projectId };
    case "UPDATE_DARKMODE":
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
};

// Add New Task
export const formReducer = (
  state: FormState,
  action: TaskAction | SubtaskAction | SubtaskDeleteAction | FormResetAction
) => {
  switch (action.type) {
    case "TASK_TITLE":
      return {
        ...state,
        task: { ...state.task, title: action.payload.data },
      };
    case "TASK_DESC":
      return {
        ...state,
        task: { ...state.task, description: action.payload.data },
      };
    case "TASK_STATUS":
      return {
        ...state,
        task: { ...state.task, status: action.payload.data },
      };
    case "SUBTASK_TITLE":
      return {
        ...state,
        subtasks: state.subtasks.map((subtask) => {
          if (subtask.key === action.payload?.key)
            return { ...subtask, title: action.payload.title };
          else return subtask;
        }),
      };
    case "SUBTASK_ADD":
      return {
        ...state,
        subtasks: [...state.subtasks, { key: crypto.randomUUID(), title: "" }],
      };
    case "SUBTASK_DELETE":
      return {
        ...state,
        subtasks: state.subtasks.filter(
          (subtask) => subtask.key !== action.payload.key
        ),
      };
    case "RESET":
      return initFormData;
    default:
      return state;
  }
};

export const initFormData = {
  task: { title: "", description: "", status: "TODO" },
  subtasks: [
    { key: randomUUID(), title: "" },
    { key: randomUUID(), title: "" },
  ],
};
