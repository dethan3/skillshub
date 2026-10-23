import assert from "node:assert/strict";
import test from "node:test";
import { runInNewContext } from "node:vm";
import { formatSkillAsTS, type SkillData } from "../scripts/lib/skill-parser";

const fixture: SkillData = {
  id: "fixture", name: "Fixture", description: 'A "quoted" description',
  category: "Development", tags: [], platforms: [],
  source: { kind: "github", label: "fixture", url: "https://example.com" },
  popularity: { stars: 0, installs: 0 }, updatedAt: "2026-10-23",
  authors: [], version: "1", license: "MIT", files: [], skillMd: "",
};

for (const content of [
  "echo $HOME; price $10; regex $",
  "Literal ${untrusted.expression} and `backticks`",
  "Windows C:\\tools\\skill\nA trailing backslash \\",
]) {
  test(`generated source preserves Markdown: ${JSON.stringify(content)}`, () => {
    const source = formatSkillAsTS({ ...fixture, skillMd: content });
    const parsed = runInNewContext(`(${source})`);
    assert.equal(parsed.skillMd, content);
    assert.equal(parsed.description, fixture.description);
    assert.doesNotMatch(source, /\\\$(?!\{)/);
  });
}
