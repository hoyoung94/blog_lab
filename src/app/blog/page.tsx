import type { Metadata } from "next";

import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "글",
  description: "로컬 개발부터 리눅스와 클라우드 배포까지의 학습 과정을 기록한 글 목록입니다.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container page-stack">
      <section className="page-intro">
        <p className="eyebrow">학습 아카이브</p>
        <h1>로컬 개발부터 클라우드 운영까지의 기록</h1>
        <p>
          현재 글은 로컬 데이터에서 불러오고 있으며, 나중에는 MDX나 CMS,
          데이터베이스 기반 콘텐츠로 확장할 수 있습니다.
        </p>
      </section>

      <section className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
