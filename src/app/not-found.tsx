import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container page-stack">
      <section className="page-intro">
        <p className="eyebrow">404</p>
        <h1>찾으시는 페이지가 없습니다</h1>
        <p>
          요청한 경로가 아직 준비되지 않았거나 존재하지 않습니다. 글 목록으로
          돌아가서 다른 내용을 둘러볼 수 있습니다.
        </p>
        <Link href="/blog" className="button">
          글 목록으로 이동
        </Link>
      </section>
    </div>
  );
}
