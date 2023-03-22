import { useState } from "react";
import { api } from "~/utils/api";

const CreateProject = () => {
  const [title, setTitle] = useState<string>("");

  const { mutate } = api.project.createProject.useMutation();

  function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    mutate({ title });
    setTitle("");
  }

  return (
    <form
      onSubmit={(e) => handleAddProject(e)}
      className="flex max-w-md flex-col gap-4 rounded bg-white p-8 shadow"
    >
      <h2 className="font-semibold">Add New Project</h2>
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
  );
};

export default CreateProject;
