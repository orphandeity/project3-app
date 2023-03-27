import * as Switch from "@radix-ui/react-switch";
import { Moon } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "~/context/app";

const Darkmode = () => {
  // selected project & dark mode
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="flex items-center gap-2">
      <Switch.Root
        checked={state.darkMode}
        onCheckedChange={() => dispatch({ type: "UPDATE_DARKMODE" })}
        className="peer h-6 w-10 rounded-full bg-slate-300 shadow-inner dark:bg-slate-900"
      >
        <Switch.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-white shadow-sm transition-transform data-[state=checked]:translate-x-5 dark:bg-slate-700" />
      </Switch.Root>
      <Moon className="text-slate-300 transition-colors peer-data-[state=checked]:text-indigo-400 dark:text-slate-500" />
    </div>
  );
};

export default Darkmode;
