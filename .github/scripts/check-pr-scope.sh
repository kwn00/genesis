#!/usr/bin/env bash
set -euo pipefail

event="${GITHUB_EVENT_NAME:-}"
label="${PR_LABEL:-}"
base_ref="${GITHUB_BASE_REF:-main}"

if [[ "$event" != "pull_request" ]]; then
  echo "Not a pull request. Skip PR scope checks."
  exit 0
fi

git fetch --no-tags origin "$base_ref"
changed="$(git diff --name-only "origin/${base_ref}...HEAD")"

if [[ -z "$changed" ]]; then
  echo "No files changed."
  exit 0
fi

contract_changed=0
non_draft_changed=0
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  if [[ "$file" == e2e/contract/* ]]; then
    contract_changed=1
  elif [[ "$file" != docs/* ]]; then
    non_draft_changed=1
  fi
done <<< "$changed"

if [[ "$contract_changed" -eq 1 && "$non_draft_changed" -eq 1 ]]; then
  echo "Do not mix contract tests and implementation in one PR."
  echo "$changed"
  exit 1
fi

if [[ "$contract_changed" -eq 1 && "$label" != "bdd-draft" ]]; then
  echo "Changes under e2e/contract/ require the bdd-draft label (got: ${label:-none})."
  echo "$changed"
  exit 1
fi

if [[ "$label" == "bdd-draft" && "$non_draft_changed" -eq 1 ]]; then
  echo "bdd-draft PRs may only change e2e/contract/ and docs/."
  echo "$changed"
  exit 1
fi

echo "PR scope ok (label=${label:-none})."
