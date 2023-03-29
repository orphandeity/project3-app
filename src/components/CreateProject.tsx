import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { useContext, useState } from "react";
import { api } from "~/utils/api";
import { Layout } from "lucide-react";
import { AppContext } from "~/context/app";

const CreateProject = () => {
  // set selected project
  const { dispatch } = useContext(AppContext);

  // modal open & close
  const [open, setOpen] = useState<boolean>(false);

  // new project title
  const [title, setTitle] = useState<string>("");

  // api mutation: create project
  const utils = api.useContext();

  const { mutate } = api.project.createProject.useMutation({
    onSuccess(data) {
      dispatch({ type: "UPDATE_PROJECTID", payload: { projectId: data.id } });
      void utils.project.invalidate();
    },
  });

  const { data: projects } = api.project.getAllProjects.useQuery();

  const newUser = projects?.length === 0;

  function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    mutate({ title });
    setTitle("");
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        {newUser ? (
          <button
            onClick={() => setOpen(true)}
            className="gradient-1 ml-4 rounded-full px-4 py-2 font-semibold text-slate-50 shadow transition-all hover:bg-indigo-600 active:scale-95"
          >
            Start here!
          </button>
        ) : (
          <li
            role="button"
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center gap-2 p-4 text-sm font-semibold text-indigo-500 drop-shadow transition-all hover:text-indigo-400 active:scale-95 active:drop-shadow-sm"
          >
            <Layout size={16} />
            <p>+ Add New Board</p>
          </li>
        )}
      </DialogTrigger>
      <DialogOverlay className="fixed top-0 left-0 right-0 bottom-0 grid place-content-center overflow-y-auto bg-black/10 backdrop-blur-sm dark:bg-black/20">
        <DialogContent
          aria-describedby={undefined}
          onEscapeKeyDown={() => setOpen(false)}
          onInteractOutside={() => setOpen(false)}
        >
          <form
            onSubmit={(e) => handleAddProject(e)}
            className="flex w-[384px] flex-col gap-4 rounded bg-slate-50 p-8 shadow-2xl dark:bg-slate-700"
          >
            <DialogTitle>
              <h2 className="text-xl font-bold dark:text-slate-50">
                Add New Project
              </h2>
            </DialogTitle>
            <div className="flex flex-col gap-1">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your project a name..."
                className="rounded-md border-slate-200 bg-white/60 p-2 shadow-sm placeholder:text-slate-300 focus:border-slate-200 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:placeholder:text-slate-500 dark:focus:border-slate-600 dark:focus:ring-indigo-500 dark:focus:ring-offset-slate-700"
              />
            </div>
            <button
              type="submit"
              disabled={title.length < 3}
              className="rounded-full bg-indigo-500 px-4 py-2 text-slate-50 transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-20"
            >
              + Add New Project
            </button>
          </form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default CreateProject;
