# Genesis

Next.js 풀스택 AI Native SDLC 템플릿. 기획서가 입력이고, 계약 테스트가 진실이다.

주제는 비어 있다. 외부 기획을 넣으면 아래 바퀴로 기능을 만든다.

## SDLC

```
외부 기획 / 당일 주제
  → docs/mvp.md         이슈 분석·MVP 범위·기능 분해 (양식 docs/MVP-TEMPLATE.md)
  → draft-spec          정제된 기획서 draft (기능마다 한 장)
  → 사람 확인            기획 lock (파일/채팅. PR 아님)
  → draft-bdd           정제된 계약 테스트 draft (실패가 정상)
  → 사람 머지            BDD lock (bdd-draft PR)
  → implement-bdd       spec + 계약으로 구현·테스트 반복
  → 사람 머지            기능 승인 (implement PR)
```

기능마다 이 바퀴를 한 번 돈다. 한 PR에 테스트와 구현을 섞지 않는다. lock은 한 번에 하나.

| 단계 | 누가 | 산출 | 사람이 하는 일 |
| --- | --- | --- | --- |
| 입력 | 사람 | 외부 기획·주제·메모 | AI에게 전달한다 |
| `docs/mvp.md` | 사람 + AI | 이슈 분석, 기능 목록과 바퀴 순서 | 범위를 3~5개 기능으로 자른다 |
| `draft-spec` | AI | `docs/specs/<기능>.md` 한 장 | 양식이 맞는지 확인한다. 여기선 GitHub lock이 없다 |
| `draft-bdd` | AI | `e2e/contract/<기능>.spec.ts` 실패하는 테스트. 라벨 `bdd-draft` PR | 시나리오가 맞으면 머지한다. **이 머지가 BDD lock** |
| `implement-bdd` | AI | 앱 코드만. 로컬 전부 그린 뒤 라벨 `implement` PR | 이 기능을 넣을지만 고르고 머지한다 |

### 규칙

- 기획서 양식은 `docs/specs/TEMPLATE.md`. 누가/무엇을/왜, 화면의 성공 한 줄, Given / When / Then, 설계 메모, 안 하는 것, 더미 데이터.
- 기획서가 없으면 `draft-bdd`를 시작하지 않는다.
- 기능 이름은 kebab-case 하나: `docs/specs/<기능>.md` = `e2e/contract/<기능>.spec.ts` = `src/app/<기능>/`, `src/app/api/<기능>/`, `src/lib/<기능>.ts`. 브랜치는 `test/<기능>`, `feat/<기능>`.
- 계약 테스트는 `e2e/contract/`만. Playwright `test.step`으로 Given / When / Then. `.feature`는 쓰지 않는다. 서버 재시작 없이 반복 실행해도 통과하게 쓴다.
- `bdd-draft` PR은 실패하는 테스트가 정상이다. 구현 코드를 넣지 않는다.
- BDD lock은 채팅이 아니라 `bdd-draft` PR 머지다. **lock은 한 번에 하나** — 앞 기능의 `implement`가 머지된 뒤 다음 `bdd-draft`를 머지한다. 안 그러면 뒤 기능의 빨간 계약 때문에 `implement` PR이 그린이 될 수 없다.
- `implement-bdd`는 잠근 계약을 **실행**만 한다. `e2e/contract/`를 고치지 않는다. 테스트를 약하게 만들어 통과시키지 않는다.
- 로컬에서 전부 그린 뒤에만 `implement` PR을 연다. 계약 diff는 비어 있어야 한다. 실패한 채로 PR 금지.
- 충족 불가면 구현을 억지로 맞추지 않고 기획/lock을 사람에게 되돌린다.
- 구현 PR에서 사람은 코드 품질을 다시 설계하지 않는다.
- lock과 `implement` 머지 사이에 main의 계약 테스트는 빨간 게 정상이다.

## 로컬 실행

```bash
npm install
npx playwright install chromium
npm run dev
```

[http://localhost:3000](http://localhost:3000)

```bash
npm run test:contract
```

## 스킬

워크플로우만 담는다. `draft-spec`, `draft-bdd`, `implement-bdd` 세 개. 원본은 `.agents/skills/`.

| 경로 | 역할 |
| --- | --- |
| `.agents/skills/` | 원본. Cursor가 여기서 읽는다 |
| `.claude/skills` → `../.agents/skills` | Claude Code용 심볼릭 링크 |

`.cursor/skills/`에는 두지 않는다. Cursor는 `.agents/skills/`를 이미 읽고, 여기까지 복사하면 스킬이 두 번 로드된다.

공통 규칙은 `AGENTS.md`. `CLAUDE.md`와 `.cursor/rules/sdlc.mdc`는 그걸 따른다.

## 예시

`docs/specs/item-inbox.md` → `e2e/contract/item-inbox.spec.ts` → `/example` + `POST /api/example/items`.
`docs/specs/item-inbox-count.md` → `e2e/contract/item-inbox-count.spec.ts` → 같은 화면의 `아이템 N개`. 두 번째 바퀴 예시.

메인에 이미 그린 상태로 들어 있다. 루프를 보여 주기 위한 더미일 뿐이고, 당일 제품이 아니다. `/`는 비어 있는 홈이고 첫 기능이 대체한다.

## CI

- 모든 PR: 계약 파일(`e2e/contract/`)을 바꾸면 `bdd-draft` 라벨이 있어야 한다. 테스트와 앱 코드를 한 PR에 섞으면 실패한다.
- `bdd-draft` PR: `e2e/contract/`와 `docs/`만 허용. 계약 테스트 통과를 요구하지 않는다.
- `implement` PR: 계약 파일 변경이면 실패. lint와 계약 테스트가 통과해야 한다.
- `main`은 룰셋으로 보호한다. PR로만 머지하고 `scope`·`contract` 체크가 필수다. 라벨은 실행 시점에 API로 읽으므로 `gh pr create --label` 직후의 첫 실행도 같은 결론을 낸다.
- `e2e/contract/`는 `CODEOWNERS`로 사람 리뷰.

## 당일 체크리스트

- [ ] 팀원 전원 `gh auth status`가 이 레포에 push 권한이 있는 계정인지
- [ ] Node 20 이상, `npm install`, `npx playwright install chromium`, `npm run test:contract` 그린
- [ ] 주제를 받으면 `docs/MVP-TEMPLATE.md` → `docs/mvp.md`. 기능 3~5개로 자르고 순서를 정한다
- [ ] 기능 1부터 `draft-spec` → 확인 → `draft-bdd` → 머지(lock) → `implement-bdd` → 머지. lock은 한 번에 하나
- [ ] 발표 전 마지막 바퀴를 닫아 main을 그린으로 둔다

## 스택

Next.js App Router, Tailwind CSS, Playwright. 더미 데이터만. 사내 데이터·개인정보 금지.
