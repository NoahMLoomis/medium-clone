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
      <div className="navbar-start flex">
          <Link href="/articles" className="btn btn-ghost mx-2">
            View Articles
          </Link>
          <Link href="/articles/create" className="btn btn-ghost mx-2">
            Create Articles
          </Link>
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
