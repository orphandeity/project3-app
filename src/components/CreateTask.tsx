import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { useReducer, useContext } from "react";
import { AppContext } from "~/context/app";
import { formReducer, initFormData } from "~/utils/reducers";
import { api } from "~/utils/api";

const CreateTask = () => {
  const { state } = useContext(AppContext); // selected project & dark mode

  const [{ task, subtasks }, dispatch] = useReducer(formReducer, initFormData); // form state

  const { mutate } = api.task.createTask.useMutation(); // create task

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!state.projectId) return;
    mutate({ projectId: state.projectId, task, subtasks });
    dispatch({ type: "RESET" });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-md bg-indigo-300 px-4 py-2 font-semibold text-slate-50 hover:bg-indigo-400">
          + New Task
        </button>
      </DialogTrigger>
      <DialogOverlay className="bg-black/05 fixed top-0 left-0 right-0 bottom-0 grid place-content-center overflow-y-auto backdrop-blur-sm">
        <DialogContent aria-describedby={undefined}>
          <form
            onSubmit={(e) => handleAddTask(e)}
            className="flex max-w-md flex-col gap-4 rounded border bg-white p-8 shadow"
          >
            <DialogTitle>
              <h1 className="font-bold">Add New Task</h1>
            </DialogTitle>

            <div className="flex flex-col">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Take a coffee break"
                value={task.title}
                onChange={(e) =>
                  dispatch({
                    type: "TASK_TITLE",
                    payload: { data: e.target.value },
                  })
                }
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Description</label>
              <textarea
                rows={3}
                id="description"
                placeholder="e.g. It's important to take breaks and nothing beats a nice cup of coffee!"
                value={task.description}
                onChange={(e) =>
                  dispatch({
                    type: "TASK_DESC",
                    payload: { data: e.target.value },
                  })
                }
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="subtasks">Subtasks</label>
              <fieldset id="subtasks" className="flex flex-col gap-2">
                {subtasks.map((subtask, i) => (
                  <input
                    key={i}
                    type="text"
                    value={subtask.title}
                    onChange={(e) =>
                      dispatch({
                        type: "SUBTASK_TITLE",
                        payload: { title: e.target.value, index: i },
                      })
                    }
                  />
                ))}
                <button
                  disabled
                  className="w-full rounded bg-slate-100 py-2 font-semibold text-slate-500 hover:bg-slate-200 disabled:opacity-20"
                >
                  + Add Subtask
                </button>
              </fieldset>
            </div>

            <div className="flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={task.status}
                onChange={(e) =>
                  dispatch({
                    type: "TASK_STATUS",
                    payload: { data: e.target.value },
                  })
                }
              >
                <option value="TODO">todo</option>
                <option value="DOING">doing</option>
                <option value="DONE">done</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full rounded bg-slate-100 py-2 font-semibold text-slate-500 hover:bg-slate-200"
            >
              Create Task
            </button>
          </form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default CreateTask;
