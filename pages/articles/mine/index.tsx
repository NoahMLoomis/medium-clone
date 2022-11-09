import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

import Article from "../../../components/Article";

export default function UserArticles({ articles }: { articles: IArticle[] }) {
  return (
    <div className="flex-1">
      {articles ? (
        articles.map((d) => <Article key={d.title} data={d} />)
      ) : (
        <h1 className="text-xl">
          No articles yet{" "}
          <Link href="/articles/create">
            <span className="link link-underline transition-colors hover:text-purple-300">
              create articles
            </span>
          </Link>
        </h1>
      )}
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: articles } = await supabase
    .from("articles")
    .select("title, content, user_email, inserted_at, id")
    .eq("user_email", session?.user?.email);

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      articles,
    },
  };
};
