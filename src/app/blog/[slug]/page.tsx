// app/blog/[slug]/page.tsx
import { use } from 'react'; // <-
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/data";
import BlogPostClient from "./BlogPostClient";


type PostPageProps = {
  params: Promise<{ slug: string }>; // ← Es una Promise
};


export default function SinglePostPage({ params }: PostPageProps) {
  const { slug } = use(params); // ← Usando React.use()
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}

