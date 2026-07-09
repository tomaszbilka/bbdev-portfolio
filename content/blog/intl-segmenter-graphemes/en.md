---
title: "Intl.Segmenter: count characters like a human, not like a computer"
description: "JavaScript's .length lies about emoji and accented characters. Intl.Segmenter splits text into real graphemes — here's how to use it."
---

## The problem

Open your console and run:

```js
"👨‍👩‍👧".length     // 8
[..."👨‍👩‍👧"].length // 8
```

One emoji. Eight "characters" according to JavaScript.

The same happens with composed characters like `é` (one visible letter, sometimes stored as `e` + combining accent) and with flags, skin-tone modifiers, or any text that uses **Zero Width Joiners**.

JavaScript strings are UTF-16. `.length` and the spread operator `[...str]` count **code units** — internal memory chunks. Humans count **graphemes** — what they actually see on screen.

If you build a character counter, a typewriter animation, or a `maxLength` validator, this mismatch will bite you.

## What is `Intl`?

`Intl` is a **built-in JavaScript API** — no import, no npm package. It ships with browsers and Node.js (16+).

Think of it like `Math`: `Math` gives you `sin()` and `sqrt()`, `Intl` gives you locale-aware formatting and text operations.

Its job: handle things that depend on **human language and culture** — dates, numbers, currencies, sorting rules, and text segmentation.

## `Intl.Segmenter` in a nutshell

`Segmenter` is the `Intl` tool for **cutting text into meaningful pieces**.

```ts
const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
const parts = Array.from(segmenter.segment("hello"), (s) => s.segment);
// ["h", "e", "l", "l", "o"]
```

### Constructor parameters

| Parameter | Values | Meaning |
|-----------|--------|---------|
| `locale` | `"pl"`, `"en"`, `undefined` | Segmentation rules for the given language |
| `granularity` | `"grapheme"` / `"word"` / `"sentence"` | What to split |

### Key methods

- `new Intl.Segmenter(locale, options)` — create a segmenter
- `.segment(string)` — returns an **iterator** of objects `{ segment, index, isWordLike? }`
- `Array.from(segmenter.segment(str), s => s.segment)` — convert to a plain `string[]`

### Browser support

Chrome 87+, Firefox 125+, Safari 14.1+, Node 16+. Not everywhere — which is why a fallback matters.

## The `toGraphemes` helper

A small, production-ready wrapper:

```ts
export function toGraphemes(value: string, locale?: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
    return Array.from(segmenter.segment(value), (s) => s.segment);
  }
  return [...value];
}
```

What each part does:

1. **Guard** — checks if `Segmenter` exists (old browsers, some SSR environments)
2. **`granularity: "grapheme"`** — split into visible characters, not code units
3. **`Array.from`** — turn the iterator into an array you can `.map()`, `.length`, etc.
4. **Fallback `[...value]`** — works for basic ASCII, but breaks on emoji

## Examples

```ts
toGraphemes("Łódź")         // ["Ł", "ó", "d", "ź"]
toGraphemes("café")         // ["c", "a", "f", "é"]
toGraphemes("👨‍👩‍👧")       // ["👨‍👩‍👧"] — one element
toGraphemes("hello").length // 5 — the length your UI should show
```

### Real use case: character counter

```tsx
function CharCounter({ text, max }: { text: string; max: number }) {
  const count = toGraphemes(text).length;
  return (
    <span className={count > max ? "text-red-500" : ""}>
      {count}/{max}
    </span>
  );
}
```

Other places you'll reach for this: bio fields, tweet-length limits, letter-by-letter animations, cursor movement in custom text editors.

## What else lives in `Intl`?

`Segmenter` is the least known member of a useful family. Quick teasers:

**`Intl.DateTimeFormat`** — locale-aware dates:

```js
new Intl.DateTimeFormat("pl").format(new Date());
// "9.07.2026"
```

**`Intl.NumberFormat`** — numbers and currencies:

```js
new Intl.NumberFormat("pl", { style: "currency", currency: "PLN" }).format(1234.5);
// "1 234,50 zł"
```

**`Intl.Collator`** — proper locale sorting:

```js
["café", "cafe", "caffé"].sort(new Intl.Collator("fr").compare);
```

**`Intl.ListFormat`** — human-readable lists:

```js
new Intl.ListFormat("en", { type: "conjunction" }).format(["React", "TypeScript", "Node"]);
// "React, TypeScript, and Node"
```

**`Intl.RelativeTimeFormat`** — "2 days ago" style strings:

```js
new Intl.RelativeTimeFormat("en").format(-2, "day");
// "2 days ago"
```

`Segmenter` won't come up as often as `DateTimeFormat` or `NumberFormat`, but when you work with user-facing text, it's the one you can't fake with `.length`.

## Rule of thumb

> Use `Intl.Segmenter` instead of `.length` or `[...str]` whenever you count **visible characters** — form validation, social media limits, text animations, anything the user sees on screen.
