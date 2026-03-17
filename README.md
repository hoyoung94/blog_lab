# Blog Lab

개발 학습, 리눅스 운영 연습, 클라우드 배포 경험을 한 프로젝트에서 쌓기 위한 Next.js + MDX 블로그입니다.

## 포함된 내용

- App Router 기반 구조
- 홈, 글 목록, 글 상세, 소개 페이지
- `content/posts/*.mdx` 기반 포스트 구조
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

1. 포스트에 실제 스크린샷 이미지를 추가하기
2. `giscus`나 Supabase로 댓글 기능 붙이기
3. Prisma + PostgreSQL로 관리자 CRUD 만들기
4. GitHub와 Vercel을 연결해 자동 배포 구성하기

## 나중에 꼭 바꿔야 할 값

- `src/app/layout.tsx`의 `metadataBase`
- `src/app/sitemap.ts`와 `src/app/robots.ts`의 URL

## 1주차 체크리스트

하루 단위 일정은 `docs/week1-checklist.md`에 정리해 두었습니다.

## Ubuntu 서버 배포

`PM2 + Nginx` 기준 실습 문서는 `docs/ubuntu-deploy.md`에 정리해 두었습니다.

## 새 글 추가 방법

1. `content/posts` 폴더에 `my-post.mdx` 파일을 만듭니다.
2. 아래 frontmatter를 맨 위에 작성합니다.

```mdx
---
title: "글 제목"
excerpt: "목록과 SEO에 쓰일 짧은 요약"
publishedAt: "2026-03-17"
readingTime: "4분 읽기"
featured: false
tags:
  - 태그1
  - 태그2
---
```

3. frontmatter 아래부터는 일반 Markdown이나 MDX 문법으로 본문을 작성합니다.
4. 이미지는 `public/images/posts/<slug>/...` 경로에 넣고, 본문에서는 `/images/posts/<slug>/image.png`처럼 참조하면 됩니다.
