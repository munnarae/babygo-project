# 애기야가자 - 사전 과제

## 기술 스택

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Zustand**
- **Axios**

## 빌드 방식

- **Vite**

## 설치 및 실행 방법

1. **yarn install**
2. **yarn dev**

## 주요 기능

- **장소 리스트 페이지**: API에서 불러온 장소 리스트를 무한 스크롤 방식으로 로드하며, 카테고리를 선택하여 필터링된 데이터를 보여줍니다.
- **장소 상세 페이지**: 선택한 장소의 상세 정보를 표시하며, 이미지 갤러리와 댓글을 남길 수 있는 기능을 제공합니다.
- **댓글 CRUD 기능**: 장소 상세 페이지에서 사용자가 댓글을 추가, 수정, 삭제할 수 있습니다.
- **카테고리 필터링**: 사용자가 특정 카테고리를 선택하면 해당 카테고리의 장소 목록이 필터링되어 표시됩니다.

## 폴더 구조

├── public
│   └── index.html         # 파비콘, 프로젝트 타이틀 관리
├── src
│   ├── assets             # 이미지svg파일
│   ├── components         # 분리 컴포넌트 (Header, Nav, CategoryBar)
│   ├── pages              # 페이지 컴포넌트 (ListPage, DetailPage)
│   ├── store              # 상태 관리
│   ├── services           # API 호출
│   ├── App.tsx            # 메인 애플리케이션
│   ├── main.tsx           # 애플리케이션 엔트리 포인트
│   └── index.css          # 전역 스타일 설정
└── package.json           # 프로젝트 설정 및 스크립트