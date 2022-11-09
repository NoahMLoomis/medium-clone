import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Article from "../../components/Article";

const ViewArticles = ({ articles }: { articles: IArticle[] }) => {
  return (
    <div className="flex-1">
      {articles.map((d) => (
        <Article key={d.title} data={d} />
      ))}
    </div>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const { data: articles } = await supabase
    .from("articles")
    .select("title, content, user_email, inserted_at, id");

  return {
    props: {
      articles,
    },
  };
};

export default ViewArticles;
