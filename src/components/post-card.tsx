import Link from "next/link";

import { formatDate } from "@/lib/posts";
import type { Post } from "@/data/posts";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-card-topline">
        <span className="post-pill">{formatDate(post.publishedAt)}</span>
        <span className="post-meta">{post.readingTime}</span>
      </div>

      <div className="post-card-body">
        <h3>
          <Link href={`/posts/${post.slug}`} className="post-card-link">
            {post.title}
          </Link>
        </h3>
        <p>{post.excerpt}</p>
      </div>

      <div className="tag-row">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
