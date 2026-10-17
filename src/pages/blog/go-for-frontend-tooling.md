---
layout: ../../layouts/Blog.astro
title: "Why I Wrote Two of My Dev Tools in Go (and Kept the Rest in Node)"
description: "A front-end engineer's honest take on Go for developer tooling: real code from a Go scanner, measured binary sizes and start-up times against Node, what Go did not win, and the two questions I ask before choosing."
date: "2026-10-17"
readTime: "9 min read"
---

# Why I Wrote Two of My Dev Tools in Go (and Kept the Rest in Node)

*I build front ends for a living: Angular, React, Vue, Svelte. Most of my developer tools are Node.js, because that is where my users already are. This month I wrote two of them in Go. I measured both, and some of what I expected did not hold up. This is what I found.*

## The two tools

Both run on every pull request in my projects.

- **i18n-leak** finds user-facing text hardcoded in server code. Strings meant for people belong in resource files, not in API handlers or shared libraries. The tool walks the chosen folders, lexes each file (C# and TypeScript or JavaScript, skipping comments and string forms such as verbatim and template literals), and reports literals that look like sentences.
- **style-dups** finds repeated `selector` plus `property` declarations in SCSS. Most repeats are intentional, such as overrides under a media query, RTL rules, dark theme or hover states, so the tool ignores any repeat whose context differs.

## The concurrency code, as written

Both tools scan files in parallel. This is the real worker pool from `i18n-leak`, lightly trimmed:

```go
workers := opts.Workers
if workers <= 0 {
    workers = runtime.NumCPU()
}
if workers > len(files) {
    workers = len(files)
}

results := make([][]rules.Finding, len(files))
errs := make([]error, len(files))
jobs := make(chan int)
var wg sync.WaitGroup
for w := 0; w < workers; w++ {
    wg.Add(1)
    go func() {
        defer wg.Done()
        for i := range jobs {
            results[i], errs[i] = scanFile(root, files[i], opts.Allow)
        }
    }()
}
for i := range files {
    jobs <- i
}
close(jobs)
wg.Wait()
```

Each worker writes to its own slot in `results`, so no lock is needed. The output is sorted by file, then line, then rule afterwards, so the report is the same on every run, whatever the worker count. That determinism is what lets CI diff the report.

I had written a longer, invented version of this in my first draft of this article. I deleted it, because it was not the code that ships.

## What I measured

Windows 11, Git Bash, Go 1.27.0, Node 24.21.0. Cold start is the median of 10 runs of `--help` or `node -e 0`, which includes process start-up and any shell overhead.

| | i18n-leak (Go) | style-dups (Go) | Bare Node |
|---|---|---|---|
| Binary or runtime size | 4.78 MB (one file) | 4.69 MB (one file) | `node.exe` 93.6 MB, before any packages |
| Cold start, median of 10 | 103 ms | 141 ms | 149 ms (`node -e 0`) |
| Scan, one run | 2,000 files in 295 ms, 8,500 findings | 2,400 files (20 MB) in 4,805 ms, 96,000 findings | not measured |

Three things stand out:

**Cold start is not a Go win on this machine.** Both Go tools start in about the same time as an empty Node script. On Windows, process start-up dominates. My draft claimed Node took 300 ms and Go 5 ms. That was never measured, and it is wrong. I removed it.

**The real difference is what you have to install.** The Go tools are one file each, about 4.7 MB, with no runtime and no `node_modules`. The machine that runs them needs nothing else. Node is 93.6 MB before any packages. For a backend team that does not run JavaScript, that difference is the whole argument.

**The style-dups timing is mostly output.** Of its 4.8 seconds, a large part is writing a 25.8 MB JSON report and 96,000 text lines. I did not separate the two, so I cannot say how fast the scan alone is. I have not compared either tool against a Node version on the same input, so I can't claim a speed ratio.

## Tests and what I did not check

- `i18n-leak`: `go vet` and `go test` pass in three packages, with table-driven tests for the classifier, lexer edge cases, allow-list parsing, fixture scans and worker-count determinism.
- `style-dups`: `go vet` and `go test` pass, with about 38 table cases in the parser alone. A fixture with intentional overrides produces zero findings.
- **Not run:** the race detector. It needs cgo, and this machine has no C toolchain. So the concurrency code is tested, but not checked for races.

## Where Node is still the right answer

I did not rewrite the other tools, and I would not:

- **The tool works on the web platform.** Rendering HTML to PNG, inlining CSS into email, walking a DOM: Node has jsdom and Playwright. Go has ports, but they are second-class.
- **The users are front-end developers.** `npx tool` is zero friction for someone who already has Node. A Go binary is zero friction for someone who has nothing. Pick the one your users have.
- **The output is mostly templating.** Generating Markdown, scaffolding files, writing SQL: template literals and `JSON.stringify` are simpler than Go's `text/template`, and speed does not matter at that size.
- **It has to be a library.** If other code imports it into a build or a Vite plugin, it has to be JavaScript.

## What Go was good at

- **The standard library covered it.** Both tools use only the standard library. No lockfile, no audit noise, nothing for a security review.
- **Errors are values.** Every failure path in the scanner is visible at the call site.
- **One toolchain.** `go build`, `go test`, `go vet` and `gofmt`. Cross-compiling for Linux CI from Windows is `GOOS=linux go build`.

What I missed: union types, optional chaining, and the ergonomics of `Array` methods. Loops are verbose. For a tool that is mostly string work, I still reach for Node first.

## My rule now

Before starting a tool, I ask two questions:

1. **Who runs it, and what do they already have installed?** A front-end team has Node, so Node is fine. A mixed team, CI images I do not control, or a pre-commit hook on a machine without a JavaScript toolchain is a case for Go.
2. **Is the hard part the web platform, or files and text?** DOM, CSS rendering and screenshots are Node. Walking trees, lexing text and parallel file work are Go.

If both answers point the same way, the choice is made. If they disagree, I default to Node, because my users are front-end engineers and shipping matters more than cleverness.

---

**Also by me**

- [Rules, Skills and Guardrails: How I Engineer with Cursor and Claude Code](/blog/ai-engineering-cursor-claude/)
- [Accessibility that ships](/blog/accessibility-that-ships/)
- [SCSS in 2026](/blog/scss-in-2026/)

**Tags:** Go · Node.js · Developer Tools · CLI · Performance
