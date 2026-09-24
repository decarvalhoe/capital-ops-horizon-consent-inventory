# Inventaire consentement — cookies, stockages et domaines tiers en un clic (bookmarklet)

Gratuit, MIT, exécuté dans votre navigateur : **aucune donnée n'est envoyée**. Page : https://decarvalhoe.github.io/capital-ops-horizon-consent-inventory/

Liste les cookies lisibles par script, `localStorage`, `sessionStorage` et les domaines tiers chargés (scripts, iframes, images, styles),
pour vérifier ce qui se charge **avant consentement** (RGPD ; nLPD). Résultat copiable en JSON.

Règle de classement des hôtes (correctif 2026-09-24, revue opérateur) : **même hôte**, **sous-domaine de la page**, ou **hôte distinct — appartenance non déterminée**. Aucune réduction à un « domaine de base » : `evil.co.uk` reste distinct de `shop.co.uk`, `notmonsite.ch` n'est pas rattaché à `monsite.ch`, et un hôte apparenté (ex. `static.monsite.ch` vu depuis `www.monsite.ch`) est listé comme distinct, l'outil ne décidant pas de l'appartenance juridique.

Limites : cookies HttpOnly et requêtes hors DOM non visibles ; outil technique, pas un avis juridique. Tests : `node --test test.mjs` (co.uk, suffixe trompeur, sous-domaine).
Test public gratuit de la ligue de paris Horizon (24.09.2026) : mesure = trafic GitHub uniquement, aucun traceur.
