/**
 * Digital Twin OneDev Component
 * Simulates OneDev Git hosting, mirror synchronization, and commit verification.
 */

export function validateOneDevRepositoryRef(repoRef) {
  if (!repoRef || !repoRef.startsWith("onedev://")) {
    return { ok: false, reason: "invalid_onedev_uri" };
  }
  return {
    ok: true,
    repoRef,
    status: "mirrored",
    readOnly: true
  };
}

export function runOneDevSmokeTest() {
  console.log("[twin-onedev] Running OneDev Digital Twin smoke test...");
  const sample = validateOneDevRepositoryRef("onedev://subactor/platform");
  console.log(`[twin-onedev] Repository Ref Check: ${sample.ok ? "PASS (" + sample.repoRef + ")" : "FAIL"}`);
  return { ok: sample.ok, sample };
}

if (process.argv.includes("--test") || process.argv.includes("--smoke")) {
  const res = runOneDevSmokeTest();
  process.exit(res.ok ? 0 : 1);
}
