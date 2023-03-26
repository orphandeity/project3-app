import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Signin from "~/components/Signin";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Project3</title>
        <meta name="description" content="project management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-slate-200">
        {/**
         *  TODO:
         *  landing page
         *  authenticate dashboard page
         */}
        <div className="flex justify-center py-16">
          <h1 className="bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-9xl font-black text-transparent">
            ProjecT3
          </h1>
        </div>
        <Signin />
      </main>
    </>
  );
};

export default Home;
