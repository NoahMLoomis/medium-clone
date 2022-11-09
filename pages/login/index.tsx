import { NextPage } from "next";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Login: NextPage = () => {
  const supabseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  if (user) {
    router.push("/articles");
  }

  return (
    <Auth
      appearance={{ theme: ThemeSupa }}
      supabaseClient={supabseClient}
      theme="dark"
    />
  );
};

export default Login;
