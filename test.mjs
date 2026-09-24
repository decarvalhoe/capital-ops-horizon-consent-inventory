import { test } from 'node:test'; import assert from 'node:assert/strict'; import { inventory } from './core.js';
const mk = (list) => ({ cookie: '_ga=1; sid=2', querySelectorAll: (sel) => list.filter((e) => e.sel === sel).map((e) => ({ getAttribute: () => e.v })) });
test('inventaire : cookies, stockages, tiers hors domaine de base', () => {
  const doc = mk([{ sel: 'script[src]', v: 'https://cdn.example.org/a.js' }, { sel: 'script[src]', v: '/local.js' }, { sel: 'iframe[src]', v: 'https://www.youtube.com/embed/x' }, { sel: 'img[src]', v: 'https://static.monsite.ch/i.png' }]);
  const r = inventory(doc, { localStorage: { consent: '1' }, sessionStorage: {} }, { hostname: 'www.monsite.ch', href: 'https://www.monsite.ch/p' });
  assert.deepEqual(r.cookies, ['_ga', 'sid']); assert.deepEqual(r.localStorage, ['consent']);
  assert.deepEqual(r.thirdParties.map((t) => t.hostname), ['cdn.example.org', 'www.youtube.com']);
});
