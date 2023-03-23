import Link from "next/link";
import ProjectList from "./ProjectList";
import { Library, SidebarClose, SidebarOpen } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="flex flex-col border-r  border-slate-300 bg-slate-200 dark:border-slate-600 dark:bg-slate-800">
      <Link
        href={"/"}
        className="flex h-16 cursor-default items-center justify-center"
      >
        <Library size={30} />
        <h1 className="text-3xl font-bold">ProjecT3</h1>
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <ProjectList />
        <menu className="p-4">
          {/**
           * TODO: dark mode toggle
           * TODO: hide sidebar button
           */}
          <SidebarClose />
        </menu>
      </div>
    </aside>
  );
};

export default Sidebar;
