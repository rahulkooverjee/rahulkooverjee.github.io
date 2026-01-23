import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Rahul Kooverjee",
  description: "Thoughts on product, engineering, and everything in between.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#121212] text-slate-200 py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-400 transition-colors mb-12 uppercase tracking-widest"
        >
          ← Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-black heading-font text-white mb-4">
          Blog
        </h1>
        <p className="text-lg text-slate-400 mb-16">
          Thoughts on product, engineering, and everything in between.
        </p>

        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group block p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <time className="font-mono text-sm text-slate-500 uppercase shrink-0">
                  {post.date}
                </time>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}

          {posts.length === 0 && (
            <p className="text-slate-500 italic">No posts yet. Check back soon!</p>
          )}
        </div>
      </div>
    </main>
  );
}
