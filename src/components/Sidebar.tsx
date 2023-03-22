import ProjectList from "./ProjectList";

const Sidebar = () => {
  return (
    <aside className="border-r px-2">
      <div className="grid h-16 place-content-center">
        <h1 className="text-3xl font-bold">ProjecT3</h1>
      </div>
      <ProjectList />
    </aside>
  );
};

export default Sidebar;
