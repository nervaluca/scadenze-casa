# Scadenze Casa – PWA

App web progressiva (PWA) per gestire le scadenze domestiche in famiglia.
Si installa sul telefono come un'app vera, senza passare da alcuno store.

## Struttura

```
scadenze-pwa/
├── index.html      ← tutta l'app (HTML + CSS + JS)
├── sw.js           ← service worker (offline + notifiche)
├── manifest.json   ← rende l'app installabile
└── icons/          ← icone per Android e iOS
```

---

## Come pubblicarla su GitHub Pages (gratis, 5 minuti)

### 1. Crea un repository GitHub

1. Vai su https://github.com/new
2. Nome repo: `scadenze-casa` (o come vuoi)
3. Visibilità: **Public** (obbligatorio per GitHub Pages gratis)
4. Clicca "Create repository"

### 2. Carica i file

**Opzione A – da browser (più semplice):**
1. Apri il repository appena creato
2. Clicca "uploading an existing file"
3. Trascina TUTTI i file e la cartella `icons/`
4. Clicca "Commit changes"

**Opzione B – da terminale:**
```bash
cd scadenze-pwa
git init
git add .
git commit -m "Prima versione"
git remote add origin https://github.com/TUO-USERNAME/scadenze-casa.git
git push -u origin main
```

### 3. Attiva GitHub Pages

1. Nel repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → cartella **/ (root)**
4. Clicca **Save**

Dopo 1-2 minuti l'app sarà disponibile su:
```
https://TUO-USERNAME.github.io/scadenze-casa/
```

### 4. Condividi in famiglia

Manda il link via WhatsApp. Su Android:
- Apri il link in Chrome
- Menu (3 puntini) → "Aggiungi a schermata Home"
- Appare l'icona come un'app vera

Su iPhone (Safari):
- Apri il link
- Tasto Condividi → "Aggiungi a schermata Home"

---

## Ricorda: attivare il Realtime Database Firebase

Se non l'hai ancora fatto:
1. Firebase Console → Build → Realtime Database → Crea database
2. Regione: Europe-west1
3. Modalità test
4. In "Regole" incolla:
```json
{
  "rules": {
    "tasks": {
      ".read": true,
      ".write": true
    }
  }
}
```

---

## Funzionalità

- Lista scadenze con indicatori visivi (scaduta / in scadenza / in regola)
- Categorie: gas, elettricità, acqua, condominio, assicurazione, manutenzione, tasse
- Importo in euro, ricorrenza, note
- Filtri e ricerca
- Schermata statistiche con grafici a barre per categoria
- Dati condivisi in tempo reale tra tutti i familiari via Firebase
- Notifiche push quando una scadenza si avvicina
- Funziona offline (ultima versione in cache)
- Installabile su Android e iPhone dalla schermata home
