import { useRef } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import toast from "react-hot-toast";

const CreateArticle = ({ user }: { user: User }) => {
  const articleTitle = useRef<HTMLInputElement | null>(null);
  const articleData = useRef<HTMLTextAreaElement | null>(null);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleClick = async () => {
    console.log(articleTitle?.current?.value);
    console.log(articleData?.current?.value);
    if (
      articleTitle?.current?.value.trim() !== "" &&
      articleData?.current?.value.trim() !== ""
    ) {
      const { error } = await supabaseClient
        .from("articles")
        .insert({
          title: articleTitle?.current?.value,
          content: articleData?.current?.value,
          user_email: user?.email?.toLowerCase(),
          user_id: user?.id,
        })
        .single();

      if (error) {
        toast.error("Something went wrong");
      } else {
        toast.success("Article Created");
        router.push("/articles");
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid w-full max-w-lg">
      <p className="text-lg">Logged in as: {user?.email}</p>
      <label className="label grid-rows-6 text-2xl" htmlFor="title">
        Title
      </label>
      <input
        ref={articleTitle}
        name="title"
        type="text"
        className="input grid-rows-6 bg-slate-500 text-black"
      />

      <label className="label grid-rows-6 text-2xl " htmlFor="title">
        Article Text
      </label>
      <textarea
        ref={articleData}
        name="title"
        className="textarea grid-rows-6 bg-slate-500 text-black"
      />
      <button className="btn btn-success mt-4" onClick={handleClick}>
        Create Article
      </button>
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

export default CreateArticle;
