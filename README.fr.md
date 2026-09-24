# Inventaire consentement — cookies, stockages et domaines tiers en un clic (bookmarklet)

[English version](README.md)

Gratuit, MIT, exécuté dans votre navigateur : **aucune donnée n'est envoyée**. Page : https://decarvalhoe.github.io/capital-ops-horizon-consent-inventory/fr.html

Liste les cookies lisibles par script, `localStorage`, `sessionStorage` et les hôtes chargés (scripts, iframes, images, styles),
pour vérifier ce qui se charge **avant consentement** (RGPD ; nLPD). Résultat copiable en JSON. Libellés du panneau en anglais.

**Essayer sans site réel :** la [page de test synthétique](https://decarvalhoe.github.io/capital-ops-horizon-consent-inventory/examples/synthetic-page.html)
référence des hôtes fictifs sous le domaine réservé `.invalid` (jamais chargés) et pose un cookie et une clé de stockage factices ; l'inventaire attendu y est indiqué.

Règle de classement des hôtes (correctif 2026-09-24, revue opérateur) : **même hôte**, **sous-domaine de la page**, ou **hôte distinct — appartenance non déterminée**. Aucune réduction à un « domaine de base » : `evil.co.uk` reste distinct de `shop.co.uk`, `notmonsite.ch` n'est pas rattaché à `monsite.ch`, et un hôte apparenté (ex. `static.monsite.ch` vu depuis `www.monsite.ch`) est listé comme distinct, l'outil ne décidant pas de l'appartenance juridique.

## Retours et support

Retour volontaire via [GitHub Issues](https://github.com/decarvalhoe/capital-ops-horizon-consent-inventory/issues/new/choose). Meilleur effort, sans délai garanti. Voir [SUPPORT.md](SUPPORT.md).

**Ne transmettez aucune donnée privée.** Les issues sont publiques : pas de JSON d'une page non publique, de valeurs de cookies, d'identifiants de session, de données d'utilisateurs ni de nom de site client sans autorisation. Reproduisez avec un exemple synthétique.

## Limites

Cookies HttpOnly et requêtes hors DOM non visibles ; outil technique, pas un avis juridique. Tests : `node --test test.mjs`.
Test public gratuit de la ligue de paris Horizon (24.09.2026) : mesure = trafic GitHub uniquement, aucun traceur.
