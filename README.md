# 김예진 포트폴리오

콘텐츠 기획·디자인 올라운더 김예진의 포트폴리오 사이트입니다.
HTML·CSS·JS로 직접 만들었고 GitHub Pages로 공개합니다.

- 사이트: https://cocomidoda-cpu.github.io/
- 구성: Home · About(가로 타임라인) · Work · How I Work · Contact (한 페이지) + 상세 이력 창

## 페이지 순서와 각 구간의 역할

| 구간 | 답하는 질문 |
|---|---|
| Home | 어떤 일을 맡길 수 있는가 (이름·직무 + 두 줄 핵심 문장 + 근거 한 줄 + Designed to Action.) |
| About (가로 타임라인) | 누구이고 어떤 길을 걸어왔는가. 스크롤하면 장면이 옆으로 넘어감: 불 꺼진 소개 → 2019 조명이 켜지며 공간조명에서 한 일 → 2023 고래사·UX/UI 과정 → 2024 낮이 되고 시티핑크 트럭이 달리며 애드에서 한 일 → Next Action. |
| Work | 그 말을 무엇으로 증명하는가. 한 목록(Marketing / Design)이고, 판매·문의·수상으로 결과가 확인된 작업은 각 분류의 맨 앞에 두고 배지(`work-tag .hl`)를 붙임 |
| How I Work | 작업들에서 반복된 일하는 방식 (항목마다 근거 작업이 바로 열림) |
| 상세 이력 (창) | 회사별로 맡은 일, 교육·스킬·자격. 타임라인 끝의 `상세 이력 보기`나 `/#about-detail` 링크로 열림 |

## About 타임라인 고치기

- 내용: `index.html`의 `<section class="tl" id="about">` 안에 장면(`tl-scene`)별로 있습니다.
- 장면마다 `data-hold`(멈춰 있는 길이, 화면 높이 배수)와, 항목마다 `data-at`(멈춰 있는 동안 0–1 중 언제 나타날지)을 바꾸면 속도가 달라집니다.
- 옆으로 지나가는 속도는 `assets/js/site.js`의 `K`(작을수록 빠름)입니다.
- 움직임 줄이기 설정을 켰거나 화면 높이가 아주 낮으면, 장면이 위에서 아래로 쌓여 모두 한 번에 보입니다.

## 공고별 버전

같은 페이지에 `?for=`를 붙이면 그 직무에 맞는 버전이 열립니다. 붙이지 않으면 공통 페이지입니다.
버전은 내용을 바꾸지 않고 **순서와 강조만** 바꿉니다. 모든 작업은 같은 카드 모양으로 한 목록에 있습니다.

| 링크 | 첫 화면 직무 | 먼저 보여 줄 작업 | 목록 순서 |
|---|---|---|---|
| `/` (공통) | 디자인하는 콘텐츠 마케터 | 메일 · 회사 블로그 · 잘룸 | Marketing → Design |
| `/?for=marketing` | 콘텐츠 마케터 | 회사 블로그 · 메일 · 유튜브 | Marketing → Design |
| `/?for=design` | 콘텐츠 디자이너 | 회사소개서 · 인스타그램 · 잘룸 | Design → Marketing |
| `/?for=commerce` | 커머스 디자이너 | 잘룸 · 송화버섯 · 메일 | Design(개인 작업물 먼저) → Marketing |

버전마다 바뀌는 것은 첫 화면의 직무·두 줄 핵심 문장·근거 한 줄, Work 소개 문장, 각 묶음에서 먼저 보여 줄 작업, 묶음 순서,
How I Work에서 처음 펼쳐지는 항목, 브라우저 탭 제목입니다.

- **내용 고치기 / 새 버전 추가:** `index.html` 끝부분의 `<script type="application/json" id="job-versions">`에 있습니다.
  특정 회사 공고용 버전은 블록 하나를 복사해 키(예: `"acme"`)만 바꾸면 `/?for=acme`로 열립니다.
- 링크 미리보기(카카오톡·메일의 제목과 이미지)는 모든 버전이 공통 페이지의 것을 씁니다.

## 파일

| 경로 | 내용 |
|---|---|
| `index.html` | 모든 글과 작업 목록 |
| `assets/css/tokens.css` | 색상 테마 (라이트/다크) |
| `assets/css/site.css` | 레이아웃과 UI 스타일 |
| `assets/js/site.js` | 헤더, 다크 모드, 탭, 아코디언, 이미지 확대 등 동작 |
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
