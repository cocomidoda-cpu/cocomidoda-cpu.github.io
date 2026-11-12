# 김예진 포트폴리오

콘텐츠 기획·디자인 올라운더 김예진의 포트폴리오 사이트입니다.
HTML·CSS·JS로 직접 만들었고 GitHub Pages로 공개합니다.

- 사이트: https://cocomidoda-cpu.github.io/
- 구성: Home · Work · How I Work · About · Contact (한 페이지)

## 페이지 순서와 각 구간의 역할

| 구간 | 답하는 질문 |
|---|---|
| Home | 어떤 사람이고, 어떤 일을 맡길 수 있는가 (한글 핵심 문장 + 근거 한 줄) |
| Work · 대표 작업 3 | 그 말을 무엇으로 증명하는가 (문제 → 한 일 → 결과) |
| Work · 나머지 목록 | 어떤 범위의 작업을 더 했는가 (Marketing / Design) |
| How I Work | 작업들에서 반복된 일하는 방식 (항목마다 근거 작업이 바로 열림) |
| About | 어디에서 어느 범위까지 일했는가 (경력·교육·스킬·자격) |

## About · Career 타임라인

Career 카드가 화면을 가득 채우면 2019 → 2026 타임라인이 옆으로 넘어갑니다 (`index.html`의 `.ab-tl` 안 `tl-scene`).

- **2019 공간조명:** 조명은 Hoptimist Bumble LED Lamp L · Chrome을 공식 사진 기준으로 Blender에서 재구성한 3D 모델
  (`assets/3d/hoptimist-bumble.glb`)입니다. `assets/js/lamp.js`가 three.js(jsDelivr, `index.html`의 import map)로 그리며,
  About 근처에 왔을 때만 불러옵니다. 나선 스프링이 유일한 광원이고, 불이 켜질 때 깜빡이며 머리가 튀어 오르고,
  항목이 하나씩 나올 때마다 통통 뛰며 목록 쪽을 봅니다. 움직임 값은 `lamp.js`의 `hop()`과 `tick()`에 있습니다.
- **2024 애드:** PTZ 카메라 × 비전 AI 솔루션(유동인구·옥외광고 매체·시청 분석)을 설명하는 블록과, 광고판 위 PTZ 카메라가
  좌우로 돌며 시야 안의 사람을 잡는 장면(`site.js`의 타임라인 코드 안 `sweep`), 애드에서 한 작업 9개가 이어집니다.
  작업 카드는 `tl-cards` 안에 있고 `--i`(순서)·`--r`(0 윗줄, 1 아랫줄)로 자리가 정해집니다. 카드 수를 바꾸면
  `site.css`의 `.tl-on .tl-addd` 폭 계산에 있는 `var(--step) * 8`의 8(카드 수 − 1)도 맞춰 주세요.

## 공고별 버전

같은 페이지에 `?for=`를 붙이면 그 직무에 맞는 버전이 열립니다. 붙이지 않으면 공통 페이지입니다.

| 링크 | 첫 화면 | 대표 작업 3 | 목록 순서 |
|---|---|---|---|
| `/` (공통) | 디자인하는 콘텐츠 마케터 | 메일 · 회사 블로그 · 잘룸 | Marketing 먼저 |
| `/?for=marketing` | 콘텐츠 마케터 | 회사 블로그 · 메일 · 유튜브 | Marketing 먼저 |
| `/?for=design` | 콘텐츠 디자이너 | 회사소개서 · 인스타그램 · 잘룸 | Design 먼저 |
| `/?for=commerce` | 커머스 디자이너 | 잘룸 · 송화버섯 · 메일 | Design 먼저 |
| `/?for=ohbrown` | B2B 콘텐츠 마케터 (오브라운 · OOH B2B 콘텐츠기획·GEO·SEO 공고) | 회사 블로그 · 홈페이지 아티클 · 메일 (+ 포트폴리오 사이트) | Marketing 먼저 |

