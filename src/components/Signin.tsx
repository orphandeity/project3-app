import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Signin: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-center text-2xl font-medium text-slate-400">
        {sessionData && <span>👋 Welcome back, {sessionData.user?.name}!</span>}
      </p>
      {sessionData && (
        <Link
          href={"/dashboard"}
          className="rounded-full bg-gradient-to-t from-indigo-600 to-indigo-400 px-8 py-4 text-lg font-semibold text-slate-100 no-underline shadow-lg shadow-teal-400/40 transition hover:shadow-xl hover:shadow-teal-400/40 active:scale-95"
        >
          Dashboard
        </Link>
      )}

      <button
        className="rounded-full bg-gradient-to-t from-indigo-600 to-indigo-400 px-8 py-4 text-lg font-semibold text-slate-100 no-underline shadow-lg shadow-teal-400/40 transition hover:shadow-xl hover:shadow-teal-400/40 active:scale-95"
        onClick={
          sessionData
            ? () => void signOut()
            : () => void signIn("google", { callbackUrl: "/dashboard" })
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default Signin;
