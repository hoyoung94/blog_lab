import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "이 블로그를 왜 만들었는지, 그리고 리눅스와 클라우드 배포를 어떻게 연습할지 정리한 페이지입니다.",
};

const starterPoints = [
  "지금 구조를 먼저 이해한 뒤 필요한 기능을 천천히 추가합니다.",
  "블로그를 리눅스, 클라우드, 배포 학습 기록장으로 사용합니다.",
  "같은 앱을 여러 환경에 배포해 보며 환경별 차이를 익힙니다.",
  "실패한 과정까지 글로 남겨 실제 경험이 쌓이도록 만듭니다.",
];

export default function AboutPage() {
  return (
    <div className="container page-stack">
      <section className="page-intro">
        <p className="eyebrow">프로젝트 소개</p>
        <h1>이 블로그는 리눅스와 클라우드 배포를 배우기 위한 실습 공간입니다</h1>
        <p>
          Blog Lab은 단순한 글쓰기 사이트가 아니라, 클라우드 컴퓨팅을 배우는 학생이
          로컬 개발에서 실제 서버 운영까지 단계적으로 경험하기 위한 학습 프로젝트입니다.
        </p>
      </section>

      <section className="split-panel">
        <article className="content-panel">
          <h2>왜 블로그로 배우는가</h2>
          <p>
            블로그는 규모가 너무 크지 않아서 끝까지 가져가기 좋지만, 배포 관점에서는
            실제 서비스와 닮아 있어 Git, 빌드, 배포, 도메인, HTTPS, 서버 운영까지
            자연스럽게 이어서 연습할 수 있습니다.
          </p>
          <p>
            현재 구조는 페이지, 컴포넌트, 데이터 계층이 나뉘어 있어 MDX, CMS,
            데이터베이스 같은 다음 단계로 확장하기에도 수월합니다.
          </p>
        </article>

        <article className="content-panel">
          <h2>추천 학습 흐름</h2>
          <ul className="feature-list">
            {starterPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
