import { test } from 'node:test'; import assert from 'node:assert/strict'; import { inventory } from './core.js';
const mk = (list) => ({ cookie: '_ga=1; sid=2', querySelectorAll: (sel) => list.filter((e) => e.sel === sel).map((e) => ({ getAttribute: () => e.v })) });
test('inventory: cookies, storages, hosts outside the page host', () => {
  const doc = mk([{ sel: 'script[src]', v: 'https://cdn.example.org/a.js' }, { sel: 'script[src]', v: '/local.js' }, { sel: 'iframe[src]', v: 'https://www.youtube.com/embed/x' }, { sel: 'img[src]', v: 'https://static.monsite.ch/i.png' }]);
  const r = inventory(doc, { localStorage: { consent: '1' }, sessionStorage: {} }, { hostname: 'www.monsite.ch', href: 'https://www.monsite.ch/p' });
  assert.deepEqual(r.cookies, ['_ga', 'sid']); assert.deepEqual(r.localStorage, ['consent']);
  assert.deepEqual(r.thirdParties.map((t) => t.hostname).sort(), ['cdn.example.org', 'static.monsite.ch', 'www.youtube.com']);   // static.monsite.ch: other host, ownership undetermined (conservative rule)
});

test('co.uk: evil.co.uk stays a distinct host from shop.co.uk (no base-domain reduction)', () => {
  const doc = mk([{ sel: 'script[src]', v: 'https://evil.co.uk/a.js' }, { sel: 'script[src]', v: 'https://shop.co.uk/self.js' }, { sel: 'img[src]', v: 'https://img.shop.co.uk/i.png' }]);
  const r = inventory(doc, {}, { hostname: 'shop.co.uk', href: 'https://shop.co.uk/' });
  assert.deepEqual(r.thirdParties.map((t) => t.hostname), ['evil.co.uk']);
  assert.equal(r.hosts.find((h) => h.hostname === 'img.shop.co.uk').relation, 'subdomain_of_page_host');
  assert.equal(r.hosts.find((h) => h.hostname === 'shop.co.uk').relation, 'same_host');
});
test('misleading suffix: notmonsite.ch is not attached to monsite.ch; legitimate subdomain recognised', () => {
  const doc = mk([{ sel: 'script[src]', v: 'https://notmonsite.ch/x.js' }, { sel: 'script[src]', v: 'https://api.monsite.ch/y.js' }]);
  const r = inventory(doc, {}, { hostname: 'monsite.ch', href: 'https://monsite.ch/' });
  assert.deepEqual(r.thirdParties.map((t) => t.hostname), ['notmonsite.ch']);
  assert.equal(r.hosts.find((h) => h.hostname === 'api.monsite.ch').relation, 'subdomain_of_page_host');
  assert.match(r.rule, /undetermined/);
});
test('bookmarklet filters by relation code, not by label text, and its labels are English', async () => {
  const fs = await import('node:fs'); const b = fs.readFileSync(new URL('./bookmarklet.js', import.meta.url), 'utf8');
  assert.ok(b.includes("x.relation==='other_host_ownership_undetermined'")); assert.doesNotMatch(b, /hôte distinct|même hôte|sous-domaine/);
});
