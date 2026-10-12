---
layout: ../../layouts/Blog.astro
title: "From Angular to React Native Without a Rewrite: A Senior Playbook"
description: "How to move a production Angular app to React Native (Expo) by porting instead of rewriting: a tiny Angular-style DI and signals layer, mirrored structure, synced i18n and design tokens, and Arabic RTL done right."
date: "2026-10-12"
readTime: "12 min read"
---

# From Angular to React Native Without a Rewrite: A Senior Playbook

*We had about 49,000 lines of Angular code and needed a native app. Here is how we shipped it on Expo without starting from zero, and why we kept thinking in Angular.*

---

The product started as an **Angular 22** web app: a public site, user accounts, saved items, a bilingual Arabic/English UI and a full admin back office. The next step was a real mobile app on iOS and Android, replacing an older native app.

The usual advice is to "rewrite it in React Native." We didn't. We **ported** it, and the mobile app ended up with almost exactly the same number of lines as the web client: about 49.8k vs 48.9k. Here is the approach, with real code from the project.

> **Why listen to me on this?** I've shipped Angular in production for over six years, through every era from AngularJS to 8, 14, 16 and 21/22. I've migrated legacy apps to Signals while features kept shipping, and I build React Native features that share business logic with the web. Most of that work was on government, fintech and HR products where a regression isn't an option. This article is the playbook I wish I'd had the first time.

**TL;DR:**
- If your Angular code already uses **signals and `inject()`**, a ~200-line compatibility layer lets you move business logic to React Native almost unchanged.
- **Mirror the structure**, **sync translations and design tokens by script**, and **fail the build** when web and mobile drift.
- **Plan Arabic/RTL from day one**: on native it's an app restart, not a CSS switch.

## The rule that drove everything: mobile is a 1:1 port

We wrote one rule before the first screen:

> Mobile is a 1:1 port of the web client: same features, same roles, same API calls, same translation keys, same states.

Every feature followed the same steps:

1. **Find it on web first.**
2. **Port it to the same path,** with the same names, enums and keys.
3. **Render the web phone layout,** then apply a mobile UX checklist (bottom sheets, thumb zones, haptics).
4. **Mirror every mobile UX improvement back** to the web phone layout.
5. **Never invent a feature** that exists in neither the web app nor the API.

This kept two codebases from turning into two products. When a bug shows up on one platform, we know exactly where to look on the other.

## 1. Same folder structure, same file names

Web and mobile share the same structure:

```
client/src/app/          mobile/src/
├── core/                ├── core/        (api, guards, models, services, utils…)
├── features/            ├── features/    (public, auth, admin, shell…)
└── shared/              └── shared/      (ui, pipes, directives, styles…)
```

Even the file names match: `translate.pipe.ts`, `reveal.directive.tsx`, `favorites.service.ts`. A developer who knows the Angular app can open the mobile app and find their way in minutes.

The Expo Router `app/` folder stays **thin**. It contains 34 route files, and each one only renders a feature component:

```tsx
// mobile/app/favorites.tsx
export default function Route() {
  return <Favorites />;
}
```

The routes use **the same URLs as the Angular routes** (`/items/[id]`, `/checkout/[itemId]`, `/explore/[city]`). That makes deep links and Universal Links work for free: a link shared from the website opens the same screen in the app.

## 2. The trick: a tiny `@angular/core` on top of React

This is the decision that saved months.

Our Angular services were already written with **signals** (`signal`, `computed`, `effect`) and `inject()`. Instead of rewriting them as React hooks, Context or Zustand stores, we built a small module, `src/core/ng`, that exposes the **same API** on top of `@preact/signals-core`:

```ts
// mobile/src/core/ng/index.ts (the public surface)
export { inject, InjectionToken } from './di';
export { signal, computed, effect } from './signals';
export { NgZone, PLATFORM_ID } from './platform';
```

Porting a service then becomes an **import change**. This is the real diff of our currency service:

```diff
- import { computed, inject, Service, signal } from '@angular/core';
+ import { computed, inject, signal } from '../../ng';
- @Service()
```

