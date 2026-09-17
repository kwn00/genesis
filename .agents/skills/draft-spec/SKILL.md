---
name: draft-spec
description: Write a one-page feature spec into docs/specs from the repo template. Use when asked to draft-spec, write a 기획서, capture a hackathon topic, or start a new feature before contract tests.
---

# draft-spec

아이디어 → `docs/specs/` 한 장 → 멈춘다. 테스트와 구현은 쓰지 않는다.

## 시작 전

- 입력은 당일 주제·외부 기획, 그리고 있으면 `docs/mvp.md`의 기능 목록 한 줄이다. `docs/mvp.md`가 없고 주제가 기능 하나보다 크면, 먼저 `docs/MVP-TEMPLATE.md`로 `docs/mvp.md`를 채우자고 제안한다.
- 양식은 `docs/specs/TEMPLATE.md`다. 제목 구조를 바꾸지 않는다.
- 채워진 예시는 `docs/specs/item-inbox.md`다.
- 파일명: `docs/specs/<kebab-case>.md`. 기존 파일을 덮어쓰지 않는다. 같은 이름이 계약 파일 `e2e/contract/<kebab-case>.spec.ts`와 코드 위치 `src/app/<kebab-case>/`가 된다.
- 한 기능에 기획서 하나. 여러 기능을 한 장에 넣지 않는다.

## 할 일

1. 빠진 입력이 있으면 묻는다. 추측으로 범위를 넓히지 않는다.
2. 템플릿을 복사해 모든 칸을 채운다. 빈 칸·`{기능 이름}` 자리를 남기지 않는다.
3. 통과 조건은 `draft-bdd`가 `test.step`으로 옮길 수 있는 Given / When / Then이어야 한다. Then은 화면에서 보이는 성공 한 줄과 같아야 한다.
4. 설계 메모는 라우트·API·데이터·코드 위치를 각 한 줄로. 구현 세부를 쓰지 않는다.
5. 더미 데이터만. 사내 데이터·개인정보·실DB를 가정하지 않는다.
6. 인증·사내 API는 기본 out of scope. 사용자가 요청한 것만 `누가, 무엇을, 왜`에 넣는다.

## 하지 않는 것

- `e2e/contract/` 작성
- 앱 코드·PR
- 기획서 없이 `draft-bdd`로 넘어가기

사람이 이 기획서를 확인한 뒤에 `draft-bdd`를 시작한다.
