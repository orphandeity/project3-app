import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import CreateProject from "~/components/CreateProject";
import ProjectList from "~/components/ProjectList";
import ProjectBoard from "~/components/ProjectBoard";

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) return <div>who are you?</div>;

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Project Dashboard" />
      </Head>
      <main className="min-h-screen bg-slate-100">
        <h1 className="text-2xl font-bold">ProjecT3</h1>
        <CreateProject />
        <div>
          <h2 className="font-semibold">Project List</h2>
          <ProjectList />
        </div>
        <div>
          <h2 className="font-semibold">Project Board</h2>
          <ProjectBoard />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
