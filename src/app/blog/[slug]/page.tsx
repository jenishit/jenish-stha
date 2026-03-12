"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { blogPosts } from "@/data/blogs";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setReadProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Reading progress */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-accent-red to-accent-brown z-[150]"
        style={{ width: `${readProgress}%` }}
      />

      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link href="/blog" data-hover className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent-red transition-colors mb-8">
          ← Back to Blog
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] px-2 py-0.5 bg-surface-2 border border-border text-text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-text-primary tracking-wide leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 font-mono text-xs text-text-muted mb-8 border-b border-border pb-6">
            <span>Jenish Shrestha</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </motion.div>

        {/* Cover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 aspect-video bg-surface-2 border border-border overflow-hidden"
        >
          <Image src={post.coverImage} alt={post.title} className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </motion.div>

        {/* Content placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-sm text-text-muted leading-relaxed space-y-6"
        >
          <p>{post.excerpt}</p>
          <div className="glass border border-border p-4">
            <p className="text-accent-red text-[10px] mb-2">{'// blog_content.mdx'}</p>
            <p>
              Full article content goes here. Add MDX files to <code className="text-accent-brown">src/content/blog/{post.slug}.mdx</code> to populate this page with rich content, code blocks, and embedded media.
            </p>
          </div>
          <p className="text-text-muted">
            This portfolio is actively being developed. Full articles coming soon as Jenish publishes his technical write-ups.
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="mt-16 border-t border-border pt-8 flex justify-between">
          <Link href="/blog" data-hover className="font-mono text-xs text-text-muted hover:text-accent-red transition-colors">
            ← All Posts
          </Link>
          <Link href="/projects" data-hover className="font-mono text-xs text-text-muted hover:text-accent-red transition-colors">
            View Projects →
          </Link>
        </div>
      </div>
    </div>
  );
}
