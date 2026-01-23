import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Rahul Kooverjee`,
    description: post.description,
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#121212] text-slate-200 py-24 px-6 md:px-12 lg:px-24">
      <article className="max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-400 transition-colors mb-12 uppercase tracking-widest"
        >
          ← Back to Blog
        </Link>

        <header className="mb-16">
          <time className="font-mono text-sm text-blue-400 uppercase tracking-widest mb-4 block">
            {post.date}
          </time>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black heading-font text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed border-l-4 border-blue-500/30 pl-6 italic">
            {post.description}
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none 
          prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
          prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
          prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-400 prose-blockquote:italic
          text-slate-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
