import Link from "next/link";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/blog", label: "글" },
  { href: "/about", label: "소개" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-row">
        <Link href="/" className="brand-mark">
          <span className="brand-badge">BL</span>
          <span className="brand-copy">
            <strong>Blog Lab</strong>
            <small>리눅스와 클라우드 학습 기록</small>
          </span>
        </Link>

        <nav aria-label="주요 메뉴">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
