// Inventaire consentement — liste, dans la page, cookies, stockages et domaines tiers chargés. Aucune donnée envoyée. MIT.
export function inventory(doc, win, loc) {
  const host = (loc && loc.hostname) || '';
  const cookies = (doc.cookie || '').split(';').map((c) => c.trim()).filter(Boolean).map((c) => c.split('=')[0]);
  const keys = (s) => { try { return Object.keys(s || {}); } catch { return []; } };
  const local = keys(win && win.localStorage), session = keys(win && win.sessionStorage);
  const srcs = [];
  for (const [sel, attr] of [['script[src]', 'src'], ['iframe[src]', 'src'], ['img[src]', 'src'], ['link[href]', 'href']]) doc.querySelectorAll(sel).forEach((e) => srcs.push(e.getAttribute(attr)));
  // Règle conservatrice et explicite : un hôte est « même hôte » s'il est identique à l'hôte de la page, « sous-domaine » s'il se
  // termine par "." + hôte de la page, sinon « hôte distinct — appartenance non déterminée ». Aucune réduction à un domaine de base :
  // shop.co.uk et evil.co.uk restent distincts ; notmonsite.ch n'est pas rattaché à monsite.ch.
  const hosts = {};
  srcs.forEach((u) => { let h = ''; try { h = new URL(u, (loc && loc.href) || 'https://x/').hostname.toLowerCase(); } catch { return; } if (!h) return; hosts[h] = (hosts[h] || 0) + 1; });
  const pageHost = host.toLowerCase();
  const classify = (h) => (h === pageHost ? 'same_host' : h.endsWith('.' + pageHost) ? 'subdomain_of_page_host' : 'other_host_ownership_undetermined');
  const allHosts = Object.entries(hosts).map(([hostname, count]) => ({ hostname, count, relation: classify(hostname) })).sort((a, b) => b.count - a.count);
  const thirdParties = allHosts.filter((x) => x.relation === 'other_host_ownership_undetermined');
  return { host, cookies, localStorage: local, sessionStorage: session, hosts: allHosts, thirdParties, rule: 'same host / subdomain of page host / other host (ownership undetermined) — no registrable-domain guessing' };
}
