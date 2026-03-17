import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container page-stack">
      <article className="post-layout">
        <Link href="/blog" className="back-link">
          글 목록으로 돌아가기
        </Link>

        <header className="post-header">
          <p className="eyebrow">학습 글</p>
          <h1>{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="post-header-meta">
            <span>{formatDate(post.publishedAt)}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="tag-row">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-shell">{post.content}</div>
      </article>
    </div>
  );
}
