# Consent Inventory — cookies, storages and third-party hosts in one click (bookmarklet)

[Version française](README.fr.md)

Free, MIT, runs in your browser: **no data is sent**. Page: https://decarvalhoe.github.io/capital-ops-horizon-consent-inventory/

Lists the script-readable cookies, `localStorage`, `sessionStorage` and the hosts loaded by scripts, iframes, images and stylesheets,
to check what loads **before consent** (GDPR; Swiss nFADP). Result can be copied as JSON.

**Try it without a real site:** the [synthetic test page](https://decarvalhoe.github.io/capital-ops-horizon-consent-inventory/examples/synthetic-page.html)
references fictional hosts under the reserved `.invalid` domain (never loaded) and sets a fake cookie and storage key; the expected inventory is printed on it.

Host classification rule (2026-09-24 fix, operator review): **same host**, **subdomain of the page host**, or **other host — ownership undetermined**.
No reduction to a "base domain": `evil.co.uk` stays distinct from `shop.co.uk`, `notmonsite.ch` is not attached to `monsite.ch`, and a related host
(e.g. `static.monsite.ch` seen from `www.monsite.ch`) is listed as other, since the tool does not decide legal ownership.

## Feedback and support

Voluntary feedback goes through [GitHub Issues](https://github.com/decarvalhoe/capital-ops-horizon-consent-inventory/issues/new/choose)
(bug report or feedback form). Best effort, no guaranteed response time. See [SUPPORT.md](SUPPORT.md).

**Do not send private data.** Issues are public: no JSON output from non-public pages, cookie values, session identifiers, user data or client
site names without permission. Reproduce with a synthetic example such as the test page above.

## Limits

HttpOnly cookies and non-DOM network requests are not visible; a technical tool, not legal advice.
Tests: `node --test test.mjs` (co.uk, misleading suffix, subdomain, bookmarklet filter by relation code).
Free public test of the Horizon betting league (24 Sep 2026): measurement = GitHub traffic only, no trackers.
