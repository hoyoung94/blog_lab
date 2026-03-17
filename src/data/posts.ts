export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  featured?: boolean;
  tags: string[];
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "why-this-blog-exists",
    title: "이 블로그를 클라우드 실습장으로 만드는 이유",
    excerpt:
      "단순히 글을 올리는 공간이 아니라, Next.js 개발과 리눅스 및 클라우드 배포를 함께 기록하는 프로젝트로 키우고 싶습니다.",
    publishedAt: "2026-03-17",
    readingTime: "4분 읽기",
    featured: true,
    tags: ["Next.js", "클라우드", "학습"],
    content: [
      "클라우드 컴퓨팅을 배우고 있지만, 이론만으로는 잘 와닿지 않는 부분이 많습니다. 그래서 직접 만들고 배포하고 운영해 볼 수 있는 하나의 프로젝트가 필요했습니다.",
      "Next.js 블로그는 규모가 과하지 않아 끝까지 가져가기 좋고, 동시에 GitHub, Vercel, Ubuntu 서버, Nginx, HTTPS, AWS 같은 주제로 자연스럽게 확장할 수 있습니다.",
      "앞으로는 새로운 개념을 배울 때마다 이 블로그에 적용하고, 시행착오까지 글로 남기면서 실제 경험을 쌓아갈 생각입니다."
    ]
  },
  {
    slug: "linux-basics-before-deployment",
    title: "첫 서버 배포 전에 익혀야 할 리눅스 기본기",
    excerpt:
      "Ubuntu 서버 배포를 시도하기 전에 SSH, 파일 권한, 프로세스, 로그를 먼저 익혀 두려 합니다.",
    publishedAt: "2026-03-14",
    readingTime: "5분 읽기",
    tags: ["리눅스", "Ubuntu", "SSH"],
    content: [
      "서버 배포에서 막히는 이유는 코드 자체보다도 서버 환경이 낯설기 때문인 경우가 많습니다. 파일 시스템을 이동하고, 권한을 확인하고, 실행 중인 프로세스를 보는 기본기가 먼저 필요합니다.",
      "그래서 배포 전 체크리스트에는 Next.js만 있는 것이 아니라 SSH 접속, 디렉터리 구조 이해, apt 패키지 설치, ps와 systemctl, journalctl 같은 명령어도 포함되어야 합니다.",
      "이 기본기를 익히면 배포 과정이 막연한 마법처럼 느껴지지 않고, 하나씩 확인 가능한 작업으로 보이기 시작합니다."
    ]
  },
  {
    slug: "from-vercel-to-aws",
    title: "나의 첫 배포 로드맵: Vercel에서 AWS까지",
    excerpt:
      "처음부터 AWS에 뛰어들기보다 Vercel과 Ubuntu를 먼저 경험한 뒤 EC2로 넘어가는 것이 더 현실적인 순서라고 생각합니다.",
    publishedAt: "2026-03-10",
    readingTime: "3분 읽기",
    tags: ["Vercel", "AWS", "배포"],
    content: [
      "Vercel은 가장 빠른 첫 배포 경험을 제공합니다. GitHub와 연결해 자동 배포 흐름을 이해하고, 환경변수와 프로덕션 빌드 개념을 익히기에 좋습니다.",
      "그다음에는 Ubuntu 서버에 같은 앱을 직접 올려 보며 포트, 백그라운드 프로세스, 리버스 프록시, HTTPS 같은 실제 운영 요소를 몸으로 익히고 싶습니다.",
      "이 과정을 거친 뒤 AWS EC2로 옮기면 클라우드 자체가 훨씬 덜 추상적으로 느껴질 것이고, 인프라를 어떤 기준으로 선택해야 하는지도 더 잘 이해하게 될 것입니다."
    ]
  }
];
