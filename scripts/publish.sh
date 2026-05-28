#!/bin/bash

# Fail on pipeline errors, but DON'T use `set -e` around the publish loop:
# a single package failing must not abort the whole release. We collect
# per-package outcomes and decide the exit code at the end based on the
# core package only.
set -o pipefail

echo "Publishing all packages..."

# The package whose publish must succeed for the release to count. The
# @mock-locale/* locale packages are allowed to fail (their npm scope is
# moving to OIDC separately) — they must not block the core from shipping.
CORE_PACKAGE="@stacksjs/ts-faker"
core_failed=0

published=()
skipped=()
failed=()

for dir in packages/*/ ; do
  [ -d "$dir" ] || continue
  dir_name=$(basename "$dir")
  package_json="$dir/package.json"
  [ -f "$package_json" ] || continue

  echo "----------------------------------------"
  echo "Processing $dir_name..."

  # Resolve the published name + private flag (bun, then jq, then grep).
  if command -v bun >/dev/null 2>&1; then
    pkg_name=$(bun --eval "try { const p = JSON.parse(require('fs').readFileSync('$package_json','utf8')); console.log(p.name || '') } catch (e) { console.log('') }")
    is_private=$(bun --eval "try { const p = JSON.parse(require('fs').readFileSync('$package_json','utf8')); console.log(p.private === true ? 'true' : 'false') } catch (e) { console.log('false') }")
  elif command -v jq >/dev/null 2>&1; then
    pkg_name=$(jq -r '.name // ""' "$package_json")
    is_private=$(jq -r '.private // false' "$package_json")
  else
    pkg_name=$(grep -E '"name"' "$package_json" | head -1 | sed -E 's/.*"name"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/')
    if grep -Eq '"private":[[:space:]]*true' "$package_json"; then is_private="true"; else is_private="false"; fi
  fi
  [ -n "$pkg_name" ] || pkg_name="$dir_name"

  echo "Package $pkg_name private status: $is_private"

  if [ "$is_private" = "true" ]; then
    echo "Skipping $pkg_name (private package)"
    skipped+=("$pkg_name")
    echo "----------------------------------------"
    continue
  fi

  echo "Publishing $pkg_name..."
  # Run in a subshell so the cd is scoped and a failure can't abort the loop.
  if publish_log=$( cd "$dir" && bun publish --access public 2>&1 ); then
    publish_status=0
  else
    publish_status=$?
  fi
  echo "$publish_log"

  if [ "$publish_status" -eq 0 ]; then
    published+=("$pkg_name")
  elif echo "$publish_log" | grep -qiE "previously published|already exists|cannot publish over|EPUBLISHCONFLICT"; then
    # Re-running a release where this version already shipped is not an error.
    echo "↳ $pkg_name already published at this version — treating as done."
    skipped+=("$pkg_name")
  else
    echo "↳ WARNING: failed to publish $pkg_name (exit $publish_status) — continuing."
    failed+=("$pkg_name")
    [ "$pkg_name" = "$CORE_PACKAGE" ] && core_failed=1
  fi

  echo "----------------------------------------"
done

echo ""
echo "========================================"
echo "Publish summary"
echo "  published (${#published[@]}): ${published[*]}"
echo "  skipped   (${#skipped[@]}): ${skipped[*]}"
echo "  failed    (${#failed[@]}): ${failed[*]}"
echo "========================================"

if [ "$core_failed" -ne 0 ]; then
  echo "ERROR: core package $CORE_PACKAGE failed to publish."
  exit 1
fi

if [ "${#failed[@]}" -ne 0 ]; then
  echo "Note: ${#failed[@]} non-core package(s) failed (expected for @mock-locale/* until OIDC is configured)."
fi

echo "Core package published successfully."
exit 0
