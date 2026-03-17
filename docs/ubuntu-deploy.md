# Ubuntu 서버에 blog_lab 띄우기

이 문서는 `PM2 + Nginx` 기준으로 `blog_lab`을 Ubuntu 서버에 직접 띄우는 첫 실습용 가이드입니다.

## 목표

- Ubuntu 서버에 SSH로 접속한다.
- GitHub에 올린 `blog_lab` 저장소를 서버로 가져온다.
- Node.js와 PM2로 Next.js 앱을 실행한다.
- Nginx로 `80` 포트 요청을 앱으로 전달한다.
- 가능하면 마지막에 HTTPS까지 연결한다.

## 추천 환경

- Ubuntu 22.04 LTS 또는 Ubuntu 24.04 LTS
- 공개 IP가 있는 서버 1대
- 현재 GitHub 저장소: `https://github.com/hoyoung94/blog_lab.git`

## 1. 서버 접속

```bash
ssh <username>@<server-ip>
```

처음 접속하면 아래 명령으로 기본 패키지를 업데이트합니다.

```bash
sudo apt update
sudo apt upgrade -y
```

## 2. 필수 패키지 설치

```bash
sudo apt install -y git curl nginx build-essential
```

Node.js는 `20 LTS` 기준으로 설치합니다.

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

PM2도 설치합니다.

```bash
sudo npm install -g pm2
pm2 -v
```

## 3. 방화벽 열기

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## 4. 프로젝트 내려받기

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone https://github.com/hoyoung94/blog_lab.git
cd /var/www/blog_lab
```

## 5. 앱 설치와 빌드

```bash
npm ci
npm run build
```

빌드가 성공하면 로컬 포트에서 먼저 앱을 올립니다.

```bash
pm2 start ecosystem.config.cjs
pm2 status
pm2 logs blog-lab
```

부팅 후에도 살아있게 설정합니다.

```bash
pm2 save
pm2 startup
```

`pm2 startup`이 출력하는 마지막 명령을 한 번 더 복사해서 실행해야 합니다.

## 6. Nginx 연결

저장소 안의 예시 파일을 Nginx 설정으로 복사합니다.

```bash
sudo cp deploy/nginx/blog-lab.conf /etc/nginx/sites-available/blog-lab
sudo ln -s /etc/nginx/sites-available/blog-lab /etc/nginx/sites-enabled/blog-lab
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
```

지금 예시 설정의 `server_name _;` 는 도메인 없이 서버 IP로 먼저 테스트하기 위한 값입니다.

## 7. 서버에서 먼저 확인할 것

앱 자체가 뜨는지 확인:

```bash
curl -I http://127.0.0.1:3000
```

Nginx를 통해 접속되는지 확인:

```bash
curl -I http://127.0.0.1
```

브라우저에서는 아래 주소로 접속:

```text
http://<server-ip>
```

## 8. 도메인이 있으면 HTTPS 붙이기

도메인을 서버 IP에 연결한 뒤 `server_name`을 실제 도메인으로 바꿉니다.

예:

```nginx
server_name blog.example.com www.blog.example.com;
```

그다음 Certbot으로 HTTPS를 붙입니다.

```bash
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d blog.example.com -d www.blog.example.com
```

## 9. 배포 후 자주 보는 명령

```bash
pm2 status
pm2 logs blog-lab
pm2 restart blog-lab
sudo systemctl status nginx
sudo journalctl -u nginx -n 50 --no-pager
```

## 10. 새 코드 배포할 때

```bash
cd /var/www/blog_lab
git pull origin main
npm ci
npm run build
pm2 restart blog-lab
```

## 실습 체크포인트

- `http://<server-ip>` 에서 블로그가 열린다.
- `pm2 status` 에서 `blog-lab` 이 `online` 상태다.
- `sudo nginx -t` 가 성공한다.
- `curl -I http://127.0.0.1:3000` 응답이 온다.

## 다음 단계

- 서버 도메인 연결
- HTTPS 적용
- GitHub Actions로 자동 배포 연결
- AWS EC2에서 같은 절차 다시 해보기
