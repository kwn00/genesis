<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Genesis SDLC

기획서가 입력이고, 계약 테스트가 진실이다. 사람은 두 번만 개입한다.

```
주제 → docs/mvp.md(기능 분해) → draft-spec → 사람 확인 → draft-bdd → 사람 lock → implement-bdd(통과할 때까지) → 그린이면 PR → 사람 merge
```

## 규칙

- 계약 테스트는 `e2e/contract/`만. Playwright. `test.step`으로 Given / When / Then. `.feature`와 Gherkin 런타임은 쓰지 않는다.
- `implement` 작업은 계약 테스트를 고치지 못한다. 테스트를 약하게 만들어 통과시키지 않는다.
- 한 PR에 테스트와 구현을 섞지 않는다. 머지는 사람이 한다. 채팅으로 lock하지 않는다.
- lock은 한 번에 하나. 앞 기능의 `implement` PR이 머지되기 전에 다음 `bdd-draft`를 머지하지 않는다. 기획서와 `bdd-draft` PR은 여러 개 열어둘 수 있다.
- 기능 이름은 kebab-case 하나로 통일한다: `docs/specs/<기능>.md` = `e2e/contract/<기능>.spec.ts` = `src/app/<기능>/`, `src/app/api/<기능>/`, `src/lib/<기능>.ts`. 브랜치는 `test/<기능>`, `feat/<기능>`. `/`는 홈이고 첫 기능이 대체한다.
- 스택은 Next.js App Router + Tailwind 최신. UI와 API를 한 레포에서.
- 더미 데이터만. 사내 데이터·개인정보 금지. 인증·실DB·사내 API는 요청에 필요할 때만.
- 스킬은 `draft-spec`, `draft-bdd`, `implement-bdd` 세 개만. 원본은 `.agents/skills/`. Next.js 사용법은 스킬이 아니라 예시 코드에 둔다.

## 기획서

코드보다 먼저. 주제가 기능 하나보다 크면 `docs/MVP-TEMPLATE.md`로 `docs/mvp.md`를 먼저 채워 기능을 분해한다. 그 다음 `draft-spec`이 기능마다 `docs/specs/TEMPLATE.md`로 한 장을 만든다. 사람이 확인하기 전에 `draft-bdd`로 가지 않는다.

- 누가, 무엇을, 왜
- 화면에서 보이는 성공 한 줄
- 통과 조건 (Given / When / Then으로 바로 쓸 수 있는 것)
- 설계 메모 (라우트·API·데이터·코드 위치 각 한 줄)
- 이번엔 안 하는 것
- 더미 데이터 가정

## 게이트

| 단계 | PR 라벨 | 사람 |
| --- | --- | --- |
| 계약 | `bdd-draft` (`e2e/contract/`, `docs/`만) | 시나리오가 맞으면 머지 = lock |
| 구현 | `implement` (앱 코드만) | 기능을 넣을지 결정하고 머지 |

계약 파일을 바꾸는 PR은 `bdd-draft` 라벨이 있어야 한다. 라벨이 없거나 다르면 CI가 막는다. lock과 `implement` 머지 사이에 main의 계약 테스트는 빨간 게 정상이다.