React components read signals through one hook built on `useSyncExternalStore`:

```tsx
const count = useSignal(favorites.count);
```

The business logic for favourites, sessions, currency, drafts and preferences was **written once and moved over**, not re-imagined. The app has no Redux, no Zustand and no React Query. React Context is used only for small local UI scopes, like a form.

> **Lesson:** if your Angular code already uses signals, you are closer to React than you think. Keep the mental model and swap only the rendering layer.

## 3. Routing and guards

On the web, Angular guards return a `UrlTree`:

```ts
// Angular
return router.createUrlTree([APP_ROUTES.login], { queryParams: { returnUrl } });
```

On mobile, guards are **plain async functions** with the same meaning. They return `true` or a URL to redirect to:

```ts
// mobile/src/core/guards/guards.ts
export const adminGuard: RouteGuardFn = async ({ url }) => {
  if (await inject(SessionService).ensure()) return true;
  return `${APP_ROUTES.login}?returnUrl=${encodeURIComponent(url)}`;
};
```

A small `<RouteGuard>` component wraps protected screens. It renders nothing until the guards pass, then calls `router.replace(result)`:

```tsx
<RouteGuard guards={[adminGuard]}>
  <AdminOrders />
</RouteGuard>
```

We also added a `Router` shim with `navigate` and `navigateByUrl`, so ported services that called `this.router.navigateByUrl(...)` kept working on top of `expo-router`.

## 4. HTTP: five interceptors become one `fetch` client

The web app uses `HttpClient` with five functional interceptors for culture, loading, errors, route decryption and auth. React Native has no interceptor chain, so we put them **in order inside one API client class**:

```ts
const headers = {
  Accept: 'application/json',
  Culture: inject(I18nService).lang(),
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
  ...(extra ?? {}),
};
// …
if (res.status === 401 && sentWith) inject(SessionService).expire();
```

We added a few things the web never needed:

- **A 30-second timeout** with `AbortController`. Android's networking client has no read timeout by default, so a slow request could hang forever.
- **The global loader only counts mutating calls** (POST/PUT/DELETE), so browsing stays smooth.
- **Business errors** (`{ error, code }`) become an `ApiBusinessError`, translated through the same `API_ERR_<CODE>` keys as the web.
- **A small cache** for lookup data (`getOrFetch(key, fetcher, ttl)`) that also merges duplicate in-flight requests.

The auth token moved from browser storage to **`expo-secure-store`**. It is loaded into memory once at boot, so every request can read it synchronously.

## 5. Forms: keep the rules, drop the library

The web uses Angular **Signal Forms**, with every validation message coming from one shared table (`ValidationMessage.Required → 'FIELD_IS_REQUIRED'`). On mobile we didn't add `react-hook-form`. Fields live in `useState`, and validators are plain functions that return **Angular-shaped error objects** with the same constants:

```ts
function nameErrors(value: string): UiFieldValidationErrors | null {
  if (!value.trim()) return { required: ValidationMessage.Required };
  if (value.trim().length > FIELD_LIMITS.login.max)
    return { maxLength: { requiredLength: FIELD_LIMITS.login.max,
                          actualLength: value.trim().length } };
  return null;
}
```

Because the error shape and the message keys are identical, the field error component shows **the same translated message on both platforms**.

## 6. Arabic + RTL: the hardest part, honestly

On the web, RTL is just `dir="rtl"` on `<html>`. On native it isn't that simple.

**Translations.** We kept our own `I18nService` (no ngx-translate on web, no i18next on mobile). A sync script copies the web dictionaries into the app and merges a small set of **mobile-only keys**: about 2,800 shared keys plus about 220 mobile keys. A parity check **fails the build** if the Arabic and English keys don't match.

**Direction.** React Native reads the layout direction at startup, so switching language means switching direction **and restarting the app**:

```ts
I18nManager.allowRTL(rtl);
I18nManager.forceRTL(rtl);
// …
private async reloadApp() {
  await this.storage.flush();
  try { await Updates.reloadAsync(); }
  catch { if (__DEV__) DevSettings.reload(); }
}
```

