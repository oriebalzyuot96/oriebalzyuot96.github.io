---
layout: ../../layouts/Blog.astro
title: "Rules, Skills and Guardrails: How I Engineer with Cursor and Claude Code"
description: "The AI-assisted engineering system behind my production web and mobile apps: scoped Cursor rules, a layered CLAUDE.md, Claude skills, sync scripts and checks that turn rules into build failures."
date: "2026-10-12"
readTime: "10 min read"
---

# Rules, Skills and Guardrails: How I Engineer with Cursor and Claude Code

*AI writes code fast. Without structure, it also writes the wrong code fast. This is the system I use across production web and mobile apps to keep AI-assisted work consistent, reviewable and safe.*

---

I use Cursor and Claude Code every day. On real products, the bottleneck is never "can the AI write this component?" It's whether the AI writes **our** component: the right folder, the right tokens, Arabic RTL handled, accessibility in place, no secrets, no shortcuts.

So I stopped treating prompts as the unit of work and started treating **the repository** as the prompt. Over several products I've written about **176 rule files (~7,300 lines)**, a small set of **Claude skills**, and **checker scripts** that turn the important rules into build failures.

**TL;DR:**
- **Rules** encode how *this* codebase works, in small scoped files.
- **One guide file** tells every agent where the rules are and what "done" means.
- **Skills** package repeatable workflows such as "add a feature" or "repo workflow".
- **Checks** enforce what matters, because a rule the AI can ignore is only a suggestion.

## 1. The architecture at a glance

```
repo/
├── CLAUDE.md              ← short pointer: where rules live, non-negotiables, "npm run check must pass"
├── AGENTS.md              ← same idea for other agents (versions, commands)
├── .cursor/
│   ├── CLAUDE.md          ← the full guide: stack, folder map, component anatomy, verify steps
│   └── rules/*.mdc        ← 40+ small, scoped rules
├── claude-skills/*/SKILL.md ← repeatable workflows
└── scripts/
    ├── check-rules        ← mechanical rule checks (warn / strict)
    ├── check-inline       ← no inline styles (fatal)
    └── check-parity       ← translation & contract parity (fatal)
```

The layering matters:

1. **The root `CLAUDE.md` is tiny (8–27 lines).** It points to the real guide and lists the non-negotiables.
2. **`.cursor/CLAUDE.md` is the guide (around 100–250 lines).** It covers the stack, folder map, component anatomy, "verify before you finish" and "before every push". It lists every rule by name and ends with one sentence that settles every argument: **"The rule files win on conflict."**
3. **Rules are small and scoped,** typically 8–78 lines each.

A short entry file plus a detailed guide keeps the agent's context focused. The model reads the map first, and the territory only when it needs it.

## 2. Anatomy of a rule

Each rule is an `.mdc` file with three pieces of frontmatter:

```md
---
description: No inline styles — every static style lives in the sibling .scss; TSX only composes classes
globs: ["app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"]
alwaysApply: true
---
<View style={[styles.card, active && styles.cardActive]} />   // state = class
<View style={[styles.bar, { width: measuredWidth }]} />        // measured size is the only exception
```

Lessons from writing a lot of these:

- **One rule, one concern.** "no-inline-style", "rtl-layout", "no-settimeout" and "file-size" are separate files. Small rules are easier for the model to apply, and easier for humans to review and update.
- **Show, don't tell.** A two-line good/bad example beats a paragraph of prose. Models copy patterns.
- **Scope with globs.** Most rules always apply. Specialised ones, such as landing pages, auth pages or the dev UI kit, only load for matching files, so they don't add noise everywhere.
- **Encode judgement, not only syntax.** My RTL rule says: *flip only directional glyphs; never mirror brand, social, status or media icons; numbers, prices, emails and code inside Arabic text are LTR runs.* That's knowledge a model won't reliably have unless you write it down.

## 3. A taxonomy that scales

