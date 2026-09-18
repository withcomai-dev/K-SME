# 중소기업정책자금지원원 (K-SME Support Center) — 웹사이트

`중소기업정책자금지원원_종합기획서_v2` 기반으로 제작한 반응형 정적 웹사이트입니다.
별도 빌드 과정 없이 순수 HTML/CSS/JS로 구성되어 있어 GitHub Pages 등에서 바로 테스트 운영할 수 있습니다.

## 폴더 구조

```
k-sme-site/
├─ index.html                메인 페이지 (히어로+간편진단폼 / Trust Stats / Core Services /
│                             Success Cases / Process / FAQ&Insights / Bottom CTA / Footer)
├─ cases.html                 성공사례 전체 목록 (업종 필터)
├─ funds/
│  ├─ operating.html          기업 운전자금 랜딩 (검색 유입 표준 템플릿)
│  ├─ facility.html           기업 시설자금 랜딩
│  ├─ mortgage.html           부동산·담보 대출 랜딩
│  └─ special.html            특수금융(기술·무역·보증·특허) 랜딩
├─ about/
│  ├─ intro.html              지원원 소개 (대표 인사말 · 개요 · 서비스 구성 · 협력 전문가)
│  ├─ insights.html           정책자금 뉴스·인사이트 전체 목록 (카테고리 필터)
│  └─ faq.html                전체 FAQ (일반·운전자금·시설자금·담보대출/특수금융 그룹)
├─ assets/
│  ├─ css/style.css           전체 공용 스타일 (디자인 토큰 · 반응형 · 모션)
│  └─ js/main.js              공용 인터랙션 (내비게이션 · 스크롤 리빌 · 카운트업 · 아코디언 · 3-Step 폼 · 필터)
└─ README.md
```

`funds/`의 4개 페이지는 `operating.html`을 표준 템플릿으로 삼아 제목·본문·FAQ만 교체해 만들었습니다.
`about/`, `cases.html`도 같은 헤더·푸터·모션 시스템을 공유하므로, 페이지를 추가로 늘릴 때도 가장 비슷한 파일을 복사해 내용만 바꾸면 됩니다.

## 사이트맵 / GNB 구조

- **간편 진단** → `index.html#diagnosis` (각 자금 랜딩 페이지에도 동일한 3-Step 진단폼 내장)
- **정책자금 솔루션** → 운전자금 · 시설자금 · 부동산·담보 대출 · 특수금융 (`funds/`)
- **경영 애로 해결** → `index.html#solutions` (재무·신용, 인증·R&D, 경영자문)
- **성공사례** → `cases.html`
- **지원원 소개** → `about/intro.html`
- **상담·소식** → `about/insights.html` (뉴스·인사이트), FAQ는 `about/faq.html`

## 로컬에서 바로 확인하기

빌드 도구가 필요 없습니다. `index.html`을 브라우저로 열거나, 아래처럼 간단한 로컬 서버를 띄우면 됩니다.

```bash
cd k-sme-site
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

## GitHub Pages로 테스트 운영하기

1. GitHub에 새 저장소 생성 (예: `k-sme-website`)
2. 이 폴더의 내용을 저장소 루트에 업로드

   ```bash
   cd k-sme-site
   git init
   git add .
   git commit -m "K-SME Support Center 웹사이트 초기 버전"
   git branch -M main
   git remote add origin https://github.com/<계정명>/k-sme-website.git
   git push -u origin main
   ```

3. 저장소 **Settings → Pages** 에서 `Branch: main`, 폴더는 `/ (root)`로 지정 후 저장
4. 잠시 후 `https://<계정명>.github.io/k-sme-website/` 로 접속해 확인

## 현재 구현 범위 (기획서 1~9장 기준)

