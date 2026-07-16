import assert from "node:assert/strict";
import test from "node:test";
import { formatAudioTime } from "./audio.js";

test("formats audio time", () => {
  assert.equal(formatAudioTime(0), "0:00");
  assert.equal(formatAudioTime(65), "1:05");
  assert.equal(formatAudioTime(Number.NaN), "0:00");
});