Across one mobile app's 43 rules, the split looked like this:

| Category | Rules | Examples |
|---|---|---|
| Architecture & parity | 13 | feature folders, service folders, API integration, web parity |
| UI & design system | 16 | design tokens, shared form controls, interaction states, loading, feedback |
| Code hygiene & typing | 7 | no `any`/`unknown`, enums vs unions, file size, encoding |
| i18n & RTL | 2 | translation keys, RTL layout |
| Accessibility | 1 | labels, focus, contrast, motion |
| Security | 2 | secrets, encrypted routes |
| Git | 2 | secrets in commits, commit trailers |

Two patterns paid off most:

- **An index rule.** One rule (`frontend.mdc`) is a map: a table from "web concept" to "mobile equivalent", for example `signal()/computed()` to the same API from a small shim, and `@if/@for` to JSX. The agent stops guessing how two codebases relate.
- **Ask, don't invent.** My parity rule ends with: *"A feature that exists neither on web nor in the API is not invented — report it and ask."* That single line removed a whole class of creative but wrong output.

## 4. Skills: workflows, not knowledge

Rules describe **how the code should look**. Skills describe **how to do a job**. Each skill is a `SKILL.md` with a `name` and a `description` that says *when* to use it. The description is what makes the agent reach for the skill at the right moment.

Three skills cover most of my back-end work:

- **architecture:** the layers, references and conventions (domain, CQRS handlers, queries, persistence, tests). *"Use before reading, writing, reviewing or refactoring any code."*
- **add-feature:** a six-step recipe: entity → query → command → optional SQL twin → in-memory handler test → build and test.
- **repo-workflow:** build and test before every commit, public-repo safety (no keys, no personal data, helper scripts git-ignored), and how to add or update a skill.

Keep **rules, recipes and process** in separate skills. When they're mixed together, the model applies all of them at once and tends to over-engineer.

## 5. Guardrails: a rule the AI can ignore is a suggestion

This is where most AI setups stop, and where mine starts paying for itself. Every app has a single command:

```bash
npm run check   # typecheck && check:scss && check:parity && check:rules && check:inline
```

What each part does:

- **`check:inline`** fails on any static inline style and forces everything into the design system. Legacy violations live in a baseline file, which is empty today. A rare, justified exception needs an explicit marker with a reason: `/* inline-style-ok: <reason> */`.
- **`check:parity`** fails on English/Arabic key mismatches, any `t("KEY")` that doesn't exist, leftover framework imports, `any`, and non-UTF-8 files.
- **`check:rules`** runs about 20 mechanical rule checks and prints `SEVERITY [rule] file:line`, with `--strict` and `--json` modes. It also verifies that **every rule file is listed in the guide** and has valid frontmatter, so the documentation can't silently drift.
- **The web pre-push** runs the rule checker, cleans the source, builds for production and **fails on any warning**.

Be honest about severity. On one mobile app most mechanical rules are still warnings, and only the parity and inline-style checks block a push. That's a deliberate ramp: warn first, measure, then promote a rule to an error once the codebase is clean. Promoting everything on day one just teaches people to bypass the checks.

## 6. Sync scripts: one source of truth

AI is great at copying, and copying is how codebases drift. So the copies are generated:

- **Translations:** the web EN/AR dictionaries are copied into mobile, then mobile-only keys are merged. A web key with the same name always wins.
- **Design tokens:** the web SCSS tokens, including the dark theme and component variables, are parsed into a generated TypeScript file.
- **Images and icons:** raster images become `require()` maps, SVGs become XML strings, and the icon sprite becomes a generated module.
- **Styles:** a SCSS-to-React-Native compiler that **errors** on unsupported features, such as nested selectors and `@media`, instead of quietly producing wrong styles.

Generated files are never edited by hand, by humans or by agents, and the rules say so.

## 7. Safety and authorship rules

A few rules exist purely to protect the team:

