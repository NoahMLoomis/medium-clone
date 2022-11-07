import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const supabseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const signOut = () => {
    supabseClient.auth.signOut();
    router.push("/");
  };

  return (
    <div className="navbar text-white bg-slate-600">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-slate-600 rounded-box w-52"
          >
            <li>
              <Link href="/articles">View Articles</Link>
            </li>
            <li>
              <Link href="/articles/create">Create Articles</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Medium Clone w/ Next
        </Link>
      </div>
      <div className="navbar-end">
        {!user ? (
          <Link className="btn btn-ghost" href="/login">
            Login
          </Link>
        ) : (
          <button className="btn btn-ghost" onClick={signOut}>
            Sign out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
