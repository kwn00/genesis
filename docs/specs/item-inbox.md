# 더미 아이템 인박스

템플릿이 돌아가는지 확인하는 예시 기능. 해커톤 주제와 무관하다.

## 누가, 무엇을, 왜

- 누가: 이 템플릿으로 기능을 추가하려는 개발자
- 무엇을: 더미 아이템 목록을 보고 새 아이템을 추가한다
- 왜: 기획서 → 실패하는 계약 → lock → 구현 → 그린 한 바퀴가 레포에서 재현되는지 확인하려고

## 화면에서 보이는 성공 한 줄

`/example`에 시드 아이템이 보이고, 제목을 입력해 추가하면 목록 맨 위에 나타난다.

## 통과 조건

- Given `/example` 페이지에 접속한다
- Then 시드 아이템 `Alpha`가 목록에 보인다
- When 제목 `Gamma`를 입력하고 추가한다
- Then 목록 맨 위에 `Gamma`가 보인다

## 설계 메모

- 화면/라우트: `/example`. 제목 입력 + 추가 버튼 + 목록
- API: `GET /api/example/items` → `{ items }`, `POST /api/example/items` `{ title }` → `201 { item }`, 빈 제목은 `400`
- 데이터: `Item { id, title }`
- 코드 위치: `src/app/example/`, `src/app/api/example/items/`, `src/lib/example-items.ts`

## 이번엔 안 하는 것

- 인증, 실DB, 사내 API
- 수정·삭제·페이지네이션
- 새로고침 후에도 유지되는 저장

## 더미 데이터 가정

- 시드: `Alpha`, `Beta`
- 서버 메모리. 프로세스 재시작 시 시드로 돌아간다
- 사내 데이터·개인정보 없음
