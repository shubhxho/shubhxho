---
title: Sable — a 265kb Rust chess engine
description: Building a tiny chess engine in Rust, and why binary size is a useful design constraint.
date: 2026-08-10
---

[sable](https://github.com/shubhxho/sable) is a chess engine written in Rust that ships around 265kb. Not 265mb — kilobytes.

Chess engines are a classic playground for search, evaluation, and micro-optimization. I wanted a version where **size** was part of the scoreboard. When the binary has to stay small, you delete cleverness that does not earn its keep.

## Why size matters

Small binaries are not just a party trick. They mean:

- Fast cold starts for CLI tools and embedded targets
- Less surface area to reason about
- A forcing function against accidental complexity

Rust usually pulls you toward safety and abstraction. Those are good defaults. Sable asks a different question: how much strength can you keep after stripping everything nonessential?

## Engine architecture

At a high level, sable is the usual skeleton:

- **Move generation** — legal moves quickly, with enough structure to prune garbage early
- **Search** — alpha-beta with the standard refinements that actually move playing strength
- **Evaluation** — simple material and positional terms, tuned enough to be interesting, not enough to bloat the codebase

The implementation detail I care about is readability. A 265kb engine you cannot modify is a demo. A 265kb engine you can extend is a tool.

## What I learned

**Benchmarks lie politely.** Play games, run perft, compare against known positions. A pretty benchmark chart is not the same as sound search.

**Rust fits this problem.** Predictable performance, no GC pauses mid-search, strong typing when your move generator gets gnarly.

**Engines teach general skills.** Search trees, pruning, tradeoffs between depth and breadth — the same instincts show up in planning systems, game AI, and even some optimization work outside chess.

If you want to study the code or pit sable against your own engine, the repo is on [GitHub](https://github.com/shubhxho/sable). Issues and pull requests welcome.
