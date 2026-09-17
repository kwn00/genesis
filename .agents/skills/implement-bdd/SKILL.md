---
name: implement-bdd
description: Implement app code until locked Playwright contract tests pass, then open an implement PR with an empty contract diff. Use when asked to implement-bdd, implement a locked spec, or make contract tests green.
---

# implement-bdd

lock된 테스트를 로컬에서 전부 통과할 때까지 구현→테스트→수정 반복 → 그린이면 구현 PR을 연다 → 멈춘다.

## 시작 전

- lock은 `bdd-draft` PR이 머지된 상태다. `origin/main`에 `e2e/contract/<기능>.spec.ts`가 있어야 한다. 채팅으로 lock하지 않는다.
- `e2e/contract/`를 수정하지 않는다. 테스트를 약하게 만들어 통과시키지 않는다.
- Next.js App Router + Tailwind. 더미 데이터만. 사내 데이터·개인정보 금지.
- 코드는 기획서의 설계 메모 위치에 둔다: `src/app/<기능>/`, `src/app/api/<기능>/`, `src/lib/<기능>.ts`. 다른 기능의 파일을 건드리지 않는다.
- 브랜치를 판다. main에서 직접 작업하지 않는다.

```bash
git fetch origin && git switch -c feat/<기능> origin/main
```

## 루프

1. `npm run test:contract -- e2e/contract/<기능>.spec.ts` — 이 기능의 계약만 돈다.
2. 실패하면 앱 코드만 고친다. 계약 테스트는 읽기만 한다.
3. 다시 테스트한다. 이 기능이 그린이면 `npm run test:contract`로 전체를 돈다. 다른 기능의 계약이 깨졌으면 회귀다. 고친다.
4. 구현으로 충족 불가능하면 멈춘다. 기획/lock을 사람에게 되돌린다. 계약은 고치지 않는다.

전체 실행에서 `origin/main`에서도 이미 빨간 다른 기능의 계약이 보이면 lock이 겹친 것이다. 구현하지 말고 사람에게 알린다.

## PR

실패한 채로 PR을 올리지 않는다. 계약 테스트 diff는 비어 있어야 한다.

```bash
npm run lint && npm run test:contract
git push -u origin HEAD
gh pr create --label implement --title "feat: <기능>" --body "$(cat <<'EOF'
## 기획서
docs/specs/<기능>.md

## 확인
- [x] 로컬 `npm run test:contract` 전부 그린
- [x] `e2e/contract/` diff 없음
EOF
)"
```

사람은 코드 품질을 다시 설계하지 않는다. 이 기능을 넣을지만 고른다.

## 하지 않는 것

- `e2e/contract/` 수정
- 인증·실DB·사내 API를 요청 없이 추가
- 테스트와 구현을 한 PR에 섞기
- 그린이 아닌 PR

그린이 확인된 뒤에만 PR을 열고 멈춘다.
