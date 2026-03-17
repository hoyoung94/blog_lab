import Link from "next/link";

import { PostCard } from "@/components/post-card";
import { getFeaturedPosts } from "@/lib/posts";

const practiceAreas = [
  "Ubuntu 리눅스 기본기 익히기",
  "Vercel, PM2, Nginx로 Next.js 배포하기",
  "로그, 프로세스, 포트 상태 읽기",
  "정적 블로그를 클라우드 실습 프로젝트로 확장하기",
];

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="container page-stack">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">클라우드 컴퓨팅 학습 블로그</p>
          <h1>로컬 개발에서 리눅스 서버와 클라우드 배포까지 기록하는 블로그</h1>
          <p className="hero-text">
            이 프로젝트는 글을 쓰는 공간이면서 동시에 배포 실습장입니다. Next.js로
            기능을 만들고, Vercel로 먼저 배포한 뒤, Ubuntu 서버와 AWS까지 직접 운영해
            보는 것이 목표입니다.
          </p>

          <p className="hero-status">
            실습 업데이트: VMware Ubuntu 환경에서 PM2와 Nginx를 이용한 첫 서버 배포를 완료했습니다.
          </p>

          <div className="button-row">
            <Link href="/blog" className="button">
              학습 글 보기
            </Link>
            <Link href="/about" className="button button-secondary">
              운영 계획 보기
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <p className="panel-title">이번 주 집중할 것</p>
          <ul className="feature-list">
            {practiceAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">학습 기록</p>
            <h2>작지만 끝까지 배포할 수 있는 블로그부터 시작합니다</h2>
          </div>
          <Link href="/blog" className="section-link">
            전체 글 보기
          </Link>
        </div>

        <div className="card-grid">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="section section-accent">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow">로드맵</p>
            <h2>이 블로그로 연습할 다음 단계</h2>
          </div>
        </div>

        <div className="mini-grid">
          <article className="mini-card">
            <h3>1단계</h3>
            <p>문구와 글을 내 학습 목표에 맞게 바꾸고 Vercel에 첫 배포를 합니다.</p>
          </article>
          <article className="mini-card">
            <h3>2단계</h3>
            <p>Ubuntu 서버에 직접 올려 PM2, Nginx, HTTPS를 실제로 다뤄 봅니다.</p>
          </article>
          <article className="mini-card">
            <h3>3단계</h3>
            <p>AWS EC2와 자동 배포를 붙여 운영 경험과 클라우드 이해를 넓힙니다.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
