#!/usr/bin/env sh
# Candidate list only; the orchestrator decides.

set -eu

if [ "$#" -gt 0 ]; then
  git diff "$1" -U0
elif ! git diff --cached --quiet; then
  git diff --cached -U0
else
  git diff -U0
fi | grep -E '^\+[^+]' | grep -E '^\+[[:space:]]*(//|#|/\*|\*|<!--|--)' || true
