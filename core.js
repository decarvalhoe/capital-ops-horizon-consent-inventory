// Inventaire consentement — liste, dans la page, cookies, stockages et domaines tiers chargés. Aucune donnée envoyée. MIT.
export function inventory(doc, win, loc) {
  const host = (loc && loc.hostname) || '';
  const base = host.split('.').slice(-2).join('.');
  const cookies = (doc.cookie || '').split(';').map((c) => c.trim()).filter(Boolean).map((c) => c.split('=')[0]);
  const keys = (s) => { try { return Object.keys(s || {}); } catch { return []; } };
  const local = keys(win && win.localStorage), session = keys(win && win.sessionStorage);
  const srcs = [];
  for (const [sel, attr] of [['script[src]', 'src'], ['iframe[src]', 'src'], ['img[src]', 'src'], ['link[href]', 'href']]) doc.querySelectorAll(sel).forEach((e) => srcs.push(e.getAttribute(attr)));
  const third = {};
  srcs.forEach((u) => { let h = ''; try { h = new URL(u, (loc && loc.href) || 'https://x/').hostname; } catch { return; } if (h && !h.endsWith(base)) third[h] = (third[h] || 0) + 1; });
  return { host, cookies, localStorage: local, sessionStorage: session, thirdParties: Object.entries(third).map(([hostname, count]) => ({ hostname, count })).sort((a, b) => b.count - a.count) };
}