Lessons we learned the hard way:

- **Ask before restarting.** The language switch shows a confirmation first.
- **Guard against reload loops.** We store a `RtlReloadFor` flag, so a wrong start direction causes at most one fix-up restart.
- **Write direction-neutral styles.** Use `padding-inline-*`, not left and right, and only flip glyphs that point somewhere (arrows, chevrons).
- **Mirror directional motion** with `isRtl ? -1 : 1`.

## 7. Styling: we kept writing SCSS

This was our most unusual choice, and we'd do it again.

The web design system is built on SCSS tokens: colours, radii, spacing, dark mode, and **9 brand themes** generated from a single seed colour. Rewriting all of it as `StyleSheet.create` objects would have split the design in two.

So we wrote a **Metro transformer that compiles `.scss` into React Native styles at build time**:

```js
// metro transform worker (simplified)
if (filename.endsWith('.scss')) {
  const { styles } = compileScss(data.toString('utf8'), …);
  const code = 'const { createSheet } = require("@/src/shared/styles/runtime");\n' +
               `module.exports = createSheet(${JSON.stringify(styles)});`;
}
```

A small runtime resolves `var(--token)` and `color-mix()` while the app runs. A token sync script **generates the mobile tokens from the web SCSS**, so a colour change on the web reaches the app with one command.

Two rules keep it clean, and a check script enforces both:

- **No inline styles and no `StyleSheet.create`.**
- **Logic and markup are split** into `.component.tsx` (logic) and `.view.tsx` (JSX), much like Angular's `.ts` and `.html`.

The UI kit came over with the **same names**: 55 `Ui*` components (button, field, select as a bottom sheet, date picker with the Umm al-Qura calendar, table, toast, tabs…).

## 8. Where native gets to be better

A port shouldn't feel like a website in a box. These parts are deliberately native:

- **Motion:**
  - Reanimated 4 handles reveal, parallax, count-up and staged animations.
  - Scroll effects run on the **UI thread**.
  - Every animation respects the OS *and* the in-app reduced-motion setting.
- **Hero media:** `expo-video` plays it with `expo-audio` music. It **pauses** when scrolled away, when the screen loses focus or when the app goes to the background, and it keeps the poster until the first frame is drawn.
- **Images:** `expo-image` loads them, with assets synced from the web.
- **Layout:** carousels become **grids** on phones, because horizontal scrolling on a phone hides content.
- **Phone-only features:** a **photo checklist** that uses the camera, and haptics on key actions.

## 9. Environments and releases

We set up EAS build profiles for **development → QC → staging → production**:

- Every profile except production builds an APK for fast testing.
- Production builds an **app bundle** with version numbers incremented automatically.
- `app.config.ts` picks the environment from `EXPO_PUBLIC_APP_ENV` and sets up deep links from the website domain.
- The URL paths match the Angular routes, so **website links open in the app**.

For local development, an API base-URL helper rewrites `localhost` to `10.0.2.2` on the Android emulator, or to the dev machine's address on a physical phone. A small proxy lets phones reach a local HTTPS API with a self-signed certificate.

## Trade-offs: what this approach costs you

A senior decision is one where you can name the price. This one has three:

- **You carry a shim.** The `ng` layer is small, but it's code your team owns. New hires need to know that `inject()` on mobile is *ours*, not Angular's. We kept it under 200 lines (176 today) so it never became a framework of its own.
- **Idiomatic React purists will wince.** Signals read through `useSignal()` aren't what most React tutorials teach. We accepted that in exchange for one mental model across both apps, and documented it in the repo rules.
- **Parity is a discipline, not a script.** The sync scripts catch missing keys and tokens. They don't catch a mobile flow that quietly diverges from the web. Code review still has to ask, "Where is this on web?"

## When I would NOT port

Porting worked because the web app was already clean. I'd choose a fresh React Native build instead if:

- the web code relies on **RxJS-heavy state with deep `async` pipe chains** rather than signals and services;
- the mobile product is **meaningfully different** from the web one, so parity would be a constraint rather than a feature;
- the team is **React-first** and will maintain the app long-term without Angular context.

