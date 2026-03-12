"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { blogPosts } from "@/data/blogs";
import { formatDate } from "@/lib/utils";
import { staggerContainer, fadeUp } from "@/lib/motion";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background circuit-bg pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          tag="// blog.md"
          title="WRITINGS"
          subtitle="Technical deep-dives, project breakdowns, and lessons from the workshop."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              variants={fadeUp}
              className="group glass border border-border p-6 relative overflow-hidden"
            >
              {/* Hover line */}
              <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-accent-red to-accent-brown transition-all duration-500" />

              <div className="flex flex-col md:flex-row gap-6">
                {/* Cover image */}
                <div className="md:w-40 md:h-32 shrink-0 overflow-hidden bg-surface-2 rounded-sm">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] px-2 py-0.5 bg-surface-2 border border-border text-text-muted">
                        {tag}
                      </span>
                    ))}
                    {post.featured && (
                      <span className="font-mono text-[9px] px-2 py-0.5 bg-accent-red/20 border border-accent-red/30 text-accent-red">
                        Featured
                      </span>
                    )}
                  </div>
                  <Link href={`/blog/${post.slug}`} data-hover>
                    <h2 className="font-display text-2xl text-text-primary tracking-wide leading-tight mb-2 group-hover:text-accent-red transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="font-mono text-xs text-text-muted leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 font-mono text-[10px] text-text-muted">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                    <Link href={`/blog/${post.slug}`} data-hover className="ml-auto text-accent-red hover:text-accent-red-bright transition-colors">
                      Read →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
