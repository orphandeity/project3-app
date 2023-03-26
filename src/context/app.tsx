import { createContext, useReducer } from "react";
import { appReducer } from "../utils/reducers";
import clsx from "clsx";

const AppContext = createContext<{
  state: AppStateType;
  dispatch: React.Dispatch<AppActionType>;
}>({
  state: { projectId: undefined, darkMode: false },
  dispatch: () => null,
});

const AppProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, {
    projectId: undefined,
    darkMode: false,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className={clsx(state.darkMode ? "dark" : "")}>{children}</div>
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
