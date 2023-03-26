import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import ProjectBoard from "~/components/ProjectBoard";
import Sidebar from "~/components/Sidebar";

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData)
    return (
      <div className="py-16 text-center text-7xl font-black">who are you?</div>
    );

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Project Dashboard" />
      </Head>
      <main className="flex min-h-screen bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
        <Sidebar />
        <ProjectBoard />
      </main>
    </>
  );
};

export default Dashboard;
