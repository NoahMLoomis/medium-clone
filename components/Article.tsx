import Link from "next/link";

const Article = ({ data }: { data: Article }) => {
  const formattedDate = new Date(data.inserted_at).toISOString().split("T")[0];

  return (
    <div className="flex-auto w-full p-2 mt-1 mb-2 shadow-md bg-slate-200 rounded text-black">
      <h1 className="text-2xl underline font-extrabold ">{data.title}</h1>
      <div className="text-xs">By {data.user_email}</div>
      <div className="m-2">{data.content}</div>
      <span className="text-xs">{formattedDate}</span>
    </div>
  );
};

export default Article;