Pick the approach that matches your team and your codebase, not the one that matches a trending thread.

## A checklist you can steal

- [ ] Same folder tree and file names on web and mobile
- [ ] Business logic in framework-free services (signals or plain stores)
- [ ] One translation source, synced by script, with a parity check in CI
- [ ] One design-token source, synced by script
- [ ] Guards and API client ported with the same contracts and error codes
- [ ] RTL plan agreed before the first screen: restart flow, logical properties, mirrored motion
- [ ] Native-only polish listed explicitly: motion, media, camera, haptics
- [ ] Rules written down in the repo, and enforced by checks

## The numbers

| | Angular web | React Native (Expo) |
|---|---|---|
| Components | ~215 | 212 components + 68 views |
| Services | 39 | 37 |
| UI kit components | 61 | 55 |
| Lines of TypeScript | ~48.9k | ~49.8k |
| Translation keys | ~2,800 | ~2,970 (shared + mobile) |

## What I'd tell you before you start

1. **Don't rewrite; port.** If your Angular app uses signals and `inject()`, a thin compatibility layer lets you move the business logic almost unchanged.
2. **Mirror the folder structure and file names.** It is the cheapest documentation you will ever write.
3. **Keep one source of truth for translations and design tokens**, and sync it with scripts instead of copying by hand.
4. **Plan RTL from day one.** It is a restart on native, not a CSS switch.
5. **Fail the build on parity drift:** missing translation keys, inline styles, broken rules.
6. **Let native be native** where it matters: motion, media, the camera and haptics.
7. **Write the rules down.** Our porting rules lived in the repo, and they kept every screen consistent.

Moving from Angular to React Native wasn't about choosing a better framework. It was about **keeping one product in two places**, without paying for it twice.

---

## About the author

**Orieb Alzyuot** (عريب الزيوت) is a Senior Front-End & Full-Stack Engineer based in Amman, Jordan, with 6+ years of experience building government, fintech, HR and enterprise products used every day. Her work includes:
- front-end architecture for **SAMA-licensed fintech** and Saudi government platforms;
- migrations from **AngularJS to Angular 22 with Signals**, delivered without downtime;
- **React Native** apps that share business logic with the web;
- custom **design systems** with multiple themes, dark mode and accessibility modes, and native-feeling Arabic RTL.

She cares most about products that genuinely help people: accessible, honest and fast.

**Open to** senior and lead front-end roles, contracts and freelance work, remote or with relocation.

**Find me here:**
- 🌐 Portfolio: [oriebalzyuot96.github.io](https://oriebalzyuot96.github.io) · [العربية](https://oriebalzyuot96.github.io/ar/)
- 📄 CV (PDF): [oriebalzyuot96.github.io/Orieb-Alzyuot-CV.pdf](https://oriebalzyuot96.github.io/Orieb-Alzyuot-CV.pdf)
- 💼 LinkedIn: [linkedin.com/in/orieb-alzyuot996](https://www.linkedin.com/in/orieb-alzyuot996)
- 🐙 GitHub: [github.com/oriebalzyuot96](https://github.com/oriebalzyuot96)
- 📱 Open-source React Native app from this article's playbook: [Asset Conversion (AED ⇄ USDT)](https://github.com/oriebalzyuot96/asset-conversion)
- 💡 Stack Overflow: [stackoverflow.com/users/13313528/orieb-alzyuot](https://stackoverflow.com/users/13313528/orieb-alzyuot)
- ⚡ StackBlitz: [stackblitz.com/@oriebalzyuot96](https://stackblitz.com/@oriebalzyuot96)
- 🖊️ CodePen: [codepen.io/oriebalzyuot96](https://codepen.io/oriebalzyuot96)
- ✉️ Email: [alzuotorieb9999@gmail.com](mailto:alzuotorieb9999@gmail.com)

*If this helped, follow me here on Medium for more on Angular, React Native, design systems and Arabic-first UX. I'm happy to answer questions in the comments.* 💜

**Tags:** Angular · React Native · Expo · TypeScript · Mobile Development