버전마다 바뀌는 것은 첫 화면 세 줄, Work 소개 문장, 대표 작업 세 개, 목록의 분류 순서, How I Work에서 처음 펼쳐지는 항목,
브라우저 탭 제목입니다. 나머지 내용과 디자인은 모든 버전이 같습니다.

- **내용 고치기 / 새 버전 추가:** `index.html` 끝부분의 `<script type="application/json" id="job-versions">`에 있습니다.
  특정 회사 공고용 버전은 블록 하나를 복사해 키(예: `"acme"`)만 바꾸면 `/?for=acme`로 열립니다.
- **대표 작업으로 올릴 수 있는 카드:** 대표 자리에서는 `문제·한 일·결과` 표(`work-dl is-case`)를, 목록에서는 짧은 요약(`work-sum`)을
  보여 줍니다. 표가 없는 카드를 대표로 올리면 요약이 그대로 보입니다. 지금 표가 있는 카드는 메일, 회사 블로그, 유튜브,
  인스타그램, 회사소개서, 잘룸, 송화버섯입니다.
- 링크 미리보기(카카오톡·메일의 제목과 이미지)는 `/?for=` 링크에서는 공통 페이지의 것을, 아래 짧은 주소에서는 버전의 제목·소개 문장을 씁니다.

### 지원서에 넣는 주소

버전마다 짧은 주소가 있습니다 (`ohbrown/`, `marketing/`, `design/`, `commerce/` 폴더의 `index.html`).
열면 `/?for=<버전>`으로 넘어가고, 지원 채널을 꼬리표(UTM)로 붙여 두면 GA4에서 어느 공고·채널로 들어왔는지 나뉘어 보입니다.

```
https://cocomidoda-cpu.github.io/ohbrown/?utm_source=saramin&utm_medium=resume&utm_campaign=ohbrown
```

| 꼬리표 | 넣는 값 |
|---|---|
| `utm_source` | 지원 채널: `saramin`, `wanted`, `jobkorea`, `email` … |
| `utm_medium` | 링크를 넣은 자리: `resume`(이력서), `cover_letter`(자기소개서), `portfolio_pdf` … |
| `utm_campaign` | 지원 회사 (영문 소문자). 빼면 버전 이름이 들어갑니다 |

- 꼬리표 없이 들어오면 보낸 사이트 주소가 `utm_source`(`utm_medium=referral`)로 옮겨 적힙니다. 짧은 주소를 한 번 거치면서
  GA4가 원래 출처를 잃지 않게 하려는 것입니다. 짧은 주소 페이지에는 GTM이 없어 방문은 홈에서 한 번만 집계됩니다.
- 새 버전의 짧은 주소는 폴더 하나를 복사해 이름, 파일 안의 `key`, 제목·설명을 바꾸면 됩니다. 검색에는 잡히지 않게(`noindex`) 해 두었습니다.

## 측정 (GTM · GA4)

GTM 컨테이너 `GTM-N8SN6TNB`가 GA4(`G-YKLTHGBV9Z`)로 보냅니다. 사이트는 아래 이벤트를 `dataLayer`에 넣기만 하고,
GA4로 보내는 설정은 GTM 화면에서 합니다. 페이지 조회와 모든 이벤트에 `portfolio_version`(버전 이름, 없으면 `common`)이 붙습니다
(`index.html`·`archive.html`의 `<head>` 맨 위, GTM보다 먼저).

| 이벤트 | 언제 | 함께 보내는 값 |
|---|---|---|
| `portfolio_version` | 버전 주소로 들어왔을 때 | `version` |
| `work_detail_open` | 작업 상세보기를 열 때 | `work_id`, `work_title` |
| `work_detail_complete` | 상세보기를 끝까지 내렸을 때 (열 때마다 한 번) | `work_id` |
| `about_section_view` | About의 Profile·Career·Education·Skills가 화면을 채울 때 (방문당 한 번) | `section` |
| `timeline_scene_view` | Career 타임라인의 2019·2023·2024에 들어설 때 (방문당 한 번) | `scene` |
| `how_item_open` | How I Work 항목을 펼칠 때 | `item`, `item_title` |
| `contact_click` | 전화·메일·Behance를 누를 때 | `contact_method` |
| `contact_copy` | 전화번호·메일 주소를 복사할 때 | `contact_method` |

