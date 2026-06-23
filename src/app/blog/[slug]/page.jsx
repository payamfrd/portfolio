import MdxContent from "@/components/blog/MdxContent";
import { getPostBySlug } from "@/lib/blog";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.cover],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return (
    <main
      className="
        max-w-4xl
        mx-auto
        px-6
        py-32
      "
    >
      <Image
        src={post.cover}
        alt={post.title}
        width={1200}
        height={630}
        className="rounded-3xl mb-10"
      />
      <h1
        className="
          text-5xl
          font-bold
        "
      >
        {post.title}
      </h1>

      <p
        className="
          mt-4
          text-slate-400
        "
      >
        {post.description}
      </p>

      <MdxContent source={post.content} />
      <div className="mt-4 flex gap-5">
        <p className="text-sm text-slate-500">Date: {post.date}</p>
        <p className=" text-sm text-slate-500">{post.readingTime}</p>
      </div>
    </main>
  );
}
