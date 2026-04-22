# Centre Hannouni — Intégration n8n

## Schéma du payload `POST /api/rdv`

Le serveur Next.js reçoit la soumission front, valide, normalise, et **relaie** vers le webhook n8n défini dans `N8N_WEBHOOK_URL`.

```json
{
  "leadId": "HANN-MOA2S6D2-ZMWNM",
  "source": "Website - Centre Hannouni",
  "submittedAt": "2026-04-22T13:15:21.782Z",

  "civilite":      "Madame | Monsieur | Non précisé",
  "prenom":        "Sophia",
  "nom":           "Test",
  "nomComplet":    "Sophia Test",
  "dateNaissance": "1985-06-12",
  "email":         "sophia@example.com",
  "telephone":     "+212612345678",
  "dateSouhaitee": "2026-05-15",
  "intervention":  "Rhinoplastie",
  "message":       "Texte libre…",
  "adresse":       "12 rue de la Liberté",
  "ville":         "Marrakech",
  "pays":          "Maroc",
  "consentement":  true,

  // Bloc de compatibilité — pour rebrancher directement sur le workflow
  // MSOLUTIONSAI-Contact-Form-website sans casser les expressions existantes.
  "firstName": "Sophia",
  "lastName":  "Test",
  "fullName":  "Sophia Test",
  "phone":     "+212612345678",
  "activity":  "Rhinoplastie",
  "company":   ""
}
```

## Mapping recommandé côté Google Sheets (centre Hannouni)

| Colonne Sheets   | Champ payload   |
|------------------|------------------|
| Lead_ID          | `leadId`         |
| Date             | formatée depuis `submittedAt` |
| Civilité         | `civilite`       |
| Prénom           | `prenom`         |
| Nom              | `nom`            |
| Nom complet      | `nomComplet`     |
| Date de naissance| `dateNaissance`  |
| Email            | `email`          |
| Téléphone        | `telephone`      |
| Date souhaitée   | `dateSouhaitee`  |
| Intervention     | `intervention`   |
| Message          | `message`        |
| Adresse          | `adresse`        |
| Ville            | `ville`          |
| Pays             | `pays`           |
| Consentement     | `consentement`   |
| Statut           | `"Nouveau"` (constante) |
| Source           | `source`         |

## Évolution future — Cal.com

Le workflow `Cal.com — Notification RDV` reste indépendant : il est déclenché par les webhooks Cal.com (`BOOKING_CREATED / _RESCHEDULED / _CANCELLED`). Lorsqu'un lead issu du site choisira de basculer vers une réservation instantanée, le site redirigera vers un lien Cal.com pré-rempli avec le prénom, le nom et l'email — ce qui permet au même workflow Cal.com de gérer la notification.

Exemple d'URL à construire côté site :
```
https://cal.com/centre-hannouni/consultation-premiere-visite?name={{nomComplet}}&email={{email}}
```

## Démarrage

```bash
cp .env.example .env.local
# Renseigner N8N_WEBHOOK_URL
npm run dev
```

Sans variable, l'API route log le payload dans la console serveur (utile pour revue de la structure JSON avant d'activer le webhook).