- 반응형 레이아웃 (모바일 · 태블릿 · PC 동시 대응, breakpoint: 1024px / 860px)
- 히어로 진입 모션(헤드카피·진단폼 순차 등장), 스크롤 리빌, Trust Stats 카운트업 애니메이션
- 3-Step 간편 정책자금 진단 폼 (업종·사업기간·매출 → 자금종류·희망금액 → 신청자정보·동의) + 접수 완료(Confirmation) 상태 전환
- GNB 6개 카테고리 전체를 실제 페이지로 구현: 간편진단 · 정책자금 솔루션(4개 랜딩) · 경영 애로 해결 · 성공사례 · 지원원 소개 · 상담·소식(뉴스/FAQ)
- 성공사례·뉴스·인사이트 페이지에 업종/카테고리 필터 UI 적용 (클릭 시 클라이언트 사이드로 즉시 필터링)
- 신뢰 설계 요소(Trust Stats, 성공사례, 컴플라이언스 고지 상시 노출) 및 표시광고법 리스크를 고려한 카피(확정·보증 표현 배제)
- 전 페이지 연락처·주소는 현재 단일 운영 사이트 기준으로 통일 (대표 박성균 / 010-9035-4182 / 마포구 마포대로 130 별정우체국연금관리공단 5층)

## 배포 전 반드시 확인해야 할 항목

- [ ] **Trust Stats 수치**(누적 상담건수 · 총 조달자금 · 평균 매칭 성공률 등)는 현재 개발용 예시 값입니다. 검증된 실측 수치로 교체 전에는 노출하지 마세요. (`index.html` 내 `data-count` 속성, 기획서 10장 컴플라이언스 참조)
- [ ] **사업자등록번호**는 공개된 정보를 찾지 못해 "확인 후 표기 예정"으로 비워 두었습니다. 실제 등록번호로 반드시 교체하세요. (모든 페이지 Footer `.biz-info`)
- [ ] 성공사례(`cases.html`) · 뉴스·인사이트(`about/insights.html`) 카드의 내용은 예시 편집본입니다. 실제 사례·칼럼으로 교체하세요.
- [ ] `about/intro.html`의 조직 구성(서비스 영역 4개)은 실제 서비스 라인을 근거로 구성한 설명이며, 구체적인 팀명·인원은 아직 반영되지 않았습니다. 필요 시 실제 조직 정보로 교체하세요.
- [ ] 진단 폼 제출 시 현재는 브라우저 내에서 완료 화면만 표시됩니다. 실제 리드 데이터를 수집하려면 `assets/js/main.js`의 `form.addEventListener('submit', ...)` 부분에 서버/API 연동(관리자 페이지 단계에서 진행 예정)이 필요합니다.
- [ ] 법률 자문(명칭·광고 표현 관련) 1회 검토 권장 (기획서 10장)

## 다음 단계

1. 상담 접수 리드 데이터를 실제로 저장·통지할 백엔드/DB 연동
2. **관리자 페이지 개발** — 리드 목록 조회, 인사이트(칼럼) 등록, 성공사례 관리 등
3. 필요 시 `/care/status`(진행현황 조회), `/care/consultant`(전담 컨설턴트 매칭) 등 마이페이지 성격의 페이지 추가

## 이미지·영상 출처

생동감을 위해 무료 라이선스 이미지(Unsplash License)와 영상(Mixkit License)을 추가했습니다. 모두 출처 표기 없이 상업적 이용이 가능한 무료 라이선스입니다.

- 히어로 배경, 성공사례 카드 썸네일(제조업·도소매업·IT·건설업), 지원원 소개 페이지 사진: [Unsplash](https://unsplash.com) — Vitaly Gariev, Daulet Turubayev, Piret Ilver, Christopher Gower, Arron Choi 작가
- 지원원 소개 페이지 상담 현장 영상: [Mixkit](https://mixkit.co) 무료 스톡 영상

실제 상담 현장 사진·영상이 준비되면 이 예시 이미지들을 교체하는 것을 권장합니다. (경로: `assets/css/style.css`의 `.hero`/`.page-hero` 배경, `index.html`·`cases.html`의 `.case-thumb`, `about/intro.html`의 `.video-block`)
