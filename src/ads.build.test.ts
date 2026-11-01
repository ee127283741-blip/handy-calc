import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

// Builds the site twice (ads off / on) into throwaway dirs; dist/ is never touched.
function build(outDir: string, env: Record<string, string>) {
  rmSync(outDir, { recursive: true, force: true });
  execFileSync('npx', ['astro', 'build', '--outDir', outDir], {
    stdio: 'pipe',
    env: { ...process.env, NODE_ENV: 'production', PUBLIC_ADS_ENABLED: 'false', PUBLIC_ADSENSE_CLIENT: '', ...env },
  });
}
function files(dir: string): string[] {
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => join(e.parentPath, e.name));
}
const count = (s: string, re: RegExp) => (s.match(re) ?? []).length;
const slots = (html: string) => count(html, /<aside class="ad-slot/g);
const script = (html: string) => count(html, /pagead\/js\/adsbygoogle\.js/g);

const OFF = 'dist-test-off';
const ON = 'dist-test-on';

describe('ads build', () => {
  beforeAll(() => {
    build(OFF, {});
    build(ON, { PUBLIC_ADS_ENABLED: 'true', PUBLIC_ADSENSE_CLIENT: 'ca-pub-0000000000000000' });
  }, 600_000);

  it('OFF: no ad code anywhere', () => {
    const hits = files(OFF).filter((f) => /adsbygoogle|pagead2/.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });

  it('ON: script once per page with slots, at most 4 slots per page', () => {
    const pages = files(ON).filter((f) => f.endsWith('.html'));
    expect(pages.length).toBeGreaterThan(0);
    for (const f of pages) {
      const html = readFileSync(f, 'utf8');
      expect(slots(html), f).toBeLessThanOrEqual(4);
      if (slots(html) > 0) expect(script(html), f).toBe(1);
    }
  });

  it('ON: slot counts per page type', () => {
    const read = (p: string) => readFileSync(join(ON, p, 'index.html'), 'utf8');
    expect(slots(read('.'))).toBe(1);
    expect(slots(read('cooking'))).toBe(1);
    expect(slots(read('cooking/cups-to-grams'))).toBe(4);
    expect(read('cooking/cups-to-grams')).toContain('ad-sidebar');
  });
});