GTM에서 한 번만 설정하면 됩니다.

1. **변수** → 새로 만들기 → 데이터 영역 변수: `portfolio_version`, `version`, `work_id`, `work_title`, `section`, `scene`,
   `item`, `item_title`, `contact_method` (변수 이름은 값 이름과 같게).
2. **Google 태그**(`G-YKLTHGBV9Z`) → 구성 설정에 매개변수 `portfolio_version` = `{{portfolio_version}}`을 추가합니다.
   페이지 조회에도 버전이 붙습니다.
3. **트리거** → 맞춤 이벤트, 이벤트 이름
   `^(portfolio_version|work_detail_open|work_detail_complete|about_section_view|timeline_scene_view|how_item_open|contact_click|contact_copy)$`,
   ‘정규 표현식 일치 사용’ 체크. 이미 이벤트마다 만든 트리거가 있으면 이것 하나로 합쳐도 됩니다.
4. **태그** → GA4 이벤트, 측정 ID `G-YKLTHGBV9Z`, 이벤트 이름 `{{Event}}`, 이벤트 매개변수에 1번의 변수를 모두 넣고 3번 트리거를 연결합니다.
5. **미리보기**로 `/ohbrown/?utm_source=test&utm_medium=test`를 열어 이벤트가 들어오는지 본 뒤 **제출(게시)** 합니다.
6. GA4 **관리 → 맞춤 정의 → 맞춤 측정기준**(범위: 이벤트)에 `portfolio_version`, `work_id`, `section`, `scene`, `item`,
   `contact_method`를 등록하고, **주요 이벤트**에 `contact_click`, `contact_copy`를 표시합니다.

GA4에서 보는 법: 탐색 → 자유 형식, 행에 `portfolio_version`·`세션 캠페인`, 값에 이벤트 수, 필터 `이벤트 이름 = work_detail_complete`
처럼 두면 버전·공고별로 어떤 작업이 끝까지 읽혔는지 나옵니다.

## 파일

| 경로 | 내용 |
|---|---|
| `index.html` | 모든 글과 작업 목록 |
| `assets/css/tokens.css` | 색상 테마 (라이트/다크) |
| `assets/css/site.css` | 레이아웃과 UI 스타일 |
| `assets/js/site.js` | 헤더, 다크 모드, 탭, 아코디언, 이미지 확대 등 동작 |
| `ohbrown/` `marketing/` `design/` `commerce/` | 버전별 짧은 주소 (`/?for=<버전>`으로 넘어감) |
| `assets/img/work/` | 작업 이미지 (`이름.jpg` 원본, `이름-sm.jpg` 썸네일) |

## 작업 미리보기 이미지 바꾸기

각 작업 카드의 회색 칸이 미리보기 자리예요. `index.html`에서 해당 카드의
`<button type="button" class="work-ph" data-detail ...></button>` 안에 이미지를 넣으면 돼요.

```html
<button type="button" class="work-ph" data-detail aria-label="네이버 블로그 … 자세히 보기"><img src="assets/img/preview/blog.jpg" alt="네이버 블로그 운영 미리보기"></button>
```

‘자세히 보기’에서 보이는 페이지들은 카드 안 `<template class="work-pages">`의 이미지 순서대로 나와요.

## 앞으로 채울 것

- 블로그 수치의 비교 기간 각주 (`index.html`에서 `TODO`로 표시한 자리)
- 비핸스 링크, 폰트 블로그 링크
- 제안서·리포트, 인쇄물, 리엔장 배너 이미지
- 영업 사례 증빙 (개인정보 가림)

## 크레딧

UI 요소 일부는 [Lucian UX/UI Prompt](https://lucianlabs.dev/uxui-prompt/) (MIT License, © 2026 Seokwoooo)를 옮겨 왔습니다.
옮겨 온 부분마다 원본 라이선스 줄을 코드에 남겨 두었습니다.
