# Blog Lab

개발 학습, 리눅스 운영 연습, 클라우드 배포 경험을 한 프로젝트에서 쌓기 위한 Next.js 블로그입니다.

## 포함된 내용

- App Router 기반 구조
- 홈, 글 목록, 글 상세, 소개 페이지
- 나중에 MDX나 데이터베이스로 바꿀 수 있는 로컬 글 데이터 계층
- 기본 SEO 메타데이터, `sitemap`, `robots`
- 별도 UI 라이브러리 없이 구성한 스타일

## 로컬 실행

PowerShell에서 `npm` 실행이 차단되면 `cmd /c npm ...` 또는 `npm.cmd ...` 형식으로 실행하면 됩니다.

```powershell
cmd /c npm install
cmd /c npm run dev
```

실행 후 `http://localhost:3000`에서 확인할 수 있습니다.

## 다음 확장 아이디어

1. `src/data/posts.ts`를 MDX 기반 글로 바꾸기
2. `giscus`나 Supabase로 댓글 기능 붙이기
3. Prisma + PostgreSQL로 관리자 CRUD 만들기
4. GitHub와 Vercel을 연결해 자동 배포 구성하기

## 나중에 꼭 바꿔야 할 값

- `src/app/layout.tsx`의 `metadataBase`
- `src/app/sitemap.ts`와 `src/app/robots.ts`의 URL

## 1주차 체크리스트

하루 단위 일정은 `docs/week1-checklist.md`에 정리해 두었습니다.
