// Consent Inventory — lists, inside the page, script-readable cookies, storages and loaded third-party hosts. No data is sent. MIT.
export function inventory(doc, win, loc) {
  const host = (loc && loc.hostname) || '';
  const cookies = (doc.cookie || '').split(';').map((c) => c.trim()).filter(Boolean).map((c) => c.split('=')[0]);
  const keys = (s) => { try { return Object.keys(s || {}); } catch { return []; } };
  const local = keys(win && win.localStorage), session = keys(win && win.sessionStorage);
  const srcs = [];
  for (const [sel, attr] of [['script[src]', 'src'], ['iframe[src]', 'src'], ['img[src]', 'src'], ['link[href]', 'href']]) doc.querySelectorAll(sel).forEach((e) => srcs.push(e.getAttribute(attr)));
  // Conservative, explicit rule: a host is "same host" if identical to the page host, "subdomain" if it ends with "." + page host,
  // otherwise "other host — ownership undetermined". No reduction to a base domain: shop.co.uk and evil.co.uk stay distinct;
  // notmonsite.ch is not attached to monsite.ch.
  const hosts = {};
  srcs.forEach((u) => { let h = ''; try { h = new URL(u, (loc && loc.href) || 'https://x/').hostname.toLowerCase(); } catch { return; } if (!h) return; hosts[h] = (hosts[h] || 0) + 1; });
  const pageHost = host.toLowerCase();
  const classify = (h) => (h === pageHost ? 'same_host' : h.endsWith('.' + pageHost) ? 'subdomain_of_page_host' : 'other_host_ownership_undetermined');
  const allHosts = Object.entries(hosts).map(([hostname, count]) => ({ hostname, count, relation: classify(hostname) })).sort((a, b) => b.count - a.count);
  const thirdParties = allHosts.filter((x) => x.relation === 'other_host_ownership_undetermined');
  return { host, cookies, localStorage: local, sessionStorage: session, hosts: allHosts, thirdParties, rule: 'same host / subdomain of page host / other host (ownership undetermined) — no registrable-domain guessing' };
}
