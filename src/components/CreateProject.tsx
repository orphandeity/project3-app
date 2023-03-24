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
  const { mutate } = api.project.createProject.useMutation({
    onSuccess(data) {
      dispatch({ type: "UPDATE_PROJECTID", payload: { projectId: data.id } });
    },
  });

  function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    mutate({ title });
    setTitle("");
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <li
          role="button"
          onClick={() => setOpen(true)}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-500"
        >
          <Layout size={16} />
          <p>+ Add New Board</p>
        </li>
      </DialogTrigger>
      <DialogOverlay className="bg-black/05 fixed top-0 left-0 right-0 bottom-0 grid place-content-center overflow-y-auto backdrop-blur-sm">
        <DialogContent
          aria-describedby={undefined}
          onEscapeKeyDown={() => setOpen(false)}
          onInteractOutside={() => setOpen(false)}
        >
          <form
            onSubmit={(e) => handleAddProject(e)}
            className="flex max-w-md flex-col gap-4 rounded bg-white p-8 shadow"
          >
            <DialogTitle>
              <h2 className="font-semibold">Add New Project</h2>
            </DialogTitle>
            <div className="flex flex-col">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={title.length < 3}
              className="w-full rounded bg-slate-200 py-2 hover:bg-slate-300 disabled:opacity-20 "
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
