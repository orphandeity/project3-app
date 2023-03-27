import Link from "next/link";
import ProjectList from "./ProjectList";
import { Library, SidebarClose, SidebarOpen } from "lucide-react";
import Darkmode from "./Darkmode";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <aside
      ref={parent}
      className="flex min-w-fit flex-col justify-end border-r border-slate-300 bg-slate-100 transition-transform dark:border-slate-600 dark:bg-slate-700"
    >
      {open ? (
        <>
          <Link
            href={"/"}
            className="flex h-16 cursor-default items-center justify-center dark:text-slate-50"
          >
            <Library size={30} />
            <h1 className="text-3xl font-bold">ProjecT3</h1>
          </Link>
          <div className="flex flex-1 flex-col justify-between">
            <ProjectList />
            <menu className="m-4 flex flex-col justify-between gap-4 rounded-md bg-slate-200 p-2 text-xs font-medium text-slate-400 shadow-inner dark:bg-slate-800 dark:text-slate-500">
              <div className="flex items-center justify-between">
                <span>Darkmode</span>
                <Darkmode />
              </div>
              <div className="flex items-center justify-between">
                <span>Hide Sidebar</span>
                <SidebarClose
                  className="text-slate-300 transition-colors hover:text-slate-400 dark:text-slate-500 dark:hover:text-slate-400"
                  onClick={() => setOpen(false)}
                />
              </div>
            </menu>
          </div>
        </>
      ) : (
        <SidebarOpen
          onClick={() => setOpen(true)}
          className="m-4 text-slate-300 transition-colors hover:text-slate-400 dark:text-slate-500 dark:hover:text-slate-400"
        />
      )}
    </aside>
  );
};

export default Sidebar;
