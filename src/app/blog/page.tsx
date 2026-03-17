import type { Metadata } from "next";

import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "글",
  description: "로컬 개발부터 리눅스와 클라우드 배포까지의 학습 과정을 기록한 글 목록입니다.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container page-stack">
      <section className="page-intro">
        <p className="eyebrow">학습 아카이브</p>
        <h1>로컬 개발부터 클라우드 운영까지의 기록</h1>
        <p>
          현재 글은 `content/posts` 폴더의 MDX 파일에서 읽어오고 있으며,
          이미지, 코드 블록, 목록 같은 마크다운 콘텐츠를 자연스럽게 담을 수 있습니다.
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
