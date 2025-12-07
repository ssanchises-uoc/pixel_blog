// app/blog/[slug]/page.tsx
import { use } from 'react'; // <-
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/data";
import BlogPostClient from "./BlogPostClient";

/* type PostPageProps = {
  params: {
    slug: string;
  };
}; */

type PostPageProps = {
  params: Promise<{ slug: string }>; // ← Es una Promise
};

/* export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
} */
export default function SinglePostPage({ params }: PostPageProps) {
  const { slug } = use(params); // ← Usando React.use()
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }
/* export default function SinglePostPage({ params }: PostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  } */

  // Aquí ya delegas toda la parte client con hooks
  return <BlogPostClient post={post} />;
}

