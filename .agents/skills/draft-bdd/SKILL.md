---
name: draft-bdd
description: Draft failing Playwright contract tests from a one-page spec and open a test-only PR labeled bdd-draft. Use when asked to draft-bdd, write contract tests, lock a spec, or turn a 기획서 into BDD.
---

# draft-bdd

기획서 → 실패하는 계약 테스트만 작성 → 테스트-only PR을 연다 → 멈춘다.

## 시작 전

- 기획서가 `docs/specs/<기능>.md`에 한 장인지 확인한다. 없으면 멈추고 `draft-spec`을 먼저 실행하라고 한다. 여기서 기획서를 대신 쓰지 않는다.
- 구현 코드를 쓰지 않는다. 앱·API·스타일·의존성을 건드리지 않는다.
- 테스트는 `e2e/contract/<기능>.spec.ts` 하나. 기획서와 같은 kebab-case 이름.
- 브랜치를 판다. main에서 직접 작업하지 않는다.

```bash
git fetch origin && git switch -c test/<기능> origin/main
```

## 할 일

1. 기획서의 통과 조건을 Playwright `test.step` Given / When / Then으로 옮긴다.
2. `.feature` 파일·Gherkin 런타임은 쓰지 않는다.
3. 화면에서 보이는 성공 한 줄이 Then이 되게 한다.
4. 서버를 재시작하지 않고 여러 번 실행해도 통과하게 쓴다. 서버 메모리는 실행 사이에 남는다. 상대 단언(맨 위에 보인다, 하나 늘었다)이나 고유한 입력값을 쓰고, 절대 개수·다른 테스트의 상태에 의존하지 않는다.
5. `npm run test:contract -- e2e/contract/<기능>.spec.ts`로 **올바른 이유로 실패**하는지 확인한다. 셀렉터 오류면 테스트만 고친다.
6. `e2e/contract/`와 필요하면 `docs/`만 커밋한다.
7. 푸시하고 PR을 연다. 라벨 `bdd-draft`. 계약 외 diff는 비어 있어야 한다.

```bash
git push -u origin HEAD
gh pr create --label bdd-draft --title "test(contract): <기능>" --body "$(cat <<'EOF'
## 기획서
docs/specs/<기능>.md

## 시나리오
- Given ...
- When ...
- Then ...

실패하는 테스트가 정상. 머지 = lock.
EOF
)"
```

이 PR은 실패하는 테스트가 정상이다. PR은 여러 개 열어둘 수 있지만, 머지(lock)는 앞 기능의 `implement`가 머지된 뒤 하나씩 한다.

## 하지 않는 것

- 구현, 리팩터, 패키지 추가
- 기존 계약을 약하게 만드는 것
- 테스트와 구현을 한 PR에 넣는 것
- 리뷰·머지를 대신하는 것

사람이 이 PR을 머지해야 lock이다.
