# 김예진 포트폴리오

콘텐츠 기획·디자인 올라운더 김예진의 포트폴리오 사이트입니다.
HTML·CSS·JS로 직접 만들었고 GitHub Pages로 공개합니다.

- 사이트: https://cocomidoda-cpu.github.io/
- 구성: Home · About · Fit · Work · Contact (한 페이지)

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

- 블로그 수치의 비교 기간 각주
- 비핸스 링크, 폰트 블로그 링크
- 제안서·리포트, 인쇄물, 리엔장 배너 이미지
- 영업 사례 증빙 (개인정보 가림)

## 크레딧

UI 요소 일부는 [Lucian UX/UI Prompt](https://lucianlabs.dev/uxui-prompt/) (MIT License, © 2026 Seokwoooo)를 옮겨 왔습니다.
옮겨 온 부분마다 원본 라이선스 줄을 코드에 남겨 두었습니다.
