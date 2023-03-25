import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { useReducer, useContext, useState } from "react";
import { AppContext } from "~/context/app";
import { formReducer, initFormData } from "~/utils/reducers";
import { api } from "~/utils/api";
import clsx from "clsx";

// TODO: light mode styles

// TODO: subtask features
// user should be able to add & remove subtasks

const CreateTask = () => {
  const { state } = useContext(AppContext); // selected project & dark mode

  const [open, setOpen] = useState<boolean>(false); // modal open & close

  const [{ task, subtasks }, dispatch] = useReducer(formReducer, initFormData); // form state

  const { mutate } = api.task.createTask.useMutation(); // create task

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!state.projectId) return;
    mutate({ projectId: state.projectId, task, subtasks });
    dispatch({ type: "RESET" });
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-indigo-500 px-4 py-2 font-semibold text-slate-50 transition-all hover:bg-indigo-600 active:scale-95"
        >
          + New Task
        </button>
      </DialogTrigger>
      <DialogOverlay className="fixed top-0 left-0 right-0 bottom-0 grid place-content-center overflow-y-auto bg-black/10 backdrop-blur-sm dark:bg-black/20">
        <DialogContent
          asChild
          aria-describedby={undefined}
          onEscapeKeyDown={() => setOpen(false)}
          onInteractOutside={() => setOpen(false)}
        >
          <form
            onSubmit={(e) => handleAddTask(e)}
            className="flex w-[384px] flex-col gap-4 rounded-md bg-slate-50 p-8 shadow-2xl dark:bg-slate-700"
          >
            <DialogTitle>
              <h1 className="text-xl font-bold">Add New Task</h1>
            </DialogTitle>

            <div className="flex flex-col gap-1">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Take a coffee break"
                className="rounded-md border-slate-200 bg-white/60 p-2 text-sm shadow-sm placeholder:text-slate-300 focus:border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50  dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-slate-500 dark:focus:border-slate-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-700"
                value={task.title}
                onChange={(e) =>
                  dispatch({
                    type: "TASK_TITLE",
                    payload: { data: e.target.value },
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description">Description</label>
              <textarea
                rows={3}
                cols={30}
                id="description"
                placeholder="e.g. It's important to take breaks and nothing beats a nice cup of coffee!"
                className="rounded-md border-slate-200 bg-white/60 p-2 text-sm shadow-sm placeholder:text-slate-300 focus:border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-slate-500 dark:focus:border-slate-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-700"
                value={task.description}
                onChange={(e) =>
                  dispatch({
                    type: "TASK_DESC",
                    payload: { data: e.target.value },
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="subtasks">Subtasks</label>
              <fieldset id="subtasks" className="flex flex-col gap-2">
                {subtasks.map((subtask, i) => (
                  <input
                    key={i}
                    type="text"
                    placeholder={clsx(
                      i === 0
                        ? "e.g. Make some coffee"
                        : "e.g. Pour a cup & enjoy"
                    )}
                    className="rounded-md border-slate-200 bg-white/60 p-2 text-sm shadow-sm placeholder:text-slate-300 focus:border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-slate-500 dark:focus:border-slate-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-700"
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
                  className="rounded-full bg-slate-50 px-4 py-2 text-indigo-500 transition-all hover:bg-indigo-400 hover:text-slate-50 active:scale-95 disabled:opacity-20"
                >
                  + Add New Subtask
                </button>
              </fieldset>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                className="rounded-md border-slate-200 bg-slate-50 text-sm text-slate-600 shadow-sm focus:border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:focus:border-slate-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-700"
                value={task.status}
                onChange={(e) =>
                  dispatch({
                    type: "TASK_STATUS",
                    payload: { data: e.target.value },
                  })
                }
              >
                <option value="TODO">Todo</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={task.title.length < 3}
              className="rounded-full bg-indigo-500 px-4 py-2 text-slate-50 transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-20"
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
