
# GTM Cross-Domain Messaging (Sanitized)

**Updated:** 2025-08-20

This repository contains two JavaScript files that implement **cross‑domain messaging** for Google Tag Manager (GTM) using the `postMessage` API. All vendor-specific references have been removed and replaced with **generic, instructive configuration** so another developer can adapt this setup to any site/iframe pair.

---

## Overview

There are typically two scripts:

1. **Parent frame script** — lives on the **host page** and **listens** for messages from an embedded iframe. It pushes GTM `dataLayer` events (e.g., form submission, map click) coming from the iframe.
2. **Iframe script** — lives on the **embedded form/page** and **sends** messages to the parent when certain UI events occur.

> This pattern is useful when the iframe origin is different from the parent origin and you want to track actions in GTM on the parent site.

---

## File Structure

```
/ (repo root)
├─ parent/                 # parent-frame script(s)
│  └─ cross-domain-parent-frame.js
├─ iframe/                 # iframe script(s)
│  └─ cross-domain-iframe.js
└─ README.md               # you are here
```

> Your exact filenames may differ; the build below preserves your original names but places them under `parent/` and `iframe/` folders for clarity.

---

## Quick Start

1. **Decide your origins**
   - Parent site origin, e.g. `https://www.example.com`
   - Iframe site origin, e.g. `https://forms.example.com`

2. **Edit the config block** at the top of each JS file:
   - `ALLOWED_ORIGINS`: a **strict allowlist** of origins that are permitted to send/receive messages.
   - (Optional) Update CSS selectors and cookie names if your DOM or storage conventions differ.

3. **Include scripts**
   - Parent page: load the parent script **once** on pages that embed the iframe.
   - Iframe page: load the iframe script on the embedded page that will post messages.

4. **Wire up GTM**
   - The parent script pushes events into `window.dataLayer`.
   - In GTM, create **Custom Events** that match the `event` names (e.g., `formSubmit`, `mapClick`, etc.) and build tags/triggers as needed.

5. **Test locally**
   - Open the browser console on the **parent** page.
   - Trigger actions inside the iframe.
   - Confirm `dataLayer.push(...)` entries appear with your payload.
   - Verify **origins** match exactly (protocol + host + port).

---

## Configuration

At the top of each script you'll find:

```js
/** ============================
 *  Cross-Domain Messaging Config
 *  ============================
 *  1) Add *exact* origins that you trust.
 *  2) Keep this list small and specific.
 */
const ALLOWED_ORIGINS = [
  window.location.origin,                  // same-origin (parent/iframe)
  'https://your-iframe-origin.example.com' // TODO: replace with your iframe origin
];

function isAllowedOrigin(origin) {
  return ALLOWED_ORIGINS.includes(origin);
}
```

### Common customizations

- **CSS selectors**: If the original code used vendor-prefixed classes (e.g., `.qiigoforms-wrapper`), these have been made generic (e.g., `.forms-wrapper`). Update to match your DOM.
- **Cookie/localStorage keys**: Vendor-prefixed keys (e.g., `qiigoZipStored`) were renamed to generic names (e.g., `zipStored`). Update any server-side readers to match.
- **Origin checks**: Any hard-coded origins were replaced with a config allowlist and/or `your-iframe-origin.example.com` placeholder to make intent explicit.

---

## Security Notes

- Only trust messages from **known exact origins**.
- Always validate the **shape** of `event.data` before acting on it.
- Avoid wildcard origins. Protocol and host must match precisely.
- Never evaluate or execute strings received via `postMessage`.

---

## Troubleshooting

- **No events in GTM**: Check the console for blocked origins. Ensure the parent page contains the parent script **and** the iframe page contains the iframe script.
- **Wrong origin**: Ensure the iframe `src` is the same host you added to `ALLOWED_ORIGINS` (include `https://` and any non-standard ports).
- **Selector not found**: Confirm DOM classes/ids match the generic selectors in the script, or update as needed.

---

## License

MIT (or your choice).



---

## v2 Updates

- Added an **origin guard** at the top of each `message` handler:
  ```js
  if (!isAllowedOrigin(event.origin)) { return; }
  ```
  This ensures only trusted origins are processed.

- In the iframe script, `postMessage` now sends to a **specific target origin**:
  ```js
  const TARGET_PARENT_ORIGIN = ALLOWED_ORIGINS.find(o => o !== window.location.origin) || '*';
  window.parent.postMessage({ /* ... */ }, TARGET_PARENT_ORIGIN);
  ```
  Replace the placeholder in `ALLOWED_ORIGINS` with your real parent origin to avoid using `'*'` in production.
