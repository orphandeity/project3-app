import { createContext, useReducer } from "react";
import { appReducer } from "../utils/reducers";

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
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
