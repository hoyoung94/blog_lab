import { posts, type Post } from "@/data/posts";

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}
