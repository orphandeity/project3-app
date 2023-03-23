import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Signin from "~/components/Signin";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Project3</title>
        <meta name="description" content="project management app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/**
         *  TODO:
         *  landing page
         *  authenticate dashboard page
         */}
        <h1>Home Page</h1>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Signin />
      </main>
    </>
  );
};

export default Home;