- **Secrets:** never commit `.env` files, API settings or live keys. It's a short rule, and it's always applied.
- **Protected areas:** the back-end guide has a "Protected / Do Not Modify" list and numbered never/always guardrails. One of them says the agent must not clean, build or push on its own initiative unless asked.
- **Commit messages:** a rule plus a `prepare-commit-msg` hook keep tool-generated trailers out of the history, so authorship follows the team's policy rather than a tool's default.

## 8. Reuse across products

The biggest multiplier: **rules are portable.** Two web + mobile products share most of their rule set. Between the two web apps, 29 of 44 rules are byte-identical. Mobile rules are derived from web rules through a mapping document, and the checkers are ported too.

The lesson from doing this: **when you copy a rule set, grep for the old project's names.** Leftovers like an old path in a script header or a rule for a feature that doesn't exist confuse agents more than they confuse humans.

## 9. What changed in practice

- **Reviews got shorter.** Most comments used to be "use the token", "add the Arabic key", "this needs a loading state". Now the checks catch those before the PR exists.
- **Onboarding got faster,** for humans *and* agents. The guide file is the onboarding doc.
- **Arabic and accessibility stopped being afterthoughts,** because they're encoded in rules that apply to every file.
- **The AI got more boring, in a good way.** It writes code that looks like ours.

## A starter kit you can copy

1. A **10–20 line root `CLAUDE.md`**: where the rules are, three to five non-negotiables, and the one command that must pass.
2. A **guide file**: stack, folder map, component anatomy, "verify before you finish".
3. **Five rules to start with:** design tokens, folder structure, i18n/RTL, accessibility, secrets.
4. **One skill:** "add a feature" in your stack, step by step.
5. **One check** that fails the build on your most common review comment.
6. **A habit:** every time you correct the AI twice for the same thing, write a rule.

Tools will keep changing. What lasts is a codebase that explains itself clearly enough for any engineer to follow, human or AI.

---

## About the author

**Orieb Alzyuot** (عريب الزيوت) is a Senior Front-End & Full-Stack Engineer based in Amman, Jordan. She has 6+ years of experience building government, fintech, HR and enterprise products used every day, and her work includes:
- Angular from AngularJS to v22 with Signals;
- React and React Native apps that share business logic with the web;
- custom design systems with multiple themes and accessibility modes;
- native-feeling Arabic RTL;
- AI-assisted engineering with Cursor and Claude Code.

**Open to** senior and lead front-end roles, contracts and freelance work, remote or with relocation.

**Find me here:**
- 🌐 Portfolio: [oriebalzyuot96.github.io](https://oriebalzyuot96.github.io) · [العربية](https://oriebalzyuot96.github.io/ar/)
- 📄 CV (PDF): [oriebalzyuot96.github.io/Orieb-Alzyuot-CV.pdf](https://oriebalzyuot96.github.io/Orieb-Alzyuot-CV.pdf)
- 💼 LinkedIn: [linkedin.com/in/orieb-alzyuot996](https://www.linkedin.com/in/orieb-alzyuot996)
- 🐙 GitHub: [github.com/oriebalzyuot96](https://github.com/oriebalzyuot96)
- 💡 Stack Overflow: [stackoverflow.com/users/13313528/orieb-alzyuot](https://stackoverflow.com/users/13313528/orieb-alzyuot)
- ⚡ StackBlitz: [stackblitz.com/@oriebalzyuot96](https://stackblitz.com/@oriebalzyuot96)
- 🖊️ CodePen: [codepen.io/oriebalzyuot96](https://codepen.io/oriebalzyuot96)
- ✉️ Email: [alzuotorieb9999@gmail.com](mailto:alzuotorieb9999@gmail.com)

*If this helped, follow me on Medium for more on Angular, React Native, design systems and AI-assisted engineering.* 💜

**Tags:** AI · Cursor · Claude · Software Engineering · Developer Productivity
