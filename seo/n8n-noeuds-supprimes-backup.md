# Sauvegarde — nœuds supprimés du workflow n8n "Centre Hannouni — Form RDV"
Workflow ID : 1kfX3Gz5I0yWP13i
Date de suppression : 1er septembre 2026

Deux nœuds `n8n-nodes-base.emailSend` (typeVersion 2.1) ont été supprimés.
Ils étaient DÉSACTIVÉS et DÉCONNECTÉS depuis la migration vers les nœuds
Gmail, et bloquaient la validation du workflow.

Ce sont des reliquats obsolètes : ils utilisaient les credentials SMTP
"SMTP MsolutionsAI Mehdi Email account" (id WJIQfwhB7BiNjIM0) et envoyaient
depuis/vers les anciennes adresses personnelles, alors que les nœuds Gmail
actifs utilisent le compte centre.hannouni@gmail.com.

## 1. "Email confirmation patient" (id 94a11d51-6178-4af8-948c-544cf6119699)
- fromEmail : mehdi.mekouar@msolutions-ai.com
- toEmail   : {{ $('Formater lead Hannouni').item.json.Email }}
- replyTo   : mekouarmedi@gmail.com
- subject   : "Centre du Docteur Hannouni — Confirmation de votre demande"
- position  : [-144, -192]
- Le corps HTML est identique à celui du nœud Gmail actif
  "Send Email confirmation patient", qui reste en place.

## 2. "Notification interne" (id 1c59283f-3f28-463c-8f37-908585bcbb68)
- fromEmail : mehdi.mekouar@msolutions-ai.com
- toEmail   : mekouarmedi@gmail.com   (≠ centre.hannouni@gmail.com actuel)
- replyTo   : {{ $('Formater lead Hannouni').item.json.Email }}
- subject   : 🔔 Nouvelle demande RDV — {{ Nom Complet }} · {{ Intervention }}
- position  : [112, -192]
- Le corps HTML est identique à celui du nœud Gmail actif
  "Send Notification interne", au pied de page près ("Workflow n8n" vs
  "Workflow automatique").

Pour restaurer : recréer deux nœuds emailSend avec les credentials SMTP
ci-dessus et copier le HTML depuis les nœuds Gmail équivalents.

---

# Piège à connaître : Google Sheets + autoMapInputData

Le nœud "Enregistrer dans Google Sheets" est en `mappingMode: autoMapInputData`.
Contrairement à ce qu'on pourrait croire, il **n'ignore pas** les clés qui
n'ont pas de colonne : il tente de **créer la colonne** en écrivant dans la
ligne d'en-tête. Or cette ligne est **protégée** dans la feuille
"Centre Hannouni - Leads RDV" → l'API répond :

    400 INVALID_ARGUMENT — "Vous tentez de modifier une cellule ou un objet
    protégés."

et l'exécution échoue AVANT les e-mails (aucune notification n'est envoyée).

## Règle
Ne jamais ajouter de clé au `return` du nœud "Formater lead Hannouni" sans
avoir d'abord créé la colonne correspondante dans la feuille (ou levé la
protection). Tout champ dérivé destiné uniquement aux e-mails doit vivre
dans le nœud **"Contexte fermeture"**, placé APRÈS Google Sheets.

## Flux actuel
    Webhook → Formater lead Hannouni → Google Sheets → Contexte fermeture
                                                        ├→ Send Email confirmation patient
                                                        └→ Send Notification interne
